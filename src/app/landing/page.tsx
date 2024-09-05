"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addToWaitlist } from "@/actions/waitlist";
import Image from "next/image";
import LandingImageGrid from "./_components/landing-image-grid";

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
      <LandingImageGrid />
    </div>
  );
};

export default LandingPage;
