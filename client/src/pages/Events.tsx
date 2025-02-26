import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Event } from "@shared/schema";
import { format } from "date-fns";

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <Card key={event.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {format(new Date(event.date), "MMMM d, yyyy")}
                </span>
                <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/20">
                  {event.type}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
