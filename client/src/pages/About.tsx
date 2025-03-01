import { motion } from "framer-motion";
import AboutLogo from "@/components/ui/AboutLogo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    } 
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Mock team members data
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Founder & Lead Engineer",
    bio: "Electronics engineer with 10+ years of experience in embedded systems and IoT solutions.",
    image: "/team/alex.jpg",
    social: {
      twitter: "https://twitter.com/alexj",
      github: "https://github.com/alexj",
      linkedin: "https://linkedin.com/in/alexj"
    }
  },
  {
    id: 2,
    name: "Samantha Chen",
    role: "Content Director",
    bio: "Technical writer and educator specializing in making complex electronics concepts accessible to beginners.",
    image: "/team/samantha.jpg",
    social: {
      twitter: "https://twitter.com/samchen",
      github: "https://github.com/samchen",
      linkedin: "https://linkedin.com/in/samchen"
    }
  },
  {
    id: 3,
    name: "Marcus Rivera",
    role: "Hardware Developer",
    bio: "Passionate about circuit design and PCB layout with expertise in Arduino and Raspberry Pi platforms.",
    image: "/team/marcus.jpg",
    social: {
      twitter: "https://twitter.com/marcusr",
      github: "https://github.com/marcusr",
      linkedin: "https://linkedin.com/in/marcusr"
    }
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Software Engineer",
    bio: "Full-stack developer focused on creating intuitive interfaces for hardware control and data visualization.",
    image: "/team/priya.jpg",
    social: {
      twitter: "https://twitter.com/priyap",
      github: "https://github.com/priyap",
      linkedin: "https://linkedin.com/in/priyap"
    }
  }
];

export default function About() {
  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Hero Section with AboutLogo */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <AboutLogo width={220} height={70} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Empowering electronics enthusiasts with knowledge, tools, and community to bring their creative ideas to life.
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-lg">
            <p>
              Founded in 2018, Technocrats began as a small blog sharing electronics tutorials and project ideas. What started as a passion project quickly grew into a comprehensive resource for makers, hobbyists, and professionals alike.
            </p>
            <p>
              Our team of experienced engineers and educators is dedicated to breaking down complex technical concepts into approachable, hands-on learning experiences. We believe that understanding electronics is a superpower that should be accessible to everyone.
            </p>
            <p>
              Today, we offer hundreds of tutorials, in-depth guides, and curated products to help you on your electronics journey—whether you're building your first LED circuit or designing advanced IoT systems.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 bg-muted">
                    <div className="w-full h-full min-h-[160px] flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400 text-sm">[Photo: {member.name}]</span>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <CardHeader>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <p className="text-sm font-medium text-primary">{member.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex space-x-3">
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Github size={18} />
                        </a>
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Twitter size={18} />
                        </a>
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Linkedin size={18} />
                        </a>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
