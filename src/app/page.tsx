import Image from "next/image";
import { SignIn } from "./components/sign-in-form";
import { auth } from "@/auth";
import SignOut from "./components/sign-out";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <SignIn />
      {session?.user ? (
        <div>Signed in as {session.user.id}</div>
      ) : (
        <div>Not signed in</div>
      )}
      <SignOut></SignOut>
    </div>
  );
}
