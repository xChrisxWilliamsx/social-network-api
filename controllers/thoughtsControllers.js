const { Users, Thoughts } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findById({ _id: req.params.id })
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID..' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            const user = await Users.findByIdAndUpdate(
                { _id: req.params.userId },
                { $addToSet: 
                    { 
                        thoughts: thought.id 
                    } 
                },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, however no user found matching that ID.. ',
            })
            }
            res.json(thought.id);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thoughts.findByIdAndUpdate(
                { _id: req.params.id },
                { 
                    text: req.body.text,
                    username: req.body.username,
                },
                { new: true }
            );
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const deletedThought = await Thoughts.findByIdAndDelete({ _id: req.params.id });
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with that ID..' });
            }
            res.json({ message: 'Thought deleted..' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addThoughtReaction(req, res) {
        try {
            const thought = await Thoughts.findById({ _id: req.params.id })
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID..' });
            }
            thought.reactions.push(req.body);
            await thought.save();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThoughtReaction(req, res) {
        try {
            const thought = await Thoughts.findById({ _id: req.params.id });
            if (!thought) {
              return res.status(404).json({ message: 'ID not found..' });
            }
            thought.reactions.pull(req.params.reactionId)
            await thought.save();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};