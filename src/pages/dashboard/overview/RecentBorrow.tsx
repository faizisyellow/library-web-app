import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://api.slingacademy.com/public/sample-users/1.png"
                  alt="Avatar"
                />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{item.book.title}</p>
              </div>
              <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBorrow;
