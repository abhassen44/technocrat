import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Tutorial } from "@shared/schema";
import { useState } from "react";

export default function Tutorials() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");

  const { data: tutorials, isLoading } = useQuery<Tutorial[]>({
    queryKey: ["/api/tutorials"],
  });

  const filteredTutorials = tutorials?.filter((tutorial) => {
    const matchesSearch = tutorial.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesLevel = level === "all" || tutorial.level === level;
    return matchesSearch && matchesLevel;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Tutorials</h1>

      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Search tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTutorials?.map((tutorial) => (
          <Card key={tutorial.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{tutorial.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{tutorial.description}</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {tutorial.level}
                </span>
                <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20">
                  {tutorial.category}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
