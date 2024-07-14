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
import { getCurrentUser } from "@/services/user-service";
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
  const total = invoices.reduce((total, invoice) => total + Number(invoice.amount), 0);

  if (!session) {
    notFound();
  }
  return (
    <div>
    <Table className="w-full">
      {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="w-7/12">Item</TableHead>
          <TableHead className="w-2/12">Status</TableHead>
          <TableHead className="w-2/12">{user.isDesigner ? 'Client' : 'Interior Designer'}</TableHead>
          <TableHead className="text-right w-1/12">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {invoices.map((invoice) => (
          <CreateBillDialog key={invoice.id} invoice={invoice} isDes={user.isDesigner ?? false} userId={user.id} />
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
