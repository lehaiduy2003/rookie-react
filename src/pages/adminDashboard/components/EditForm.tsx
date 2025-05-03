import { FormFieldConfig, MyForm } from "@/components/MyForm";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface EditFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fields: FormFieldConfig[];
  onSubmit: (data: T) => void;
  loading: boolean;
}

// Add the generic type parameter to the function component
function EditForm<T extends FieldValues>({ form, fields, onSubmit, loading }: EditFormProps<T>) {
  return (
    <MyForm
      form={form}
      fields={fields}
      onSubmit={onSubmit}
      loading={loading}
      customButton={
        <div className="flex flex-col gap-3 pt-4">
          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-mainOrange hover:bg-mainOrange/90"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
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
  );
}

export default EditForm;
