import { auth, signIn, signOut } from "@/auth";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="py-4 px-8 border-b shadow-sm flex justify-between md:px-16 sticky top-0 bg-background z-50">
      <h2 className="text-2xl font-extrabold">groove</h2>
      {session?.user ? (
        <div className="flex gap-2 items-center">
          <UserAvatar src={session.user.image!} />
          <form
            className="sm:flex hidden"
            action={async () => {
              "use server";
              await signOut();
            }}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <form
            action={async () => {
              "use server";
              await signIn();
            }}>
            <Button type="submit">Sign in</Button>
          </form>
        </div>
      )}
    </nav>
  );
}
