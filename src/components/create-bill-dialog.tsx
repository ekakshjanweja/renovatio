"use client"
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BillSchema, CategoryList, BillStatusObj } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBill } from "@/actions/bills-action";

interface CreateBillDialogProps {
  isDes: boolean;
  userId: string;
}
export const CreateBillDialog = (props: CreateBillDialogProps) => {

  if (!props.isDes) {
    return null;
  }

  const form = useForm<z.infer<typeof BillSchema>>({
    resolver: zodResolver(BillSchema),
    defaultValues: {
      item: "",
      category: "Cement",
      status: 0,
      amount: 0,
    },
  });

  const handleSubmission = (values: z.infer<typeof BillSchema>) => {
    // values contains values entered as object
    //
    console.log("values submitted are => ")
    console.log(JSON.stringify(values));

    createBill(values, props.userId).then((val) => {console.log("promise returned: ", val)});
  };


    return(<Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-9 flex justify-center cursor-pointer items-center text-neutral-700 hover:text-neutral-300 hover:bg-neutral-900 transition-colors">
          <PlusCircle />
          <div className="ml-4">Add Bill</div>
      </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Bill</DialogTitle>
          <DialogDescription>
            Select Item, Category, status, and Amount
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmission, (err) => console.log("error was: ", err))}>
          <div className="grid gap-4 py-4">

                <FormField
className="grid grid-cols-4 items-center gap-4"
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Item Name" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
className="grid grid-cols-4 items-center gap-4"
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                      </FormControl>
                          <SelectContent>
                            {CategoryList.map((cat) => {
                              return(
                              <SelectItem value={cat}>{cat}</SelectItem>
                            );
                          })}
                            {/*<SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem> */}
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
className="grid grid-cols-4 items-center gap-4"
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                  {/*
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="pending" type="number" />
                      </FormControl>
                      <FormDescription>This the current status of the bill</FormDescription>
                      <FormMessage />
                  */}
                      <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                      </FormControl>
                          <SelectContent>
                            {Object.entries(BillStatusObj).map((status) => {
                              return(
                              <SelectItem value={status[0]}>{status[1].charAt(0).toUpperCase() + status[1].slice(1)}</SelectItem>
                            );
                          })}
                            {/*<SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem> */}
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
className="grid grid-cols-4 items-center gap-4"
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormDescription>The amount to be paid by customer to Interior Designer</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  className="grid grid-cols-4 items-center gap-4"
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client E-mail Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Email" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              {/*
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="item" className="text-right">
              item
            </Label>
            <Input
              id="item"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              category
            </Label>
            <Input
              id="category"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              status
            </Label>
            <Input
              id="status"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              amount
            </Label>
            <Input
              id="amount"
              type="number"
              defaultValue="0"
              className="col-span-3"
            />
          </div>

              */}
          </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
