const Item = require("./../models/itemModel");

const catchAsync = require("./../utils/catchAsync");

exports.getAllItems = catchAsync(async (req, res, next) => {
  const items = await Item.find();

  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items: items,
    },
  });
});

exports.getItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next();
  }

  res.status(200).json({
    status: "success",
    data: {
      item,
    },
  });
});

exports.createItem = catchAsync(async (req, res, next) => {
  const newItem = await Item.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newItem,
    },
  });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedItem) {
    return next();
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedItem,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
