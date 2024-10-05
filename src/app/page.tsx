import { auth } from "@/auth";
import { redirect } from "next/navigation";

const MainPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/landing");
  }
};

export default MainPage;
