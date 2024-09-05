import { ModeToggle } from "@/components/mode-toggle";
import { ProfileSection } from "@/components/navbar/profile-section";
import { getCurrentUser } from "@/actions/user-action";
import LoginButton from "./navbar/login-button";

export const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className="p-2 rounded-md flex justify-between items-center">
      <h1 className="text-lg font-semibold mr-4 text-custom">renovatio</h1>
      <div className="flex items-center gap-x-4">
        <p>home</p>
        {user && <p>dashboard</p>}
        <p>pricing</p>
        <p>about us</p>
        {user && <ProfileSection image={user.image} username={user.name} />}
        {!user && <LoginButton />}
        <ModeToggle />
      </div>
    </nav>
  );
};
