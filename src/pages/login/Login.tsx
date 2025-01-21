import LoginForm from "@/components/login-form/LoginForm";
import React from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
