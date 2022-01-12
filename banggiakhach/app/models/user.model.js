module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                unique: true,
                lowercase: true,
                validate: value => {
                    if (!validator.isEmail(value)) {
                      throw new Error({ error: "Invalid Email address" });
                    }
                }
            },
            password: {
                type: String,
                required: true,
                minLength: 7
            },
            tokens: [
                {
                  token: {
                    type: String,
                    required: true
                  }
                }
            ]
        },
        { 
            timestamps: true 
        }
    );
  
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    schema.pre("save", async function(next) {
        // Hash the password before saving the user model
        const user = this;
        if (user.isModified("password")) {
          user.password = await bcrypt.hash(user.password, 8);
        }
        next();
    });
      
    schema.methods.generateAuthToken = async function() {
        // Generate an auth token for the user
        const user = this;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        user.tokens = user.tokens.concat({ token });
        await user.save();
        return token;
    };
      
    schema.statics.findByCredentials = async (email, password) => {
        // Search for a user by email and password.
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error({ error: "Invalid login credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          throw new Error({ error: "Invalid login credentials" });
        }
        return user;
    };

    const User = mongoose.model("users", schema);
    return User;
};