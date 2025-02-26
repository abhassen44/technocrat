import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Tutorial, Blog } from "@shared/schema";
import { Link } from "wouter";

export function FeaturedContent() {
  const { data: tutorials, isLoading: tutorialsLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
  });

  const { data: blogs, isLoading: blogsLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  if (tutorialsLoading || blogsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Content</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials?.slice(0, 3).map((tutorial) => (
            <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`}>
              <Card className="cursor-pointer transition-transform hover:scale-105">
                <CardHeader>
                  <CardTitle>{tutorial.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tutorial.description}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {tutorial.level}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <h2 className="text-3xl font-bold tracking-tight mb-8 mt-16">Latest Blog Posts</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs?.slice(0, 3).map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <Card className="cursor-pointer transition-transform hover:scale-105">
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{blog.content}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {blog.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
