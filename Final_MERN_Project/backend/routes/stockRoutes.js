const express = require("express");
const Stock = require("../models/Stock");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add stock entry
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { itemName, quantityReceived, unitPrice, sellingPrice, week, year, createdAt, updatedAt } = req.body;

    // ✅ Convert `createdAt` & `updatedAt` to IST in ISO format
    const createdIST = new Date(new Date(createdAt).getTime() + 5.5 * 60 * 60 * 1000).toISOString();
    const updatedIST = new Date(new Date(updatedAt).getTime() + 5.5 * 60 * 60 * 1000).toISOString();

    const newStock = new Stock({
      userId: req.userId,
      itemName,
      quantityReceived,
      unitPrice,
      sellingPrice,
      week,
      year,
      createdAt: createdIST,  // ✅ Now stored in ISO format with IST time
      updatedAt: updatedIST
    });

    await newStock.save();
    res.status(201).json({ message: "Stock added successfully" });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get stocks by user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const stocks = await Stock.find({ userId: req.userId });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update stock sales data
// Update stock sales data & prices
router.put("/update-sales/:id", authMiddleware, async (req, res) => {
  const { quantitySold, unitPrice, sellingPrice } = req.body;

  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    // ❌ Prevent overselling
    if (quantitySold > stock.quantityReceived) {
      return res.status(400).json({ message: "Cannot sell more than received quantity" });
    }

    // ✅ Allow updating `unitPrice` & `sellingPrice`
    stock.quantitySold = quantitySold;
    if (unitPrice !== undefined) stock.unitPrice = unitPrice;
    if (sellingPrice !== undefined) stock.sellingPrice = sellingPrice;

    // ✅ Update the timestamp
    stock.updatedAt = new Date().toISOString();

    await stock.save();
    res.json({ message: "Stock updated successfully", stock });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch stocks by week & year (with optional range)
router.get("/filter", authMiddleware, async (req, res) => {
  try {
    const { week, year, startWeek, endWeek } = req.query;
    const userId = req.userId; // Get logged-in user

    let query = { userId, year };

    // If a specific week is selected
    if (week) {
      query.week = parseInt(week);
    }

    // If filtering by a week range
    if (startWeek && endWeek) {
      query.week = { $gte: parseInt(startWeek), $lte: parseInt(endWeek) };
    }

    const stocks = await Stock.find(query).sort({ week: 1 });
    res.json(stocks);
  } catch (error) {
    console.error("Error fetching filtered stocks:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



module.exports = router;
