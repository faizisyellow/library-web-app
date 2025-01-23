import React from "react";
import Layout from "../Layout";
import Title from "@/components/ui/title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatUSDateTimeShort } from "@/lib/format/time";
import { useGetBorrowBooksQuery } from "@/store/service/borrowing";
import EmptyState from "@/components/empty-state/EmptyState";
import { FolderX } from "lucide-react";

interface BorrowingProps {}

const Borrowing: React.FC<BorrowingProps> = () => {
  const { data, isLoading } = useGetBorrowBooksQuery();

  return (
    <Layout>
      <div className="p-8">
        <Title
          title="Borrowing"
          description="List all borrow book"
        />
        <div className="mt-8">
          <ScrollArea className="mt-6 border rounded-md h-[58%]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">#</TableHead>
                  <TableHead className="w-32">Cover</TableHead>
                  <TableHead className="w-64">Title</TableHead>
                  <TableHead className="w-60">Status</TableHead>
                  <TableHead className="w-60">Borrowed Date</TableHead>
                  <TableHead className="w-60">Returned Date</TableHead>
                  <TableHead className="w-48">User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!isLoading && data?.data && data.data.length > 0 ? (
                  data.data.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <img
                          src={`http://localhost:5000/public/${item?.book?.coverImage}`}
                          alt={item.book?.title || "No Title"}
                          className="w-11 h-11 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.book?.title}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "borrowed" ? "destructive" : "success"}>{item.status}</Badge>
                      </TableCell>
                      <TableCell>{formatUSDateTimeShort(item.borrowDate)}</TableCell>
                      <TableCell>{item.returnDate ? formatUSDateTimeShort(item.returnDate) : "Not Returned"}</TableCell>
                      <TableCell>{item.user?.email}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <EmptyState
                        icon={FolderX}
                        title="No Borrowing Records"
                        description="No books have been borrowed yet."
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default Borrowing;
