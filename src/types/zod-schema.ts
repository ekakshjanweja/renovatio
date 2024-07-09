import * as z from "zod";

export const LogInSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }),
});

export const SignUpSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phone: z
    .string()
    .min(10, { message: "Minimum 10 characters required" })
    .max(10, { message: "Maximum 10 characters required" }),
});

export const CreateProjectSchema = z.object({
  projectName: z.string().min(1, {
    message: "Project Name is required",
  }),
  clientEmail: z.string().email({
    message: "Client Email is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  area: z.string().min(1, {
    message: "Area is required",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const ReplicateFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "no prompt was entered"
  })
})
