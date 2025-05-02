import ProductService from "@/apis/ProductService";
import { ProductForm } from "@/types/UpdatingProduct";
import { successToast } from "@/utils/toastLogic";

export async function deleteProductById(id: string) {
  try {
    await ProductService.deleteProductById(id);
    successToast("Product deleted successfully", "The product has been deleted.");
  } catch (error) {
    console.error("Error deleting product:", error);
    const action = {
      label: "retry",
      onClick: () => {
        deleteProductById(id);
      },
    };
    successToast("Error deleting product", "Please try again.", action);
  }
}

export async function updateProduct(id: string, product: ProductForm) {
  try {
    const UpdatingProduct = {
      ...product,
      categoryId: Number(product.categoryId),
    };
    await ProductService.updateProductById(Number(id), UpdatingProduct);
    successToast("Product updated successfully", "The product has been updated.");
  } catch (error) {
    console.error("Error updating product:", error);
    const action = {
      label: "retry",
      onClick: () => {
        updateProduct(id, product);
      },
    };
    successToast("Error updating product", "Please try again.", action);
  }
}
