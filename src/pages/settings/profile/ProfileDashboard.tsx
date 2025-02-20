import Title from "@/components/ui/title";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Form as FormType, profileSchema } from "./Profile";
import { z } from "zod";
import Layout from "@/pages/dashboard/Layout";


interface ProfileDashboardProps {
  form : FormType
  isLoading : boolean
  onSubmit: (values: z.infer<typeof profileSchema>) => Promise<void>
}

 const ProfileDashboard: React.FC<ProfileDashboardProps> = ({form, isLoading,onSubmit})=>{
    return (
        <>
        <Layout>
          <div className="p-8">
            <Title
              title="Settings"
              description="Update your profile"
            />
            <Card>
              <CardContent className="py-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-6">
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
                                className={cn(form.formState.errors.firstName && "border-red-500")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="photo"
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Photo</FormLabel>
                            <FormControl>
                              <div>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      onChange(file);
                                    }
                                  }}
                                  {...field}
                                  className={cn(form.formState.errors.photo && "border-red-500")}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-6">
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
                                className={cn(form.formState.errors.lastName && "border-red-500")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                                className={cn(form.formState.errors.username && "border-red-500")}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end mt-8">
                      <Button
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          </Layout>
        </>
      );
}

export default ProfileDashboard