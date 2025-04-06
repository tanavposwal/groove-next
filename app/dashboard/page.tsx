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
      <section className="flex max-w-4xl mx-auto flex-row h-screen">
        <div className="flex flex-col gap-3 h-full border-r px-3">
          <Adder userID={session?.user?.id!} />
        </div>
        <div className="border-l px-3">
          <Queue />
        </div>
        <div className="fixed bottom-0 right-0 z-50">
          <MiniWindows />
        </div>
      </section>
    </main>
  );
}
