const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itemName: { type: String, required: true },
  quantityReceived: { type: Number, required: true },
  quantitySold: { type: Number, default: 0 },
  unitPrice: { type: Number, required: true },
  sellingPrice: { type: Number },
  week: { type: Number, required: true }, 
  year: { type: Number, required: true },
  createdAt: { type: String, required: true },  // ✅ Store as a string, not Date
  updatedAt: { type: String, required: true }   // ✅ Store as a string, not Date
});

module.exports = mongoose.model("Stock", stockSchema);
