import EmptyState from "@/components/empty-state/EmptyState";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatUSDateTimeShort } from "@/lib/format/time";
import { FolderX } from "lucide-react";
import React from "react";

interface RecentBorrowProps {
  data: any;
  total: number;
}

const RecentBorrow: React.FC<RecentBorrowProps> = ({ data, total }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Recent Borrow Books</CardTitle>
        <CardDescription>{total > 0 ? `Total ${total} borrowed books.` : `No books have been borrowed yet.`}</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]"> {/* Fixed height to enable scrolling */}
        {data && data.length > 0 ? (
          <ScrollArea className="h-full w-full pr-4"> {/* Added full height and right padding */}
            <div className="space-y-8 pr-2"> {/* Added right padding to prevent scrollbar overlap */}
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
                  <div className="ml-4 space-y-1 flex-grow">
                    <p className="text-sm font-medium leading-none">{item.book.title}</p>
                    <p className="text-sm text-muted-foreground">{item.book.author}</p>
                  </div>
                  <div className="ml-auto font-medium text-sm">
                    {formatUSDateTimeShort(item.borrowDate)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
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