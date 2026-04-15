import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { CreateCategoryInput, UpdateCategoryInput } from "./category.validation";



const getAllCategories = async (q?: string) => {
    const categories = await prisma.category.findMany({
        where: q ? {
            OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
            ]
        } : {},
        orderBy: { updatedAt: "desc" }
    });
    return categories;
}

const getCategoryBySlug = async (slug: string) => {
    const category = await prisma.category.findUnique({ where: { slug } });
    if (!category) {
        throw new ApiError(404, "Category not found");
    }
    return category;
}

const createCategory = async (data: CreateCategoryInput) => {
    const category = await prisma.category.create({ data });
    return category;
}

const updateCategory = async (id: string, data: UpdateCategoryInput) => {
    const existingCategory = await prisma.category.findUnique({ where: { id } });
    if (!existingCategory) {
        throw new ApiError(404, "Category not found");
    }
    const category = await prisma.category.update({ where: { id }, data });
    return category;
}

const deleteCategory = async (id: string) => {
    const existingCategory = await prisma.category.findUnique({ where: { id } });
    if (!existingCategory) {
        throw new ApiError(404, "Category not found");
    }
    await prisma.category.delete({ where: { id } });
}

export const CategoryService = {
    getAllCategories,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
}