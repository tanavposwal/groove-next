import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Users, Headphones } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen">
      <header className="px-8 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-extrabold">groove</div>
        {session?.user ? (
          <div className="flex gap-3 items-center">
            <img className="rounded-full h-9" src={session.user.image!} />
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <Button type="submit">Sign in</Button>
          </form>
        )}
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 py-20">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to Groove Nest
          </h1>
          <p className="text-xl text-white mb-8">
            The social media platform for music lovers to stream and vibe
            together.
          </p>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <Button size="lg" className="bg-white">
              Get Started
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Music className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Discover Music
              </h2>
              <p className="text-white opacity-50">
                Explore new tracks and artists with friends.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Connect
              </h2>
              <p className="text-white opacity-50">
                Join listening rooms and meet new people.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Headphones className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Listen Together
              </h2>
              <p className="text-white opacity-50">
                Sync your music and groove with friends.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </main>
  );
}
