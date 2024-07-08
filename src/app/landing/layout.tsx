"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { LandingNavbar } from "./_components/navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.1, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0,
            duration: 1,
            ease: "easeInOut",
          }}
          className="flex flex-col text-foreground"
        >
          <LandingNavbar />
          {children}
        </motion.div>
      </AuroraBackground>
    </>
  );
};

export default LandingLayout;
