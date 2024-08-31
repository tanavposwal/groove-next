import { auth } from "@/auth";
import Adder from "@/components/AddSongs";
import Navbar from "@/components/Navbar";
import Queue from "@/components/Queue";

export default async function Dashboard() {
    const session = await auth()

    return (
        <main>
            <Navbar />
            <section className="flex gap-1 max-w-screen-xl mx-auto">
            <Queue />
            <Adder userID={session?.user?.id!} />
            </section>
        </main>
    )
}