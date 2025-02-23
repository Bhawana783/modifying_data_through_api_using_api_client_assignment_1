const express = require("express");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

// POST /menu - Add a new menu item
router.post("/menu", async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const newItem = new MenuItem({ name, description, price });
    await newItem.save();

    res.status(201).json({ message: "Menu item added successfully", data: newItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// GET /menu - Retrieve all menu items
router.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
