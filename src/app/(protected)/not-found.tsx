import { Button } from "@/components/ui/button";
import exp from "constants";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p>We cannot find the user you were looking for.</p>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
