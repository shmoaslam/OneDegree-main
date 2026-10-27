const {
  addCollection,
  getCollection,
  updateCollection,
  deleteCollections,
  findCollectionByName,
  getCollectionsById,
} = require("../models/CollectionModel");

const createCollection = async (req, res) => {
  const { collection_name, collection_desc, collection_image } = req.body;

  // Validation
  if (
    !collection_name ||
    typeof collection_name !== "string" ||
    collection_name.trim() === ""
  ) {
    return res.status(400).json({
      error: "Collection Name is required and must be a non-empty string",
    });
  }

  try {
    // Check if the collection name already exists
    const existingCollection = await findCollectionByName(collection_name);
    if (existingCollection) {
      return res.status(400).json({ error: "Collection name already exists" });
    }

    // Add collection with description and image
    const collection = await addCollection(
      collection_name,
      collection_desc,
      collection_image
    );
    res
      .status(201)
      .json({ message: "Collection added successfully", collection });
  } catch (error) {
    console.error("Error adding collection:", error.message);
    res
      .status(500)
      .json({ error: "Error adding collection", details: error.message });
  }
};

// Get all collections
const getAllCollection = async (req, res) => {
  try {
    const collections = await getCollection();
    res.status(200).json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error.message);
    res.status(500).json({ error: "Error fetching collections" });
  }
};

// Get a specific collection by ID
const getCollectionById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Collection ID is required" });
  }

  try {
    const collection = await getCollectionsById(id);
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    console.error("Error fetching collection:", error.message);
    res.status(500).json({ error: "Error fetching collection" });
  }
};

// Update a collection
const updateCollectionById = async (req, res) => {
  const { id } = req.params;
  const { collection_name, collection_desc, collection_image } = req.body;

  if (!id || !collection_name) {
    return res
      .status(400)
      .json({ error: "Collection ID and name are required" });
  }

  try {
    const updatedCollection = await updateCollection(
      id,
      collection_name,
      collection_desc,
      collection_image
    );
    if (!updatedCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json({
      message: "Collection updated successfully",
      updatedCollection,
    });
  } catch (error) {
    console.error("Error updating collection:", error.message);
    res.status(500).json({ error: "Error updating collection" });
  }
};

// Delete a collection
const deleteCollection = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Collection ID is required" });
  }

  try {
    const deletedCollection = await deleteCollections(id);
    if (!deletedCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res
      .status(200)
      .json({ message: "Collection deleted successfully", deletedCollection });
  } catch (error) {
    console.error("Error deleting collection:", error.message);
    res.status(500).json({ error: "Error deleting collection" });
  }
};

module.exports = {
  createCollection,
  getAllCollection,
  getCollectionById,
  updateCollectionById,
  deleteCollection,
};
