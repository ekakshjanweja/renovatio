"use client";
import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
function AdminBar({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-800 h-[40px] relative top-3 rounded-t-lg flex justify-between items-center px-4">
      <span className="dark:text-gray-200 text-gray-800e text-sm">
        {language}
      </span>
      <button
        onClick={copyToClipboard}
        className="text-stone-900 dark:text-stone-100 text-sm  px-2 py-1 rounded-md active:bg-slate-600 h-6 flex items-center"
      >
        {copied ? (
          <div className="flex gap-2 items-center">
            <CheckIcon className="h-4 w-4" />
            Code Copied!
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <CopyIcon className="h-4 w-4" />
          </div>
        )}
      </button>
    </div>
  );
}

export default AdminBar;
