const {
  addStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
  findStoreByName,
  addStoresMany,
} = require("../models/storeModel");

// Create a new store
const createStore = async (req, res) => {
  const { store_name, store_address, locality, city, pincode } = req.body;

  // Validation
  if (
    !store_name ||
    typeof store_name !== "string" ||
    store_name.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "Store name is required and must be a non-empty string" });
  }

  try {
    // Check if the store name already exists
    const existingStore = await findStoreByName(store_name);
    if (existingStore) {
      return res.status(400).json({ error: "Store name already exists" });
    }

    // Add the store
    const store = await addStore(
      store_name,
      store_address,
      locality,
      city,
      pincode
    );
    res.status(201).json({
      message: "Store added successfully",
      store,
    });
  } catch (error) {
    console.error("Error adding store:", error.message);
    res.status(500).json({
      error: "Error adding store",
      details: error.message,
    });
  }
};

//  bulk upload

const createStoresMany = async (req, res) => {
  const stores = req.body;

  // Validation
  if (!Array.isArray(stores) || stores.length === 0) {
    return res.status(400).json({ error: "Invalid or empty store data" });
  }

  try {
    // Check for existing store names
    const existingStores = await Promise.all(
      stores.map((store) => findStoreByName(store.store_name))
    );
    if (existingStores.some((store) => store)) {
      return res
        .status(400)
        .json({ error: "One or more store names already exist" });
    }

    // Add multiple stores
    const addedStores = await addStoresMany(stores);
    res.status(201).json({
      message: "Stores added successfully",
      stores: addedStores,
    });
  } catch (error) {
    console.error("Error adding stores:", error.message);
    res.status(500).json({
      error: "Error adding stores",
      details: error.message,
    });
  }
};

// Get all stores
const getAllStoresController = async (req, res) => {
  try {
    const stores = await getAllStores();
    res.status(200).json(stores);
  } catch (error) {
    console.error("Error fetching stores:", error.message);
    res.status(500).json({ error: "Error fetching stores" });
  }
};

// Get a store by ID
const getStoreByIdController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Store ID is required" });
  }

  try {
    const store = await getStoreById(id);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json(store);
  } catch (error) {
    console.error("Error fetching store:", error.message);
    res.status(500).json({ error: "Error fetching store" });
  }
};

// Update a store
const updateStoreById = async (req, res) => {
  const { id } = req.params;
  const { store_name, store_address, locality, city, pincode } = req.body;

  if (!id || !store_name) {
    return res
      .status(400)
      .json({ error: "Store ID and store name are required" });
  }

  try {
    const updatedStore = await updateStore(
      id,
      store_name,
      store_address,
      locality,
      city,
      pincode
    );
    if (!updatedStore) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json({
      message: "Store updated successfully",
      updatedStore,
    });
  } catch (error) {
    console.error("Error updating store:", error.message);
    res.status(500).json({ error: "Error updating store" });
  }
};

// Delete a store
const deleteStoreById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Store ID is required" });
  }

  try {
    const deletedStore = await deleteStore(id);
    if (!deletedStore) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json({
      message: "Store deleted successfully",
      deletedStore,
    });
  } catch (error) {
    console.error("Error deleting store:", error.message);
    res.status(500).json({ error: "Error deleting store" });
  }
};

module.exports = {
  createStore,
  getAllStoresController,
  getStoreByIdController,
  updateStoreById,
  deleteStoreById,
  createStoresMany,
};
