import React, { useEffect } from "react";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfileMutation, useGetProfileQuery } from "@/store/service/profile";
import ProfileDashboard from "./ProfileDashboard";
import ProfileUser from "./ProfileUser";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

interface ProfileProps {}

export type Form = UseFormReturn<{
  firstName: string;
  lastName: string;
  username: string;
  photo?: string | File | undefined;
}, any, undefined>;

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  photo: z.union([z.instanceof(File), z.string().optional()]).optional(),
  username: z.string().min(1, "Username is required"),
});

const Profile: React.FC<ProfileProps> = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: profileData } = useGetProfileQuery();
  const role = JSON.parse(localStorage.getItem("role") || "null");
  const { toast } = useToast();
  const navigate = useNavigate()

  const form: Form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      photo: undefined,
      username: ""
    },
  });

    useEffect(() => {
      if (profileData?.data) {
        form.reset({
            firstName: profileData?.data?.firstName,
            lastName:profileData?.data?.lastName,
            photo:profileData?.data?.photo ?? undefined,
            username:profileData?.data?.user?.username
        });
      }
    }, [profileData, form.reset]);
  

  const handleSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      // Create FormData if there's a file to upload
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      await updateProfile(formData).unwrap();
      toast({
        variant: "default",
        title: "Profile Updated Successfully",
      });
      navigate("/")
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <>
    {role === "ADMIN" ?(
    <ProfileDashboard
     form={form}
     isLoading={isLoading}
     onSubmit={handleSubmit}/>
     ):(
     <ProfileUser
      form={form}
      isLoading={isLoading}
      onSubmit={handleSubmit}/>
     )
     }

    </>
  );
};

export default Profile;