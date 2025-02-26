import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Github, Linkedin, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "John Smith",
    role: "Lead Engineer",
    bio: "Electronics enthusiast with 10+ years of experience in IoT and embedded systems.",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "john@example.com"
    }
  },
  {
    name: "Sarah Johnson",
    role: "Content Lead",
    bio: "Technical writer and educator specializing in making complex topics accessible.",
    links: {
      linkedin: "https://linkedin.com",
      email: "sarah@example.com"
    }
  },
  {
    name: "Mike Chen",
    role: "Project Manager",
    bio: "Passionate about bringing innovative engineering projects to life.",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mike@example.com"
    }
  }
];

export default function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(missionRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(teamRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");
  }, []);

  return (
    <div className="container py-12">
      <h1 
        ref={headingRef}
        className="text-4xl font-bold tracking-tight text-center mb-12"
      >
        About LastMinuteEngineers
      </h1>

      <div 
        ref={missionRef}
        className="max-w-3xl mx-auto mb-16 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-muted-foreground">
          We're dedicated to making electronics engineering accessible to everyone. 
          Through comprehensive tutorials, practical projects, and a supportive community, 
          we help aspiring engineers turn their ideas into reality.
        </p>
      </div>

      <div ref={teamRef}>
        <h2 className="text-2xl font-semibold mb-8 text-center">Meet Our Team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="text-xl font-semibold mb-2">{member.name}</div>
                <div className="text-sm text-primary mb-3">{member.role}</div>
                <ScrollArea className="h-24 mb-4">
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </ScrollArea>
                <div className="flex gap-4">
                  {member.links.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.links.email && (
                    <a
                      href={`mailto:${member.links.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
