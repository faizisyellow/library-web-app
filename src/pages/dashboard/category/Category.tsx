import React, { useState } from "react";
import Layout from "../Layout";
import Title from "@/components/ui/title";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import CreateCategory from "./CreateCategory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FolderX, MoreHorizontal, Trash } from "lucide-react";
import { useDeleteCategoriesMutation, useGetCategoriesQuery } from "@/store/service/categories";
import { useToast } from "@/hooks/use-toast";
import { getErrorObject } from "@/lib/helpers/error-message";
import { ToastAction } from "@/components/ui/toast";
import EmptyState from "@/components/empty-state/EmptyState";

interface CategoryProps {}

const Category: React.FC<CategoryProps> = ({}) => {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState<boolean>(false);
  const { data } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoriesMutation();
  const { toast } = useToast();
  const emptyData = data && data.data.length < 0;

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategory(id);

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
        title: "Delete Category Successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleCloseCollapse() {
    setIsCollapsibleOpen(false);
  }

  return (
    <Layout>
      <div className="p-8">
        <Title
          title="Category"
          description="List categories book"
        />

        <ScrollArea className="mt-6 border rounded-md mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">#</TableHead>
                <TableHead className="w-100">Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emptyData ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState
                      icon={FolderX}
                      title="No Category Records"
                      description="No category have been created yet."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((item, index) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        <Collapsible
          open={isCollapsibleOpen}
          onOpenChange={setIsCollapsibleOpen}
        >
          <CollapsibleTrigger>
            <Button>Add new category</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-6">
              <CreateCategory closeForm={handleCloseCollapse} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Layout>
  );
};

export default Category;
