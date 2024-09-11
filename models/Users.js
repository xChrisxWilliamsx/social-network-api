const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Email invalid!"], 
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],
        friends: [
            { 
                type: Schema.Types.ObjectId,
                ref: 'users' 
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

usersSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('users', usersSchema);

module.exports = Users;
  