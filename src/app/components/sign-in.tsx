import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("resend", formData);
      }}
    >
      <Input type="text" name="email" placeholder="Email" />
      <Button type="submit">Signin with Resend</Button>
    </form>
  );
}
