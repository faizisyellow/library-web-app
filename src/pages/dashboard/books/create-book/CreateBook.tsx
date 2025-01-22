import React from "react";
import Layout from "../../Layout";
import Title from "@/components/ui/title";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BookForm from "@/components/book-form/BookForm";

interface CreateBookProps {}

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  coverImage: z.instanceof(File, { message: "Cover image is required" }),
  categoryId: z.string().min(1),
});

const CreateBook: React.FC<CreateBookProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      coverImage: undefined,
      categoryId: "",
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
