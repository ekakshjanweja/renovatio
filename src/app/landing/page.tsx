"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addToWaitlist } from "@/actions/waitlist";

const LandingPage = () => {
  const [email, setEmail] = useState<string | null>();

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email) {
      return;
    }
    await addToWaitlist(email);
    setEmail(null);
    setSubmitted(true);
  };

  return (
    <>
      <div className="py-16 px-16 text-center flex flex-col items-center justify-between h-[calc(100vh-50px)]">
        <div>
          <p className="mt-16 text-3xl font-semibold mb-4">
            Seamless Client Engagement for Interior Design Professionals
          </p>
          <p className="mb-16">
            Manage Projects, Share Updates, and Transform Designs Instantly with
            AI
          </p>
          <div className="flex space-x-4 md:px-16 mb-32">
            {submitted ? (
              <>
                <div className="flex items-start justify-start text-center">
                  <p className="text-xl transition-all duration-300">
                    Thank you for submitting! We&#39ll be in touch via email
                    shortly.
                  </p>
                </div>
              </>
            ) : (
              <>
                <Input
                  placeholder="johndoes@example.com"
                  type="email"
                  className="bg-muted"
                  value={email ?? ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleSubmit} variant={"default"}>
                  Get Early Access
                </Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-16 px-4">
            {features.map((feature) => (
              <>
                <Card className="bg-muted hover:bg-transparent border-2 hover:border-foreground w-[250px] h-[250px]">
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.desc}</p>
                  </CardContent>
                </Card>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

interface Feature {
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    title: "Anytime, Anywhere File Access",
    desc: "Effortlessly access project files and share them with stakeholders, anytime and anywhere.",
  },
  {
    title: "Generate Amazing Designs Instantly",
    desc: "Leverage AI to produce and refine high-quality renders in no time.",
  },
  {
    title: "Time and Cost Efficiency	",
    desc: "Reduce expenses and streamline project timelines.",
  },
];
