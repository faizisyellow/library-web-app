import Navbar from "@/components/navbar/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useGetBooksQuery } from "@/store/service/books";
import { useCreateBorrowBookMutation } from "@/store/service/borrowing";
import { getErrorObject } from "@/lib/helpers/error-message";
import { toast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


interface ExploreProps {}

const Explore: React.FC<ExploreProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetBooksQuery(searchTerm || undefined);
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
      <div className="relative m-8">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
       </div>
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
