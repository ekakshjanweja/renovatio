import type { MDXComponents } from "mdx/types";
import Code from "./components/mdx/code-component/code";
import YouTube from "./components/mdx/youtube";

function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}

export const MdxComponents = useMDXComponents({
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-semibold text-foreground py-6" {...props} />
  ),

  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-xl font-semibold text-foreground py-4" {...props} />
  ),

  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="leading-8" {...props} />
  ),

  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-sm font-semibold text-foreground my-4" {...props} />
  ),

  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a
      className="text-muted-foreground font-normal underline underline-offset-4 hover:text-foreground"
      {...props}
    />
  ),

  strong: (props: React.HTMLProps<HTMLSpanElement>) => (
    <strong className="font-semibold pr-2 mt-4" {...props} />
  ),

  img: (props: React.HTMLProps<HTMLImageElement>) => (
    <img className="mt-4" {...props} />
  ),

  pre: Code,

  Yt: YouTube,
});
