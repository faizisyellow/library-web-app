import React, { useEffect } from "react";
import Layout from "../../Layout";
import Title from "@/components/ui/title";
import BookForm from "@/components/book-form/BookForm";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditBooksMutation, useGetBookQuery } from "@/store/service/books";
import { useNavigate, useParams } from "react-router";
import { getErrorObject } from "@/lib/helpers/error-message";
import { useToast } from "@/hooks/use-toast";


interface EditBookProps {}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  coverImage: z.union([z.instanceof(File), z.string().optional()]).optional(),
  categoryId: z.string().min(1, "Category is required"),
  stock: z.string().min(1, "Stock is required"),
});

const EditBook: React.FC<EditBookProps> = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const { data: bookData, isLoading: isBookLoading } = useGetBookQuery(id!);
  const [editBook, { isLoading: isEditing }] = useEditBooksMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      coverImage: undefined,
      categoryId: "",
      stock: "0",
    },
  });

  // Update form values when book data is loaded
  useEffect(() => {
    if (bookData?.data) {
      form.reset({
        title: bookData.data.title,
        author: bookData.data.author,
        coverImage: bookData.data.coverImage ?? undefined,
        categoryId: bookData.data.category?.id,
        stock: String(bookData.data.stock),
      });
    }
  }, [bookData, form.reset]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!id) {
        throw new Error("Book ID is required");
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("categoryId", values.categoryId);
      formData.append("stock", values.stock);

      if (values.coverImage instanceof File) {
        // New file uploaded
        formData.append("coverImage", values.coverImage);
      }

      const mutationPayload = {
        id,
        dataUpdate: formData,
      };

      await editBook(mutationPayload).unwrap();

      toast({
        variant: "default",
        title: "Book Updated Successfully",
      });

      form.reset();
      navigate("/dashboard/books");
    } catch (error) {
      const errorObj = getErrorObject(error);
      toast({
        variant: "destructive",
        title: errorObj?.messages || "Failed to update book",
      });
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <Title
          title="Books"
          description="Edit Book"
        />
        <div className="mt-8">
          <BookForm
            form={form}
            onSubmit={handleSubmit}
            mode="edit"
            isLoading={isBookLoading || isEditing}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditBook;
