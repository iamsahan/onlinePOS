import Category from "./../models/categoryModel.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
  
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
  
    res.status(201).json({
      status: "success",
      data: {
        newCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
  
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
