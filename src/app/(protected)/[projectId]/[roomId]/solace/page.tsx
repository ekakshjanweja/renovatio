import { auth } from "@/auth";
import { getCurrentUser } from "@/services/user-service";
import { notFound } from "next/navigation";
import { Main } from "./_components/main";

export default async function Home() {
  const session = await auth();
  const USER_ID = [
    process.env.TARZI_USER_ID,
    process.env.STORMEJ_USER_ID,
    process.env.CYTO_USER_ID,
  ];

  if (!session) {
    notFound();
  }

  const user = await getCurrentUser();

  if (!USER_ID.find((id) => id === user.id)) {
    notFound();
  }

  return (
    <>
      <Main />
    </>
  );
}
