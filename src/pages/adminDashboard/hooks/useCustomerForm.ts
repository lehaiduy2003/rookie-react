import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerForm, CustomerFormSchema } from "@/types/CustomerFormValues";
import { UserDetail } from "@/types/UserDetail";

/**
 * Custom hook to manage customer form logic
 * Handles form initialization, validation, submission, and field configuration
 */
export function useCustomerForm(customer: UserDetail | null) {
  // Initialize form with react-hook-form and zod validation
  const form = useForm<CustomerForm>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      isActive: false,
    },
  });

  // Reset form when customer changes
  useEffect(() => {
    if (customer) {
      form.reset({
        email: customer.email || "",
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        phoneNumber: customer.phoneNumber || "",
        address: customer.address || "",
        isActive: customer.isActive || false,
      });
    }
  }, [customer, form]);

  // Customer form fields configuration
  const customerFields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "First name",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Last name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email address",
    },
    {
      name: "phoneNumber",
      label: "Phone",
      type: "tel",
      placeholder: "Phone number",
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Address",
    },
    {
      name: "isActive",
      label: "Active",
      type: "checkbox",
      placeholder: "Is Active",
    },
  ];

  return {
    form,
    customerFields,
  };
}

export default useCustomerForm;
