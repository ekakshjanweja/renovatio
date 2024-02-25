import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBlogs } from "@/lib/fetcher";

export const BlogRow = async () => {
  const blogs = await getBlogs();

  blogs.reverse();

  return (
    <>
      <div>
        <div className="font-semibold text-lg mt-8">Blogs</div>
        <div>
          {blogs.map(
            (blog, i) =>
              i < 4 && (
                <div
                  className="grid grid-cols-2 gap-2 items-center mt-4 md:mt-8"
                  key={blog.slug}
                >
                  <Link href={`/blogs/${blog.slug}`}>
                    <p className="text-sm flex items-center justify-start underline text-muted-foreground hover:text-foreground underline-offset-4">
                      {blog.meta.title}
                    </p>
                  </Link>
                  <p className="flex justify-end text-xs text-muted-foreground">
                    {blog.formattedDate}
                  </p>
                </div>
              )
          )}
        </div>
        <Link href="/blogs">
          <div className="mt-8 underline text-muted-foreground hover:text-foreground underline-offset-4 flex items-center ">
            <p>All posts </p>
            <ChevronRight className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </>
  );
};
