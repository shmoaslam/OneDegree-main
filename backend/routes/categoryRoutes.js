const express = require('express');
const { 
    createCategory, 
    getAllCategory, 
    getCategory, 
    updateCategoryDetails, 
    deleteCategoryDetails 
} = require('../controllers/categoryController');

const router = express.Router();

router.post('/', createCategory); // Create a new category
router.get('/', getAllCategory); // Get all categories
router.get('/:id', getCategory); // Get a specific category by ID
router.put('/:id', updateCategoryDetails); // Update a category
router.delete('/:id', deleteCategoryDetails); // Delete a category

module.exports = router;
