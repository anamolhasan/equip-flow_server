import express from 'express';
import { categoriesController } from './category.controller';

const router = express.Router();

// Public routes
router.get("/", categoriesController.getAllCategories);

// Admin only — vendors don't manage categories
router.post("/", validateRole("admin"), validateRequest(createCategorySchema), categoryController.createCategory);
router.patch("/:id", validateRole("admin"), validateRequest(updateCategorySchema), categoryController.updateCategory);
router.delete("/:id", validateRole("admin"), categoryController.deleteCategory);

export const CategoryRoutes = router;
