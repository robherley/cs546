/**
 * @file about.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const router = require('express').Router();
const CommentsController = require('../controllers/comments.controller');

router.get('/recipe/:recipeId', CommentsController.all);
router.get('/:commentId', CommentsController.find);
router.post('/:recipeId', CommentsController.add);
router.put('/:recipeId/:commentId', CommentsController.update);
router.delete('/:id', CommentsController.delete);

module.exports = router;
