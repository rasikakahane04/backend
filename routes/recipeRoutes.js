const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

//Create a Recipe
router.post('/recipes', async (req, res) => {
    try {
        const { name, description, ingredients, instructions, imageUrl, cookingTime, createdBy } = req.body;

        const recipe = new Recipe({ name, description, ingredients, instructions, imageUrl, cookingTime, createdBy });
        await recipe.save();

        res.status(201).json({ message: "Recipe added successfully!", recipe });
    } catch (err) {
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

//Get All Recipes
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('createdBy', 'username email');
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

//Get Single Recipe by ID
router.get('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'username email');
        if (!recipe) return res.status(404).json({ error: "Recipe not found" });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

//Update a Recipe
router.put('/recipes/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Recipe updated successfully!", updatedRecipe });
    } catch (err) {
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

// Delete a Recipe
router.delete('/recipes/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.json({ message: "Recipe deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Server error: " + err.message });
    }
});

module.exports = router;
