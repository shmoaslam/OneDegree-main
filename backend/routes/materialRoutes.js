const express = require('express');
const { createMaterial, getAllMaterials, getMaterial, updateMaterialDetails, deleteMaterialDetails } = require('../controllers/materialController');

const router = express.Router();

router.post('/', createMaterial);

router.get('/', getAllMaterials);          // Get all materials
router.get('/:id', getMaterial);           // Get a specific material by ID
router.put('/:id', updateMaterialDetails); // Update a material
router.delete('/:id', deleteMaterialDetails); // Delete a material

module.exports = router;
