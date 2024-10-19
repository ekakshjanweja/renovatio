import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CreateBillDialog } from "@/components/create-bill-dialog";
import { getCurrentUser } from "@/actions/user-action";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getAllBills } from "@/actions/bills-action";

interface BillsTabProps {
  projectId: string;
}

export async function BillsTab({ projectId }: BillsTabProps) {
  // we got project id, now lets fetch bills
  //
  // const project = await getProjectById(projectId);
  const session = await auth();
  const user = await getCurrentUser();

  const invoices = await getAllBills(user.id, user.isDesigner ?? false);
  const total = invoices.reduce(
    (total, invoice) => total + Number(invoice.amount),
    0
  );

  if (!session) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      <Table>
        {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              {user.isDesigner ? "Client" : "Interior Designer"}
            </TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full grow">
          {invoices.map((invoice) => (
            <CreateBillDialog
              key={invoice.id}
              invoice={invoice}
              isDes={user.isDesigner ?? false}
              userId={user.id}
              className={"w-full grow"}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {/**/}
      <CreateBillDialog isDes={user.isDesigner ?? false} userId={user.id} />
    </div>
  );
}
