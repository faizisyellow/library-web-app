import EmptyState from "@/components/empty-state/EmptyState";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUSDateTimeShort } from "@/lib/format/time";
import { FolderX } from "lucide-react";
import React from "react";

interface RecentBorrowProps {
  data: any;
  total: number;
}

const RecentBorrow: React.FC<RecentBorrowProps> = ({ data, total }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Borrow Books</CardTitle>
        <CardDescription>{total > 0 ? `Total ${total} borrowed books.` : `No books have been borrowed yet.`}</CardDescription>
      </CardHeader>
      <CardContent>
        {data && data.length > 0 ? (
          <div className="space-y-8">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center"
              >
                <img
                  src={`http://localhost:5000/public/${item?.book?.coverImage}`}
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
        ) : (
          <EmptyState
            icon={FolderX}
            title="No Recent Borrowing Records"
            description="No books have been borrowed yet."
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBorrow;
