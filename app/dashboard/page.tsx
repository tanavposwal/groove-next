import { auth } from "@/auth";
import Adder from "@/components/AddSongs";
import MiniWindows from "@/components/MiniWindow";
import Navbar from "@/components/Navbar";
import Queue from "@/components/Queue";

export default async function Dashboard() {
  const session = await auth();

  return (
    <main>
      <Navbar />
      <section className="flex gap-3 max-w-screen-xl mx-auto flex-col md:flex-row p-4">
        <Queue />
        <div className="flex flex-col gap-3">
          <Adder userID={session?.user?.id!} />
          <MiniWindows />
        </div>
      </section>
    </main>
  );
}
