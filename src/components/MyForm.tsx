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
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface FormFieldOption {
  value: string;
  label: string;
}

interface FormFieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  description?: string;
  options?: FormFieldOption[];
}

interface MyFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fields: FormFieldConfig[];
  onSubmit: (data: T) => void;
  loading: boolean;
  customButton?: JSX.Element;
  children?: React.ReactNode;
}

export const MyForm = <T extends FieldValues>({
  form,
  fields,
  onSubmit,
  loading,
  customButton,
  children,
}: MyFormProps<T>) => {
  return (
    <>
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
                    {/* Render different input types based on fieldConfig.type */}
                    {fieldConfig.type === "checkbox" ? (
                      // render checkbox if fieldConfig.type is checkbox
                      <Switch
                        id={fieldConfig.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-500"
                      />
                    ) : fieldConfig.type === "select" && fieldConfig.options ? (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={fieldConfig.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldConfig.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={fieldConfig.name}
                        type={fieldConfig.type}
                        placeholder={fieldConfig.placeholder}
                        {...field}
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      />
                    )}
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
                id="btn-submit"
                type="submit"
                className={`w-full bg-mainOrange hover:bg-mainOrange/90 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                // Disable the button if loading, form is submitting, or form is invalid
                disabled={loading || form.formState.isSubmitting || !form.formState.isValid}
              >
                {loading ? <Spinning /> : "Submit"}
              </Button>
            )}
            {/* Optional children elements */}
            {children}
          </div>
        </form>
      </Form>
      <Toaster />
    </>
  );
};
