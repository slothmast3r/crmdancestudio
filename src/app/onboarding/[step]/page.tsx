import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ONBOARDING_STEPS, rolesByCategory } from "@/lib/roles";
import OnboardindForm from "./onboardingform";

export default async function OnBoarding({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  console.log("step", step);
  const session = await auth();
  if (!session?.user) redirect("/auth/sign-in");

  return (
    <div className="flex min-h-screen items-center justify-center py-8">
      <Card className="w-full max-w-2xl">
        {step === ONBOARDING_STEPS[1] && <StepDetails />}
      </Card>
    </div>
  );
}

function StepDetails() {
  return (
    <>
      <CardHeader>
        <CardTitle>Wypełnij szczegóły swojego profilu</CardTitle>
      </CardHeader>
      <OnboardindForm></OnboardindForm>
    </>
  );
}
