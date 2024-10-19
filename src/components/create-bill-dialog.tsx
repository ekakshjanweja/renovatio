"use client"
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { BillSchema, CategoryList, BillStatusObj } from "@/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBill, updateBill } from "@/actions/bills-action";
import React from 'react';
import { z } from "zod";

interface CreateBillDialogProps {
  isDes: boolean;
  userId: string;
  invoice?: z.infer<typeof BillSchema> & {userName: string; userEmail: string; id: string;};
  className? : string;
}

export const CreateBillDialog = (props: CreateBillDialogProps) => {

  console.log("props received: ");
  console.log(props);

  const form = useForm<z.infer<typeof BillSchema>>({
    resolver: zodResolver(BillSchema),
    defaultValues: {
      item: props.invoice?.item ?? "",
      category: props.invoice?.category ?? "Cement",
      status: props.invoice?.status ?? 0,
      amount: props.invoice?.amount ?? 0,
      clientEmail: props.invoice?.userEmail ?? "",
    },
  });

  const { toast } = useToast();
  const [ openDialog, setOpenDialog ] = React.useState(false);

  const handleSubmission = (values: z.infer<typeof BillSchema>) => {
    // values contains values entered as object
    //
    console.log("values submitted are => ")
    console.log(JSON.stringify(values));

    if(props.invoice) {

      // for the update to have string instead
      const newValues = {...values, amount: values['amount'].toString()};
      updateBill(props.invoice, newValues).then((val: any) => {
        setOpenDialog(false);
      });
      
    } else {

      createBill(values, props.userId).then((val: any) => {
        setOpenDialog(false);
        toast({
              title: `Created the Bill: ${Object.keys(val)[0]}`,
              description: "Refresh the page if the bill isnt visible immediately",
            })
      });
      console.log("donez")
    }

  };


    return(<Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className={"w-full " + props.className} asChild>
      
      {props.invoice ? 
        <TableRow key={props.invoice.id} className="w-full grow flex justify-between">
          <TableCell className="font-medium">{props.invoice.item}</TableCell>
          <TableCell className="">{props.invoice.status}</TableCell>
          <TableCell className="">{props.invoice.userName}</TableCell>
          <TableCell className="text-right">{props.invoice.amount}</TableCell>
        </TableRow>
        : <div className="h-9 flex justify-center cursor-pointer items-center text-neutral-700 hover:text-neutral-300 hover:bg-neutral-900 transition-colors">
          <PlusCircle />
          <div className="ml-4">Add Bill</div>
        </div>
      }
        
      </DialogTrigger>
    {
     props.isDes ? 

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.invoice ? 'Update' : 'Add'} Bill</DialogTitle>
          <DialogDescription>
            Select Item, Category, status, and Amount
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmission, (err) => console.log("error was: ", err))}>
          <div className="grid gap-4 py-4">

                <FormField
                  // @ts-ignore
                  className="grid grid-cols-4 items-center gap-4"
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Item Name" type="text"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  // @ts-ignore
                  className="grid grid-cols-4 items-center gap-4"
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange}>
                      <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                      </FormControl>
                          <SelectContent>
                            {CategoryList.map((cat) => {
                              return(
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
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
                  // @ts-ignore
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
                        <Select onValueChange={field.onChange} defaultValue={props.invoice?.status?.toString() ?? field.value.toString()}>
                      <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder='Status'/>
                          </SelectTrigger>
                      </FormControl>
                          <SelectContent>
                            {Object.entries(BillStatusObj).map((status) => {
                              return(
                              <SelectItem key={status[0]} value={status[0]}>{status[1].charAt(0).toUpperCase() + status[1].slice(1)}</SelectItem>
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
                  // @ts-ignore
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
                  // @ts-ignore
                  className="grid grid-cols-4 items-center gap-4"
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client E-mail Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Email" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              
          </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      :
        null
    }

    </Dialog>
    )
    }
