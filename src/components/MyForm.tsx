/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "@/components/ui/form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
import Spinning from "./Spinning";
import { Input } from "./ui/input";
import { Toaster } from "sonner";
import { JSX } from "react";

interface FormFieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  description?: string;
}

interface MyFormProps<T extends FieldValues> {
  label: string;
  form: UseFormReturn<T>;
  fields: FormFieldConfig[];
  onSubmit: (data: T) => void;
  loading: boolean;
  submitLabel?: string;
  customButton?: JSX.Element;
  children?: React.ReactNode;
}

export const MyForm = <T extends FieldValues>({
  label,
  form,
  fields,
  onSubmit,
  loading,
  submitLabel = "Submit",
  customButton,
  children,
}: MyFormProps<T>) => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {/* form label */}
      <h2 className="text-2xl font-bold mb-6 text-center">{label}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* form fields */}
          {fields.map((fieldConfig) => (
            <FormField
              key={fieldConfig.name}
              control={form.control}
              name={fieldConfig.name as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldConfig.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={fieldConfig.type}
                      placeholder={fieldConfig.placeholder}
                      {...field}
                    />
                  </FormControl>
                  {fieldConfig.description && (
                    <FormDescription>{fieldConfig.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {/* submit button */}
          <div className="flex flex-col gap-3">
            {customButton ? (
              customButton
            ) : (
              <Button
                type="submit"
                className={`w-full bg-mainOrange hover:bg-mainOrange/90 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                // Disable the button if loading, form is submitting, or form is invalid
                disabled={loading || form.formState.isSubmitting || !form.formState.isValid}
              >
                {loading ? <Spinning /> : submitLabel}
              </Button>
            )}
            {/* Optional children elements */}
            {children}
          </div>
        </form>
      </Form>
      <Toaster />
    </div>
  );
};
