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
    Integer,
  //   Wysiwyg
  } = require('@keystonejs/fields');
  const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
  
  const { permission, rules, isSignedIn } = require("./../access");
  module.exports = {
        fields: {
            title: {
                type: Text,
                access: {
                    update: permission.canManagePopUp
                }
            },
            content: {
                type: Wysiwyg,
                access: {
                    update: permission.canManagePopUp
                }
            },
            startDate: {
                type: CalendarDay,
                access: {
                    update: permission.canManagePopUp
                }
            },
            endDate: {
                type: CalendarDay,
                access: {
                    update: permission.canManagePopUp
                }
            },
            notSeen: {
                type: Relationship,
                ref: "User",
                many: true
            }
        },
        access: {
            create: permission.canManagePopUp,
            delete: permission.canManagePopUp,
        }
  }