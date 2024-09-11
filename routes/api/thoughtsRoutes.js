const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    deleteThoughtReaction,
} = require('../../controllers/thoughtsControllers');

router.route('/')
    .get(getThoughts)
    
router.route('/user/:userId')
    .post(createThought);

router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)
    .post(addThoughtReaction);

router.route('/:id/reactions/:reactionId')
    .delete(deleteThoughtReaction);

module.exports = router;