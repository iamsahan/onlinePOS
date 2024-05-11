import Item from "./../models/itemModel";
import catchAsync from "./../utils/catchAsync";

export const getAllItems = catchAsync(async (req, res, next) => {
  const items = await Item.find();

  res.status(200).json({
    status: "success",
    results: items.length,
    data: {
      items,
    },
  });
});

export const getItem = catchAsync(async (req, res, next) => {
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

export const createItem = catchAsync(async (req, res, next) => {
  const newItem = await Item.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newItem,
    },
  });
});

export const updateItem = catchAsync(async (req, res, next) => {
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

export const deleteItem = catchAsync(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
