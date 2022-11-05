const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    dispatchID: {
        type: String,
        required: [true, "Please add Dispatch ID"],
        trim: true,
      },
    driverName: {
        type: String,
        required: [true, "Please add Driver Name"],
        trim: true,
      },
    vehicleId: {
        type: String,
        required: [true, "Please add Vehicle ID"],
        trim: true,
      },
    route: {
        type: String,
        required: [true, "Please add Route"],
        trim: true,
      },
    date: {
        type: String,
        required: [true, "Please add Date"],
        trim: true,
      },
    cost: {
        type: String,
        required: [true, "Please add Cost"],
        trim: true,
      },
    status: {
        type: String,
        required: [true, "Please add Status"],
        trim: true,
      },
    },
    {
      timestamps: true,
    
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;