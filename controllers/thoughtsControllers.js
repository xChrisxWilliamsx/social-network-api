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
            const thought = await Thoughts.findOne({ id: req.params.id })
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
            const createdThought = await Thoughts.create(req.body);
            const user = await Users.findOneAndUpdate(
                { id: req.body.id },
                { $addToSet: 
                    { 
                        thoughts: createdThought.id 
                    } 
                },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, however no user found matching that ID.. ',
                })
            }
            res.json(createdThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thoughts.findOneAndUpdate(
                { id: req.params.id },
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
            const deletedThought = await Thoughts.findOneAndDelete({ id: req.params.id });
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
            const addReaction = await Thoughts.findOneAndUpdate(
                { id: req.params.id },
                { $addToSet: 
                    { 
                        reactions: req.body 
                    } 
                }
            );
            if (!addReaction) {
                return res.status(404).json({ message: 'No thought with this ID..' });
            }
            res.json(addReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThoughtReaction(req, res) {
        try {
            const deleteReaction = await Thoughts.findOneAndUpdate(
                { id: req.params.id },
                { $pull: 
                    { 
                        reactions: { 
                            id: req.params.id 
                        } 
                    } 
                },
            );
            if (!deleteReaction) {
              return res.status(404).json({ message: 'No reaction with this ID..' });
            }
            res.json(deleteReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};