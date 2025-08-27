import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setRole } from "../actions/onboardingActions";
import { rolesByCategory } from "@/lib/roles";

export default async function OnBoarding() {
  const session = await auth();
  if (!session?.user) redirect("/auth/sign-in");

  return (
    <div className="flex min-h-screen items-center justify-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>
            Wybierz czy jesteś klientem szkoły czy instruktorem
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6">
          {rolesByCategory.map((group, i) => (
            <div key={group.id} className="flex-1">
              <div className="mb-3 font-medium">{group.title}</div>
              <div className="flex flex-col gap-2">
                {group.roles.map((r) => (
                  <form key={r.key} action={setRole}>
                    <input type="hidden" name="role" value={r.key} />
                    <Button type="submit" className="w-full">
                      {r.label}
                    </Button>
                  </form>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function StepRole() {
  return (
    <CardContent className="flex gap-6">
      {rolesByCategory.map((group, i) => (
        <div key={group.id} className="flex-1">
          <div className="mb-3 font-medium">{group.title}</div>
          <div className="flex flex-col gap-2">
            {group.roles.map((r) => (
              <form key={r.key} action={setRole}>
                <input type="hidden" name="role" value={r.key} />
                <Button type="submit" className="w-full">
                  {r.label}
                </Button>
              </form>
            ))}
          </div>
        </div>
      ))}
    </CardContent>
  );
}
