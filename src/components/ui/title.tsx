import React from "react";
import { Separator } from "./separator";

interface TitleProps {
  title: string;
  description: string;
}

const Title: React.FC<TitleProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p>{description}</p>
      <Separator className="my-4" />
    </div>
  );
};

export default Title;
