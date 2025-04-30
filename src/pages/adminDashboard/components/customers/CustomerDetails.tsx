import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertModal from "@/components/AlertModal";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { UserDetail } from "@/types/UserDetail";
import { MyForm } from "@/components/MyForm";
import { CustomerForm, CustomerFormSchema } from "@/types/UpdatingCustomer";
import { errorToast, successToast } from "@/utils/toastLogic";
import UserService from "@/apis/UserService";

async function deleteCustomerById(id: string) {
  console.log("Deleting customer", id);
  try {
    await UserService.deleteUserById(id);
    successToast("Customer deleted successfully");
  } catch (error) {
    console.error("Failed to delete customer:", error);
    errorToast("Failed to delete customer");
  }
}

async function updateCustomer(id: string, customer: CustomerForm) {
  console.log("updating customer");
  try {
    await UserService.updateById(id, customer);
    successToast("Customer updated successfully");
  } catch (error) {
    console.error("An error occurs when updating customer: ", error);
    errorToast("Customer Updating failed");
  }
}

interface CustomerDetailsProps {
  customer: UserDetail | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Form schema

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, isOpen, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<CustomerForm>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      email: customer?.email || "",
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      phoneNumber: customer?.phoneNumber || "",
      address: customer?.address || "",
      isActive: customer?.isActive || false,
    },
  });

  // Reset form when customer changes
  React.useEffect(() => {
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

  async function onSubmit(data: CustomerForm) {
    if (!customer) return;

    try {
      setIsUpdating(true);
      updateCustomer(customer.id.toString(), data);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update customer:", error);
    } finally {
      setIsUpdating(false);
    }
  }

  if (!customer) {
    return null;
  }

  const formFields = [
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
  ];

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-2xl font-bold">Customer Details</DrawerTitle>
              <Button variant="destructive" size="icon" onClick={() => setShowDeleteModal(true)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <DrawerDescription>View and manage customer information</DrawerDescription>
          </DrawerHeader>

          <div className="px-4 overflow-y-auto">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 py-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.firstName} ${customer.lastName}`}
                    />
                    <AvatarFallback>
                      {customer.firstName?.[0]}
                      {customer.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center">
                    <h3 className="text-xl font-medium">
                      {customer.firstName} {customer.lastName}
                    </h3>
                    <p className="text-muted-foreground">{customer.email}</p>
                    {customer.isActive ? (
                      <Badge className="mt-1 bg-green-500">Active</Badge>
                    ) : (
                      <Badge className="mt-1 bg-gray-500">Inactive</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-muted-foreground">Customer ID</h4>
                      <p>{customer.id}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">Phone</h4>
                      <p>{customer.phoneNumber || "—"}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-muted-foreground">Address</h4>
                    <p>{customer.address || "—"}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-muted-foreground">Created On</h4>
                      <p>
                        {customer.createdOn ? format(new Date(customer.createdOn), "PPP") : "—"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-muted-foreground">Last Updated</h4>
                      <p>
                        {customer.updatedOn ? format(new Date(customer.updatedOn), "PPP") : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="edit" className="py-4">
                <div className="px-1">
                  <MyForm
                    form={form}
                    fields={formFields}
                    onSubmit={onSubmit}
                    loading={isUpdating}
                    customButton={
                      <div className="flex flex-col gap-3 pt-4">
                        {/* Active Status Switch (outside of form fields) */}
                        <div className="flex flex-row items-center justify-between rounded-lg border p-4 mb-4">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">Active Status</h3>
                            <p className="text-sm text-muted-foreground">
                              Determine if this customer account is active
                            </p>
                          </div>
                          <Switch
                            checked={customer.isActive}
                            onCheckedChange={(checked) => {
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              form.setValue("isActive" as any, checked);
                            }}
                            className="data-[state=checked]:bg-green-500"
                          />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 pt-4">
                          <Button
                            type="submit"
                            className="flex-1 bg-mainOrange hover:bg-mainOrange/90"
                            disabled={isUpdating}
                          >
                            {isUpdating ? "Saving..." : "Save Changes"}
                          </Button>
                          <DrawerClose asChild>
                            <Button variant="outline" className="flex-1">
                              Cancel
                            </Button>
                          </DrawerClose>
                        </div>
                      </div>
                    }
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DrawerContent>
      </Drawer>

      <AlertModal
        title="Delete Customer"
        description={`Are you sure you want to delete ${customer.firstName} ${customer.lastName}? This action cannot be undone.`}
        trigger={<span style={{ display: "none" }} />}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={async () => {
          if (customer.id) {
            await deleteCustomerById(customer.id.toString());
            onOpenChange(false);
          }
        }}
      />
    </>
  );
};

export default CustomerDetails;
