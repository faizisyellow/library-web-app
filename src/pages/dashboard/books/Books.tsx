import React, { useState } from "react";
import Layout from "../Layout";
import Title from "@/components/ui/title";
import EmptyState from "@/components/empty-state/EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FolderX, MoreHorizontal, Pencil, Trash, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDeleteBooksMutation, useGetBooksQuery } from "@/store/service/books";
import { getErrorObject } from "@/lib/helpers/error-message";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const Books: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetBooksQuery(searchTerm || undefined);
  const [deleteBook] = useDeleteBooksMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const emptyData = data && data.data.length < 0;

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteBook(id);
      const error = getErrorObject(response.error);
      if (error) {
        toast({
          variant: "destructive",
          title: error.messages,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/books/report", {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to download report");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "books_report.xlsx"); 
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
  
      toast({ title: "Export Successful", description: "Books report downloaded!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Export Failed", description: "Error while downloading" });
    }
  };
  

  return (
    <Layout>
      <div className="p-8">
        <Title title="Books" description="List All Books" />
        <div className="flex justify-between items-center">
        <div className="relative my-4">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
              />
         </div>
         <Button variant={"outline"} onClick={handleExport}>Export</Button>
          </div>

        <ScrollArea className="mt-6 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead className="w-32">Cover</TableHead>
                <TableHead className="w-100">Title</TableHead>
                <TableHead className="w-52">Author</TableHead>
                <TableHead className="w-48">Category</TableHead>
                <TableHead className="w-48">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emptyData ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState
                      icon={FolderX}
                      title="No Book Records"
                      description="No book have been created yet."
                      action={
                        <Link to={"/dashboard/books/create"}>
                          <Button>Add New Books</Button>
                        </Link>
                      }
                    />
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((book, index) => (
                  <TableRow key={book.id}>
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={`http://localhost:5000/public/${book.coverImage}`}
                        alt={book.title}
                        className="w-11 h-11 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.category.name}</TableCell>
                    <TableCell>{book.stock}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(book.id)}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(book.id)}
                            className="cursor-pointer text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </Layout>
  );
};

export default Books;
