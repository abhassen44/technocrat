import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Blog } from "@shared/schema";
import { useState } from "react";

export default function Blogs() {
  const [search, setSearch] = useState("");

  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      <Input
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm mb-8"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs?.map((blog) => (
          <Card key={blog.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {blog.content}
              </p>
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                {blog.category}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
