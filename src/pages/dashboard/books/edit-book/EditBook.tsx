import React from "react";
import Layout from "../../Layout";
import Title from "@/components/ui/title";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BookForm from "@/components/book-form/BookForm";

interface EditBookProps {}

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  coverImage: z.instanceof(File, { message: "Cover image is required" }),
  categoryId: z.string().min(1),
});

const bookDataById = {
  title: "harry potter",
  author: "person",
  coverImage: { File },
  categoryId: "1",
};

const EditBook: React.FC<EditBookProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: bookDataById.title,
      author: bookDataById.author,
      coverImage: undefined,
      categoryId: bookDataById.categoryId,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Layout>
      <div className="p-8">
        <Title
          title="Books"
          description="Edit book"
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

export default EditBook;
