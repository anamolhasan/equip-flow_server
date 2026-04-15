import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";


const getAllCategories = async (req:Request, res:Response, next:NextFunction) => {
    // get all categories
    try {
         try {
        const { q } = req.query;
        const categories = await CategoryService.getAllCategories(q as string);
        res.status(200).json({ success: true, message: "Categories fetched successfully", data: categories });
    } catch (error) {
        next(error);
    }
    } catch (error) {
        
    }
}
const getCategoriesById = async (req:Request, res:Response, next:NextFunction) => {
    // get categories by id
    try {
        const { slug } = req.params;
        const category = await CategoryService.getCategoryBySlug(slug as string);
        res.status(200).json({ success: true, message: "Category fetched successfully", data: category });
    } catch (error) {
        next(error);
    }
}
const createCategories = async (req:Request, res:Response, next:NextFunction) => {
    // create categories
      try {
        const category = await CategoryService.createCategory(req.body);
        res.status(201).json({ success: true, message: "Category created successfully", data: category });
    } catch (error) {
        next(error);
    }
}
const updateCategories = async (req:Request, res:Response, next:NextFunction) => {
    // update categories
     try {
        const { id } = req.params;
        const category = await CategoryService.updateCategory(id as string, req.body);
        res.status(200).json({ success: true, message: "Category updated successfully", data: category });
    } catch (error) {
        next(error);
    }
}
const deleteCategories = async (req:Request, res:Response, next:NextFunction) => {
    // delete categories
     try {
        const { id } = req.params;
        await CategoryService.deleteCategory(id as string);
        res.status(200).json({ success: true, message: "Category deleted successfully", data: null });
    } catch (error) {
        next(error);
    }
}


export const categoriesController = {
    getAllCategories,
    getCategoriesById,
    createCategories,
    updateCategories,
    deleteCategories
}