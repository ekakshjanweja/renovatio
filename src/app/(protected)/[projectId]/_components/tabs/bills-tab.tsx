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

  const invoices = await getAllBills(user.id, user.isDesigner);
  const total = invoices.reduce((total, invoice) => total + Number(invoice.amount), 0);

  if (!session) {
    notFound();
  }
  return (
    <div>
    <Table>
      {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>{user.isDesigner ? 'Client' : 'Interior Designer'}</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.item}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.userName}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
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
      <CreateBillDialog isDes={user.isDesigner} userId={user.id} />
      </div>
  );
}
