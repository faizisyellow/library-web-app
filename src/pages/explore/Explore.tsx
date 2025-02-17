import Navbar from "@/components/navbar/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { useGetBooksQuery } from "@/store/service/books";
import { useCreateBorrowBookMutation } from "@/store/service/borrowing";
import { getErrorObject } from "@/lib/helpers/error-message";
import { toast } from "@/hooks/use-toast";


interface ExploreProps {}

const Explore: React.FC<ExploreProps> = ({}) => {
  const { data } = useGetBooksQuery();
  const [handleBorrow] = useCreateBorrowBookMutation();

  async function borrow(id: string) {
    try {
      const response = await handleBorrow({ bookId: id });

      const error = getErrorObject(response.error);
      if (error) {
        toast({
          variant: "destructive",
          title: error.messages,
        });
        return;
      }

      toast({
        variant: "default",
        title: "Book Borrowed Successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 gap-6 m-8">
        {data?.data?.map((book, index) => (
          <Card key={index}>
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={`http://localhost:5000/public/${book?.coverImage}`}
                alt={book?.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <CardHeader>
              <CardTitle className="truncate">{book?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 truncate">{book?.author}</p>
              <p className="text-gray-500 mt-2">{book?.category?.name}</p>
              <Button
                variant="default"
                className="bg-[#4B2E83] hover:bg-[#3A2463] mt-4 w-full"
                onClick={() => borrow(book.id)}
              >
                Borrow Book
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Explore;
