const { Schema, model } = require('mongoose');
// const Reaction = require('./Reactions');

const reactionsSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        created_at: { 
            type: Date,
            default: Date.now 
        },
    }
);

const thoughtsSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        created_at: { 
            type: Date,
            default: Date.now 
        },
        reactions: [reactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;