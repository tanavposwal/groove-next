import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="py-4 px-8 border-b shadow-sm flex justify-between md:px-16">
            <h2 className="text-2xl font-extrabold">groove</h2>
            <div>
                <Button>Logout</Button>
            </div>
        </nav>
    )
}