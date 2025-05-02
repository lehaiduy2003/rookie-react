import CategoryService from "@/apis/CategoryService";

export const getAllCategories = async () => {
  try {
    const categories = await CategoryService.getAllCategories();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
