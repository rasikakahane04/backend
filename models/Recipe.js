const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }], // Array of ingredients
    instructions: { type: String, required: true },
    imageUrl: { type: String },
    cookingTime: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Link to user
});

module.exports = mongoose.model('Recipe', RecipeSchema);
