import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

interface GetQuoteProps {
  trigger: React.ReactNode;
}

export const GetQuote = ({ trigger }: GetQuoteProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Get Quote</DialogTitle>
            <DialogDescription>
              We just need some basic information to make a offer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="mt-2" />
            </div>
            <div className="">
              <Label htmlFor="username" className="text-right">
                Phone
              </Label>
              <Input id="phone" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
