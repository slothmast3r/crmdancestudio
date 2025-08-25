import Image from "next/image";
import { auth } from "@/auth";
import SignOut from "../components/sign-out";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Link href="/auth/sign-in">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
}
