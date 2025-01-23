import React from "react";
import Layout from "../../Layout";
import Title from "@/components/ui/title";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BookForm from "@/components/book-form/BookForm";
import { useCreateBooksMutation } from "@/store/service/books";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

interface CreateBookProps {}

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  coverImage: z.instanceof(File, { message: "Cover image is required" }),
  categoryId: z.string().min(1),
});

const CreateBook: React.FC<CreateBookProps> = ({}) => {
  const [createbook] = useCreateBooksMutation();
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
      formData.append("coverImage", values.coverImage);

      await createbook(formData).unwrap();
      toast({
        variant: "default",
        title: "Add book successfull",
      });
      form.reset();

      navigate("/dashboard/books");
    } catch (error) {
      // Handle error (show error toast/message)
      console.error("Book creation failed:", error);
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
            isLoading={false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CreateBook;
