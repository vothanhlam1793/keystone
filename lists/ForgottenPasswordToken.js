const { v4: uuid } = require('uuid');

function getOTP(){
    var a = Math.round(Math.random()*10000000).toString();
    return a.substring(0, 6);
}

const { SMS } = require("./../lib/sms");
const { sendEmail } = require("./../lib/mail");
const {
    File,
    Text,
    Slug,
    Relationship,
    Select,
    Password,
    Checkbox,
    CalendarDay,
    DateTime,
  } = require('@keystonejs/fields');
const { isSignedIn, permission } = require('../access');
module.exports.ForgottenPasswordToken = {
    ui: {
        isHidden: true,
    },
    fields: {
        user: {
            type: Relationship,
            ref: "User",
            // access: {
            //     read: permission.canManageUsers
            // }
        },
        token: {
            type: Text,
            isRequired: true,
            isUnique: true,
            access: {
                read: permission.canManageUsers
            }
        },
        requestedAt: {
            type: DateTime,
            isRequired: true
        },
        accessedAt: {
            type: DateTime,
        },
        expiresAt: {
            type: DateTime,
            isRequired: true
        }
    },
    access: {
        create: true,
        read: true,
        update: permission.canManageUsers,
        delete: permission.canManageUsers
    },
    hooks: {
        afterChange: async ({ context, updatedItem, existingItem }) => {
            if (existingItem) return null;
            const now = new Date().toISOString();
            const { errors, data } = await context.executeGraphQL({
                context: context.sudo(),
                query: `
                    query GetUserAndToken($user: ID!, $now: DateTime!) {
                        User( where: { id: $user }) {
                            id
                            username
                            phone
                        }
                        allForgottenPasswordTokens( where: { user: { id: $user }, expiresAt_gte: $now }) {
                            token
                            expiresAt
                        }
                    }
                `,
                variables: { user: updatedItem.user.toString(), now },
            });
        
            if (errors) {
                console.error(errors, `Unable to construct password updated email.`);
                return;
            }
        
            const { allForgottenPasswordTokens, User } = data;
            const forgotPasswordKey = allForgottenPasswordTokens[0].token;
            const url = process.env.SERVER_URL || 'http://localhost:3000';
        
            const props = {
                forgotPasswordUrl: `${url}/change-password?key=${forgotPasswordKey}`,
                // recipientEmail: User.email,
            };
        
            console.log(props);
            var sms = new SMS();
            await sms.send(User.phone, "OTP Creta.VN: " + forgotPasswordKey);
        },
      },
}

module.exports.customSchema = {
    queries: [
      {
        schema: "queryPhoneRister(phone: String!): User",
        resolver: async(obj, {phone}, context) => {
          console.log("RESOLUTION");
          const { errors: userErrors, data: userData } = await context.executeGraphQL({
            context: context.sudo(),
            query: `
              query findUserByUsername($phone: String!) {
                allUsers(where: { phone: $phone }) {
                  id
                  username
                  phone
                  activate
                }
              }
            `,
            variables: { phone: phone },
          });
          if(userData.length == 0){
            return {}
          } else {
            return userData.allUsers[0];
          }
        }
      }
    ],
    mutations: [
      {
        schema: 'startPasswordRecovery(username: String!): ForgottenPasswordToken',
        resolver: async (obj, { username }, context) => {
          const token = getOTP();
            console.log(token);
          const tokenExpiration =
            parseInt(process.env.RESET_PASSWORD_TOKEN_EXPIRY) || 1000 * 60 * 3;
  
          const now = Date.now();
          const requestedAt = new Date(now).toISOString();
          const expiresAt = new Date(now + tokenExpiration).toISOString();
  
          const { errors: userErrors, data: userData } = await context.executeGraphQL({
            context: context.sudo(),
            query: `
              query findUserByUsername($username: String!) {
                allUsers(where: { username: $username }) {
                  id
                  username
                }
              }
            `,
            variables: { username: username },
          });
  
          if (userErrors || !userData.allUsers || !userData.allUsers.length) {
            console.error(
              userErrors,
              `Unable to find user when trying to create forgotten password token.`
            );
            return;
          }
  
          const userId = userData.allUsers[0].id;
  
          const result = {
            userId,
            token,
            requestedAt,
            expiresAt,
          };
  
          const { errors } = await context.executeGraphQL({
            context: context.sudo(),
            query: `
              mutation createForgottenPasswordToken(
                $userId: ID!,
                $token: String,
                $requestedAt: DateTime,
                $expiresAt: DateTime,
              ) {
                createForgottenPasswordToken(data: {
                  user: { connect: { id: $userId }},
                  token: $token,
                  requestedAt: $requestedAt,
                  expiresAt: $expiresAt,
                }) {
                  id
                  token
                  user {
                    id
                  }
                  requestedAt
                  expiresAt
                }
              }
            `,
            variables: result,
          });
  
          if (errors) {
            console.error(errors, `Unable to create forgotten password token.`);
            return;
          }
  
          return true;
        },
      },
      {
        schema: 'changePasswordWithToken(token: String!, password: String!): User',
        resolver: async (obj, { token, password }, context) => {
          const now = Date.now();
  
          const { errors, data } = await context.executeGraphQL({
            context: context.sudo(),
            query: `
              query findUserFromToken($token: String!, $now: DateTime!) {
                passwordTokens: allForgottenPasswordTokens(where: { token: $token, expiresAt_gte: $now }) {
                  id
                  token
                  user {
                    id
                  }
                }
              }`,
            variables: { token, now },
          });
  
          if (errors || !data.passwordTokens || !data.passwordTokens.length) {
            console.error(errors, `Unable to find token`);
            // throw errors.message;
            return {

            }
          }
  
          const user = data.passwordTokens[0].user.id;
          const tokenId = data.passwordTokens[0].id;
  
          const { errors: passwordError, dataRet } = await context.executeGraphQL({
            context: context.sudo(),
            query: `mutation UpdateUserPassword($user: ID!, $password: String!) {
              updateUser(id: $user, data: { password: $password, activate: true }) {
                id
              }
            }`,
            variables: { user, password },
          });
  
          if (passwordError) {
            console.error(passwordError, `Unable to change password`);
            return {

            }
            // throw passwordError.message;
          }
  
          await context.executeGraphQL({
            context: context.sudo(),
            query: `mutation DeletePasswordToken($tokenId: ID!) {
              deleteForgottenPasswordToken(id: $tokenId) {
                id
              }
            }
          `,
            variables: { tokenId },
          });
          console.log(user);
          return {
            id: user
          };
        },
      },
    ],
  };
  