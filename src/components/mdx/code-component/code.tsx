"use client";

import React from "react";
import AdminBar from "./admin";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import {
  atomOneLight,
  nightOwl,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";

const Code = (props: any) => {
  const codeContent =
    typeof props.children === "string"
      ? props.children
      : props.children.props.children;
  const className = props.children.props.className || "";
  const matches = className.match(/language-(?<lang>.*)/);
  const language = matches?.groups?.lang || "";

  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="my-6">
      <AdminBar code={codeContent} language={language} />
      <div className="">
        <SyntaxHighlighter
          className="rounded-md "
          style={isDark ? nightOwl : atomOneLight}
          language={language}
          wrapLongLines={true}
        >
          {codeContent}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Code;
