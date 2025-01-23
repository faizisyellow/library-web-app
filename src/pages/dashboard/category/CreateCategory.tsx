import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCategoriesMutation } from "@/store/service/categories";
import { getErrorObject } from "@/lib/helpers/error-message";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface CreateCategoryProps {
  closeForm: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

const CreateCategory: React.FC<CreateCategoryProps> = ({ closeForm }) => {
  const [addCategory] = useCreateCategoriesMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await addCategory(values);

      const error = getErrorObject(response.error);
      if (error) {
        toast({
          variant: "destructive",
          title: error.messages,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      toast({
        variant: "default",
        title: "Category Added Successfully",
      });

      form.reset();
      closeForm();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            className="p-6 md:p-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      type="category"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-min mt-5"
            >
              Create Category
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateCategory;
