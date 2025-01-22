import React from "react";
import Layout from "../Layout";
import Title from "@/components/ui/title";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import CreateCategory from "./CreateCategory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";

interface CategoryProps {}

const data = [
  {
    id: "1",
    name: "romance",
  },
  {
    id: "1",
    name: "romance",
  },
  {
    id: "1",
    name: "romance",
  },
  {
    id: "1",
    name: "romance",
  },
  {
    id: "1",
    name: "romance",
  },
  {
    id: "1",
    name: "romance",
  },
  {
    id: "1",
    name: "romance",
  },
];

const Category: React.FC<CategoryProps> = ({}) => {
  const handleDelete = (id: string) => {
    console.log("Delete book:", id);
  };
  return (
    <Layout>
      <div className="p-8">
        <Title
          title="Category"
          description="List categories book"
        />

        <ScrollArea className="mt-6 border rounded-md h-[58%] mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead className="w-32">Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
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
                          onClick={() => handleDelete(item.id)}
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

        <Collapsible>
          <CollapsibleTrigger>
            <Button>Add new category</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-6">
              <CreateCategory />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Layout>
  );
};

export default Category;
