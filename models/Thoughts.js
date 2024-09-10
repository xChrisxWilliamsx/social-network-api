const { Schema, model } = require('mongoose');
// const Reaction = require('./Reactions');

const reactionsSchema = new Schema(
    {
        id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        timestamps: { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
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
        timestamps: { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        },
        reactions: [reactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject:{
            virtuals: true,
        }
    }
);

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;