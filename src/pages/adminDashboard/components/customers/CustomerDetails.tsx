import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import AlertModal from "@/components/AlertModal";
import { UserDetail } from "@/types/UserDetail";
import useCustomerForm from "../../hooks/useCustomerForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CustomerBasicInfo from "./CustomerBasicInfo";
import { useCustomers } from "../../hooks/useCustomers";
import { Toaster } from "sonner";
import { successToast } from "@/utils/toastLogic";
import EditForm from "../EditForm";

interface CustomerDetailsProps {
  customer: UserDetail | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, isOpen, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { error, updateCustomer, deleteCustomer, loading } = useCustomers();

  // Use the custom form hook
  const { form, customerFields } = useCustomerForm(customer);

  if (!customer) {
    return null;
  }

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
            <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6 py-4">
                <CustomerBasicInfo customer={customer} />
              </TabsContent>

              <TabsContent value="edit" className="py-4">
                <div className="px-1">
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <EditForm
                    form={form}
                    fields={customerFields}
                    onSubmit={async (data) => {
                      await updateCustomer(customer.id, data);
                      onOpenChange(false);
                      successToast("Product updated successfully");
                    }}
                    loading={loading}
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
        trigger={null}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={async () => {
          await deleteCustomer(customer.id);
          setShowDeleteModal(false);
          onOpenChange(false);
          successToast("Customer deleted successfully");
        }}
      />
      <Toaster />
    </>
  );
};

export default CustomerDetails;
