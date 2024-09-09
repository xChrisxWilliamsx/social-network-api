// const { Schema, model } = require('mongoose');

// const reactionsSchema = new Schema(
//     {
//         id: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId(),
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxlength: 280,
//         },
//         username: {
//             type: String,
//             required: true,
//         },
//         timestamps: { 
//             createdAt: 'created_at', 
//             updatedAt: 'updated_at' 
//         },
//     }
// );

// const Reactions = model('reactions', reactionsSchema);

// module.exports = Reactions;