import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    ptype: {
      type: String,
      required: [true, "Item must have a name!"],
    },
    name: {
      type: String,
      unique: true,
    },
    barcode: {
      type: String,
      unique: true,
    },
    cost: {
      type: String,
    },
    exp: {
      type: String,
      //type: Schema.ObjectId,
      //ref: "Category",
      required: [true, "Item must belong to a category"],
    },
    istrack: {
      type: String,
      
    },
    mrkup: {
      type: String,
      default: false,
    },
    mfd: {
      type: String,
      default: false,
    },
    exp: {
      type: String,
      default: false,
      required: [true, "Transaction Amount is Required"],
    },
    retail: {
      type: Number,
      min: 0,
    },
    sell: {
      type: Number,
      min: 0,
    },
    sku: {
      type: Number,
      min: 0,
    },
    sup: {
      type: String,
      min: 0,
    },
    tax: {
      type: Number,
      min: 0,
    },
    slug: {
      type: String,
    }
  },
);

itemSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const createItemModel = (connection) => {
  return connection.model('Item', itemSchema);
};

// const Item = mongoose.model("Item", itemSchema);

export default createItemModel;
