const Category = require("./../models/categoryModel");

exports.getAllCategories = async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: {
      categories: categories,
    },
  });
};

exports.getCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next();
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
};

exports.createCategory = async (req, res, next) => {
  const newCategory = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      newCategory,
    },
  });
};

exports.updateCategory = async (req, res, next) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCategory) {
    return next();
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedCategory,
    },
  });
};

exports.deleteCategory = async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: {
      data: null,
    },
  });
};
