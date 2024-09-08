import { ModeToggle } from "@/components/mode-toggle";
import { ProfileSection } from "@/components/navbar/profile-section";
import { getCurrentUser } from "@/actions/user-action";
import LoginButton from "./login-button";

export const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <nav className="p-2 rounded-md md:flex justify-between items-center hidden md:visible">
        <h1 className="text-lg font-semibold mr-4 text-custom">renovatio</h1>
        <div className="flex items-center gap-x-4">
          <p>home</p>
          {user && <p>dashboard</p>}
          <p>pricing</p>
          <p>about us</p>
          {user && <ProfileSection image={user.image} username={user.name} />}
          {!user && <LoginButton />}
          {/* <ModeToggle /> */}
        </div>
      </nav>
      <nav className="flex justify-between items-center visible md:hidden my-4">
        <h1 className="text-lg font-semibold mr-4 text-custom">renovatio</h1>
        {user && <ProfileSection image={user.image} username={user.name} />}
        {!user && <LoginButton />}
      </nav>
    </div>
  );
};
