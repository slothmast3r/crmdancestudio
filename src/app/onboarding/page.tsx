import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function OnBoarding() {
  const session = await auth();
  if (!session?.user) redirect("/auth/sign-in");

  return (
    <div className="flex min-h-screen items-center justify-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Jesteś studentem czy założycielem szkoły?</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
