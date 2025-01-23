import React from "react";
import Layout from "../../Layout";
import Title from "@/components/ui/title";
import BookForm from "@/components/book-form/BookForm";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBooksMutation } from "@/store/service/books";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { getErrorObject } from "@/lib/helpers/error-message";
import { ToastAction } from "@/components/ui/toast";

interface CreateBookProps {}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  coverImage: z.union([z.instanceof(File), z.string().optional()]).optional(),
  categoryId: z.string().min(1, "Category is required"),
});

const CreateBook: React.FC<CreateBookProps> = () => {
  const [createBook, { isLoading: isCreating }] = useCreateBooksMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      coverImage: undefined,
      categoryId: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("categoryId", values.categoryId);

      if (values.coverImage instanceof File) {
        formData.append("coverImage", values.coverImage);
      }

      const response = await createBook(formData).unwrap();

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
        title: "Book Added Successfully",
      });

      form.reset();
      navigate("/dashboard/books");
    } catch (error) {
      const errorObj = getErrorObject(error);
      toast({
        variant: "destructive",
        title: errorObj?.messages || "Failed to create book",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <Title
          title="Books"
          description="Create new book"
        />
        <div className="mt-8">
          <BookForm
            form={form}
            onSubmit={handleSubmit}
            isLoading={isCreating}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CreateBook;
