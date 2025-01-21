import SignupForm from "@/components/sign-up-form/SignupForm";
import React from "react";

interface SignupProps {}

const Signup: React.FC<SignupProps> = ({}) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
