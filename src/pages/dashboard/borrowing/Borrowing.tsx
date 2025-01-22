import React from "react";
import Layout from "../Layout";
import Title from "@/components/ui/title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatUSDateTimeShort } from "@/lib/format/time";

interface BorrowingProps {}

const data = [
  {
    id: "b9917b4c-a324-40d8-b7a6-e0c4369db78d",
    borrowDate: "2025-01-21T00:07:17.959Z",
    returnDate: "2025-01-21T02:00:40.520Z",
    status: "returned",
    book: {
      id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
      title: "Lucifer",
      author: "Cloe",
      coverImage: "Lucifer.jpg",
    },
    user: {
      id: "34e98017-0380-4132-894e-e0fda3cae65f",
      email: "kate@gmail.com",
    },
  },
  {
    id: "5a45dd3d-0b9a-4c3c-99a8-56ecca052744",
    borrowDate: "2025-01-21T00:13:10.995Z",
    returnDate: "2025-01-21T01:58:26.107Z",
    status: "returned",
    book: {
      id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
      title: "Lucifer",
      author: "Cloe",
      coverImage: "Lucifer.jpg",
    },
    user: {
      id: "e4abdb1b-c337-4bcc-a269-e714d7d62840",
      email: "jade@gmail.com",
    },
  },
  {
    id: "5a45dd3d-0b9a-4c3c-99a8-56ecca052744",
    borrowDate: "2025-01-21T00:13:10.995Z",
    returnDate: "2025-01-21T01:58:26.107Z",
    status: "returned",
    book: {
      id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
      title: "Lucifer",
      author: "Cloe",
      coverImage: "Lucifer.jpg",
    },
    user: {
      id: "e4abdb1b-c337-4bcc-a269-e714d7d62840",
      email: "jade@gmail.com",
    },
  },
  {
    id: "5a45dd3d-0b9a-4c3c-99a8-56ecca052744",
    borrowDate: "2025-01-21T00:13:10.995Z",
    returnDate: "2025-01-21T01:58:26.107Z",
    status: "returned",
    book: {
      id: "2838e688-3379-44c3-8b98-f72e3e2d2ff0",
      title: "Lucifer",
      author: "Cloe",
      coverImage: "Lucifer.jpg",
    },
    user: {
      id: "e4abdb1b-c337-4bcc-a269-e714d7d62840",
      email: "jade@gmail.com",
    },
  },
];

const Borrowing: React.FC<BorrowingProps> = ({}) => {
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
                {data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={"https://i1.sndcdn.com/avatars-njtnly1CSaXFBoFn-SxMbXQ-t1080x1080.jpg"}
                        alt={item.book.title}
                        className="w-11 h-11 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.book.title}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "borrowed" ? "destructive" : "success"}>{item.status}</Badge>
                    </TableCell>
                    <TableCell>{formatUSDateTimeShort(item.borrowDate)}</TableCell>
                    <TableCell>{item.returnDate ? formatUSDateTimeShort(item.returnDate) : "Null"}</TableCell>
                    <TableCell>{item.user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default Borrowing;
