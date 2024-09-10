const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    userAddFriend,
    deleteUserFriend,
} = require('../../controllers/usersControllers');

router.route('/users')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/friends/:friendId')
    .post(userAddFriend)
    .delete(deleteUserFriend);

module.exports = router;