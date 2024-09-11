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

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
    
router.route('/:id/friends/:friendsId')
    .post(userAddFriend)
    .delete(deleteUserFriend);

module.exports = router;