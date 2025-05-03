"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import AlertModal from "@/components/AlertModal";
import { useState } from "react";
import CustomerDetails from "./CustomerDetails";
import { UserDetail } from "@/types/UserDetail";
import { Toaster } from "sonner";
import { useCustomers } from "../../hooks/useCustomers";

interface CustomerActionsCellProps {
  customer: UserDetail;
}

export default function CustomerActionsCell({ customer }: CustomerActionsCellProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const { deleteCustomer } = useCustomers();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-mainOrange hover:text-mainOrange/80">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.id.toString())}>
            Copy customer ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDetailsDrawer(true)}>
            View customer details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete customer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomerDetails
        customer={customer}
        isOpen={showDetailsDrawer}
        onOpenChange={setShowDetailsDrawer}
      />

      {showDeleteModal && (
        <AlertModal
          title="Delete customer?"
          description={`Are you sure you want to delete ${customer.email}?`}
          onConfirm={async () => {
            await deleteCustomer(customer.id);
            setShowDeleteModal(false);
          }}
          trigger={<span style={{ display: "none" }} />}
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
        />
      )}
      <Toaster />
    </>
  );
}
