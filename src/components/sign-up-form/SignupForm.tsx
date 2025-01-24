import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useSignupMutation } from "@/store/service/auth";
import { SignupRequest } from "@/store/service/auth/type";
import { getErrorObject } from "@/lib/helpers/error-message";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import Cookies from "js-cookie";

interface SignupFormProps {}

const formSchema = z.object({
  username: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const SignupForm: React.FC<SignupFormProps> = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [handleSignUp] = useSignupMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await handleSignUp(values as SignupRequest);

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

      navigate("/login");
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
        <CardContent>
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create Your Account</h1>
                <p className="text-balance text-muted-foreground">Sign up to your UW Lib account</p>
              </div>
              <div className="grid grid-cols-2 gap-4 my-8">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
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
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4 mt-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
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
                        <Input
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full my-8"
              >
                Sign up
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default SignupForm;
