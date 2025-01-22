import React from "react";
import Layout from "../Layout";
import Title from "@/components/ui/title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router";

interface BooksProps {}

const data = [
  {
    id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
    title: "Lucifer",
    author: "Cloe",
    coverImage: "Lucifer.jpg",
    category: {
      id: "b6a11a16-1c25-430d-ad91-afc0b9941aa3",
      name: "Fantasy",
    },
  },
  {
    id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
    title: "Lucifer",
    author: "Cloe",
    coverImage: "Lucifer.jpg",
    category: {
      id: "b6a11a16-1c25-430d-ad91-afc0b9941aa3",
      name: "Fantasy",
    },
  },
  {
    id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
    title: "Lucifer",
    author: "Cloe",
    coverImage: "Lucifer.jpg",
    category: {
      id: "b6a11a16-1c25-430d-ad91-afc0b9941aa3",
      name: "Fantasy",
    },
  },
  {
    id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
    title: "Lucifer",
    author: "Cloe",
    coverImage: "Lucifer.jpg",
    category: {
      id: "b6a11a16-1c25-430d-ad91-afc0b9941aa3",
      name: "Fantasy",
    },
  },
  {
    id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
    title: "Lucifer morningstart the devil",
    author: "apa ya aplaah asdjoasjdao ashdisahdiaisi",
    coverImage: "Lucifer.jpg",
    category: {
      id: "b6a11a16-1c25-430d-ad91-afc0b9941aa3",
      name: "Fantasy asd apalah",
    },
  },
  {
    id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
    title: "Lucifer morningstart the devil",
    author: "apa ya aplaah asdjoasjdao ashdisahdiaisi",
    coverImage: "Lucifer.jpg",
    category: {
      id: "b6a11a16-1c25-430d-ad91-afc0b9941aa3",
      name: "Fantasy asd apalah",
    },
  },
  {
    id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
    title: "Lucifer morningstart the devil",
    author: "apa ya aplaah asdjoasjdao ashdisahdiaisi",
    coverImage: "Lucifer.jpg",
    category: {
      id: "b6a11a16-1c25-430d-ad91-afc0b9941aa3",
      name: "Fantasy asd apalah",
    },
  },
];

const Books: React.FC<BooksProps> = () => {
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    console.log("Delete book:", id);
  };

  return (
    <Layout>
      <div className="p-8">
        <Title
          title="Books"
          description="List All Books"
        />
        <ScrollArea className="mt-6 border rounded-md h-[58%]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead className="w-32">Cover</TableHead>
                <TableHead className="w-64">Title</TableHead>
                <TableHead className="w-60">Author</TableHead>
                <TableHead className="w-48">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((book, index) => (
                <TableRow key={book.id}>
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={"https://i1.sndcdn.com/avatars-njtnly1CSaXFBoFn-SxMbXQ-t1080x1080.jpg"}
                      alt={book.title}
                      className="w-11 h-11 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category.name}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </Layout>
  );
};

export default Books;
