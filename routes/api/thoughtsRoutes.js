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

router.route('/thoughts')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/reactions')
    .post(addThoughtReaction)
    .delete(deleteThoughtReaction);

module.exports = router;