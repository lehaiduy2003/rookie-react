import UserService from "@/apis/UserService";
import { CustomerForm } from "@/types/UpdatingCustomer";
import { errorToast, successToast } from "@/utils/toastLogic";

export async function deleteCustomerById(id: string) {
  console.log("Deleting customer", id);
  try {
    await UserService.deleteUserById(id);
    successToast("Customer deleted successfully");
  } catch (error) {
    console.error("Failed to delete customer:", error);
    errorToast("Failed to delete customer");
  }
}

export async function updateCustomer(id: string, customer: CustomerForm) {
  console.log("updating customer");
  try {
    await UserService.updateById(id, customer);
    successToast("Customer updated successfully");
  } catch (error) {
    console.error("An error occurs when updating customer: ", error);
    errorToast("Customer Updating failed");
  }
}
