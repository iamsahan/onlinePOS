const mongoose = require("mongoose");

const slugify = require("slugify");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item must have a name!"],
    },
    slug: {
      type: String,
      unique: true,
    },
    itemCode: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Item must belong to a category"],
    },
    noOfPurchases: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: false,
    },
    returns: {
      type: Number,
      min: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

itemSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
