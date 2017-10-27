/**
 * @file about.js
 * @author: Rob Herley
 * I pledge my honor that I abided by the Stevens Honor System.
 */

const router = require('express').Router();
const RecipeController = require('../controllers/recipes.controller');

router.get('/', RecipeController.all);
router.get('/:id', RecipeController.find);
router.post('/', RecipeController.add);
router.put('/:id', RecipeController.update);
router.delete('/:id', RecipeController.delete);

module.exports = router;
