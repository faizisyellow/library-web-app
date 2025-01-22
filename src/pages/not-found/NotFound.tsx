import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-center">
      <div className="bg-black p-6 rounded-md">
        <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-300 mb-6">Sorry, the page you're looking for doesn't exist.</p>
        <Link to={"/"}>
          <Button>Go Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
