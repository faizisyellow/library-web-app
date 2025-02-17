import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useLoginMutation } from "@/store/service/auth";
import { LoginRequest } from "@/store/service/auth/type";
import { getErrorObject } from "@/lib/helpers/error-message";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {}

const formSchema = z.object({
  email: z.string().min(1, "Email is required")
  .email("Invalid email address")
  .refine((email) => email.includes("@"), "Email must contain @"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm: React.FC<LoginFormProps> = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values as LoginRequest);

      const error = getErrorObject(response.error);
      if (error) {
        toast({
          variant: "destructive",
          title: error.messages,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      localStorage.setItem("role", JSON.stringify(response.data.data.user.role));
      Cookies.set("token", response.data.data.token, { secure: true, sameSite: "None", expires: 60 * 24 * 60 * 60 * 1000 });

      navigate("/");
    } catch (error) {
      form.reset();
      console.log(error);
    }
  }

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">Login to your UW Lib account</p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="lizzymcalpine@example.com"
                          {...field}
                          className={cn(form.formState.errors.email && "border-red-500")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className={cn(
                              "pr-10",
                              form.formState.errors.password && "border-red-500"
                            )}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button
                  type="submit"
                  className="w-full"
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                  Login
                </Button>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://images.unsplash.com/photo-1575581535069-f9ef30a209b3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginForm;
