"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addToWaitlist } from "@/actions/waitlist";

const LandingPage = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email) return;
    await addToWaitlist(email);
    setEmail("");
    setSubmitted(true);
  };

  return (
    <div className="py-16 px-16 text-center flex flex-col items-center justify-between min-h-[calc(100vh-64px)]">
      <div>
        <h1 className="mt-16 text-4xl font-bold mb-4">
          Seamless Client Engagement for Interior Design Professionals
        </h1>
        <p className="mb-16 text-xl">
          Manage Projects, Share Updates, and Transform Designs Instantly with AI
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:px-16 mb-32">
          {submitted ? (
            <p className="text-xl transition-all duration-300">
              Thank you for submitting! We will be in touch via email shortly.
            </p>
          ) : (
            <>
              <Input
                placeholder="johndoe@example.com"
                type="email"
                className="bg-muted"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleSubmit} variant="default">
                Get Early Access
              </Button>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-muted hover:bg-transparent border-2 hover:border-foreground">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

const features = [
  {
    title: "Anytime, Anywhere File Access",
    desc: "Effortlessly access project files and share them with stakeholders, anytime and anywhere.",
  },
  {
    title: "Real-time Collaboration",
    desc: "Work together seamlessly with your team and clients in real-time.",
  },
  {
    title: "AI-Powered Design Assistance",
    desc: "Leverage AI to enhance your designs and streamline your workflow.",
  },
];
