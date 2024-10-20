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

export const CategoryList = ["Tiles", "Cement", "Furniture", "Kitchenware"];

export const BillStatusObj: { [key: number]: string } = {
  0: "unpaid",
  1: "pending",
  2: "paid",
};

export const BillSchema = z.object({
  item: z
    .string()
    .min(1, {
      message: "Bill Item Name is required",
    })
    .max(500, { message: "Bill Item Name cant exceed 500 characters" }),
  // @ts-ignore
  category: z.enum(CategoryList),
  // {0: unpaid, 1: pending, 2: paid}
  status: z.coerce
    .number()
    .lt(3, {
      message: `Too big value for status, use these number: ${BillStatusObj}`,
    })
    .gte(0, {
      message: `Too small value for status, use these numbers: ${BillStatusObj}`,
    }),
  amount: z.coerce
    .number()
    .positive({ message: "Invalid number, only positive amount allowed" }),
  clientEmail: z.string().email(),
});

enum TodoCategories { 
  "Design", 
  "Plan", 
  "Presentation", 
  "Modeling", 
  "Site" };

enum TodoStatus {
  mightDo = 0, pending = 1, someProgress = 2, almostDone = 3, done = 4
}

export const TodoSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Todo title is required",
    })
    .max(500, { message: "Title cant exceed 500 characters" }),

  // @ts-ignore
  category: z.enum(Object.keys(TodoCategories)),

  dependsOn: z.number().nullable(),

  // @ts-ignore
  status: z.enum(Object.keys(TodoStatus)),

  description: z
    .string()
    .min(1, {
      message: "Todo Description is required",
    })
    .max(3000, { message: "Description cant exceed 3000 characters" }),
});


export const ReplicateFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "no prompt was entered",
  }),
  Image: z.string().url({ message: "Invalid Image URL" }),
  betterImages: z.boolean(),
});
