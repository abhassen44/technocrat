import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Project Showcase</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                {project.category}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
