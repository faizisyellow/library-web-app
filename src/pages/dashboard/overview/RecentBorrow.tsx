import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUSDateTimeShort } from "@/lib/format/time";
import React from "react";

interface RecentBorrowProps {
  data: any;
}

const RecentBorrow: React.FC<RecentBorrowProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Borrow Books</CardTitle>
        <CardDescription>Total 265 borrowed books.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center"
            >
              <img
                src={"https://i1.sndcdn.com/avatars-njtnly1CSaXFBoFn-SxMbXQ-t1080x1080.jpg"}
                alt={item.book.title}
                className="w-11 h-11 rounded-md object-cover"
              />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{item.book.title}</p>
                <div className="ml-auto font-medium">{item.book.author}</div>
              </div>
              <div className="ml-auto font-medium">{formatUSDateTimeShort(item.borrowDate)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBorrow;
