"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addToWaitlist } from "@/actions/waitlist";
import Image from "next/image";
import LandingImageGrid from "./_components/landing-image-grid";
import { ChevronRight } from "lucide-react";

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
    <>
      <div className="text-center flex flex-col items-center justify-between min-h-[calc(100vh-64px)] mt-32">
        <div className="max-w-3xl z-10">
          <p className="text-4xl md:text-6xl font-semibold bg-gradient-to-r from-neutral-100 to-neutral-500 text-transparent bg-clip-text">
            Elevate Your Vision with Cutting-Edge Design
          </p>
          <p className="hidden md:block text-xl font-medium text-slate-300">
            Streamline Project Management, Enhance Collaboration, and Deliver
            Stunning Designs in Real-Time with Our AI-Driven Platform
          </p>

          <Button
            className="mt-36 px-8 py-6 font-medium bg-custom hover:bg-custom hover:opacity-85 rounded-full"
            variant={"default"}
          >
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <LandingImageGrid />
      </div>
    </>
  );
};

export default LandingPage;
