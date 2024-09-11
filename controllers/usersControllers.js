const { Users, Thoughts } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await Users.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await Users.findById({ _id: req.params.id })
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID..' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const createdUser = await Users.create(req.body);
            res.json(createdUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await Users.findByIdAndUpdate(
                { _id: req.params.id },
                { 
                    username: req.body.username,
                    email: req.body.email,
                },
                { new: true });
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const deleteUser = await Users.findByIdAndDelete({ _id: req.params.id });
            if (!deleteUser) {
                return res.status(404).json({ message: 'No user with that ID..' });
            }
            await Thoughts.deleteMany({ _id: { $in: deleteUser.thoughts } });
            res.json({ message: 'User and thoughts deleted..' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async userAddFriend(req, res) {
        try {
            const user = await Users.findById({ _id: req.params.id })
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID..' });
            }
            user.friends.push(req.params.friendsId)
            await user.save();
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUserFriend(req, res) {
        try {
            const user = await Users.findById({ _id: req.params.id })
            if (!user) {
              return res.status(404).json({ message: 'ID not found..' });
            }
            user.friends.pull(req.params.friendsId)
            await user.save();
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};