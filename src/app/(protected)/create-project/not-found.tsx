import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p>You do not have permissions to access this page.</p>
        <div className="flex items-center gap-x-4">
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Register As Designer</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
