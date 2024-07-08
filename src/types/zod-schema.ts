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

export const CreateRoomSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

export const WaitListSchema = z.object({
  email: z.string().email(),
});

export const BillSchema = z.object({
  item: z
    .string()
    .min(1, {
      message: "Bill Item Name is required",
    })
    .max(500, { message: "Bill Item Name cant exceed 500 characters" }),
  category: z.enum(["Tiles", "Cement", "Furniture", "Kitchenware"]),
  // {0: unpaid, 1: pending, 2: paid}
  status: z
    .number()
    .lt(3, {
      message:
        "Too big value for status, use these number: {0: unpaid, 1: pending, 2: paid}",
    })
    .gte(0, {
      message:
        "Too small value for status, use these numbers: {0: unpaid, 1: pending, 2: paid}",
    }),
  amount: z
    .number()
    .positive({ message: "Non Negative amount is not allowed" }),
  clientEmail: z.string().email(),
});
