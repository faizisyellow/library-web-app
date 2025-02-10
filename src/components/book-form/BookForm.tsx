import React from "react";
import { Card, CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useGetCategoriesQuery } from "@/store/service/categories";

interface BookFormProps {
  form: UseFormReturn<{
    title: string;
    author: string;
    categoryId: string;
    stock: string;
    coverImage?: string | File | undefined;
  }>;
  onSubmit: (values: any) => void;
  isLoading: boolean;
  mode?: "create" | "edit";
}

const BookForm: React.FC<BookFormProps> = ({ form, onSubmit, isLoading, mode = "create" }) => {
  const { data: categories } = useGetCategoriesQuery();
  return (
    <Card>
      <CardContent className="py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={isLoading}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category">{categories?.data?.find((cat) => cat.id === field.value)?.name}</SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.data?.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            value={cat.id}
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (mode === "create" ? "Creating..." : "Updating...") : mode === "create" ? "Create Book" : "Update Book"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookForm;
