const {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  findCategoryByName,
} = require("../models/categoryModel");

const createCategory = async (req, res) => {
  const { category_name } = req.body;

  //validation
  if (
    !category_name ||
    typeof category_name !== "string" ||
    category_name.trim() === ""
  ) {
    return res.status(400).json({
      error: "Category Name is required and must be non-empty string",
    });
  }

  try {
    // Check if the color name already exists
    const existingMaterial = await findCategoryByName(category_name);
    if (existingMaterial) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    // Add category
    const category = await addCategory(category_name);
    res.status(201).json({ message: "Category added Successfully", category });
  } catch (error) {
    console.error("Error adding Category:", error.message);
    res
      .status(500)
      .json({ error: "Error Fetching Category", details: error.message });
  }
};

// Get all categories
const getAllCategory = async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ error: "Error fetching categories" });
  }
};

// Get a specific category by ID
const getCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Category ID is required" });
  }

  try {
    const category = await getCategoryById(id);
    if (!category) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({ error: "Error fetching category" });
  }
};

// Update a category
const updateCategoryDetails = async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;

  if (!id || !category_name) {
    return res.status(400).json({ error: "Category ID and name are required" });
  }

  try {
    const updatedCategory = await updateCategory(id, category_name);
    if (!updatedCategory) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res
        .status(200)
        .json({ message: "Category updated successfully", updatedCategory });
    }
  } catch (error) {
    console.error("Error updating category:", error.message);
    res.status(500).json({ error: "Error updating category" });
  }
};

// Delete a category
const deleteCategoryDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Category ID is required" });
  }

  try {
    const deletedCategory = await deleteCategory(id);
    if (!deletedCategory) {
      res.status(404).json({ error: "Category not found" });
    } else {
      res
        .status(200)
        .json({ message: "Category deleted successfully", deletedCategory });
    }
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ error: "Error deleting category" });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategoryDetails,
  deleteCategoryDetails,
};
