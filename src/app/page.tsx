import Image from "next/image";
import { SignIn } from "./components/sign-in";
import { auth } from "@/auth";
import SignOut from "./components/sign-out";

export default async function Home() {
  const session = await auth();
  
  return (
    <div>
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
