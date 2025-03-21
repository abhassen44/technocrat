import React from 'react';
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import AboutLogo from "@/components/ui/AboutLogo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Twitter, MousePointer, Radio, Cpu, Code } from "lucide-react";

// Define interfaces for type safety
interface SocialLinks {
  twitter: string;
  github: string;
  linkedin: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  icon: JSX.Element;
  color: string;
  social: SocialLinks;
}

export default function About() {
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);
  const [hoverMember, setHoverMember] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Team members data with proper typing
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Abhas sen",
      role: "lead developer and designer",
      bio: "passionate about creating user-friendly and efficient web applications.",
      image: "/assets/images/abhas.png",
      expertise: ["web development", "ui/ux design", "react"],
      icon: <Cpu className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-500",
      social: {
        twitter: "https://twitter.com/alexj",
        github: "https://github.com/alexj",
        linkedin: "https://linkedin.com/in/alexj"
      }
    },
    {
      id: 2,
      name: "girish",
      role: "Content Director",
      bio: "Technical writer and educator specializing in making complex electronics concepts accessible to beginners.",
      image: "/api/placeholder/400/400",
      expertise: ["Technical Writing", "Education", "Content Strategy"],
      icon: <Radio className="w-8 h-8" />,
      color: "from-indigo-600 to-violet-500",
      social: {
        twitter: "https://twitter.com/samchen",
        github: "https://github.com/samchen",
        linkedin: "https://linkedin.com/in/samchen"
      }
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-cyan-800/10 to-background/0"></div>
          <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-5"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <AboutLogo width={260} height={80} />
            
            <motion.div 
              className="absolute top-1/2 left-1/4 w-16 h-px bg-cyan-500"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
            <motion.div 
              className="absolute top-1/3 right-1/4 w-px h-16 bg-blue-500"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 64, opacity: 0.6 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600"
          >
            Our Mission
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Empowering electronics enthusiasts with knowledge, tools, and community to bring their creative ideas to life.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12"
          >
            <a href="#story" className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition-colors">
              <span>Discover our story</span>
              <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.div>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Company Story */}
      <div id="story" className="container mx-auto py-24 px-4">
        <div className="max-w-3xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-8 inline-block relative"
          >
            Our Story
            <motion.div 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.h2>
          
          <div className="space-y-6 text-lg relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 via-cyan-500 to-indigo-400"></div>
            
            {[
              "Founded in 2018, Technocrats began as a small blog sharing electronics tutorials and project ideas. What started as a passion project quickly grew into a comprehensive resource for makers, hobbyists, and professionals alike.",
              "Our team of experienced engineers and educators is dedicated to breaking down complex technical concepts into approachable, hands-on learning experiences. We believe that understanding electronics is a superpower that should be accessible to everyone.",
              "Today, we offer hundreds of tutorials, in-depth guides, and curated products to help you on your electronics journey—whether you're building your first LED circuit or designing advanced IoT systems."
            ].map((text, index) => (
              <motion.div 
                key={index}
                className="relative pl-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className={`absolute left-0 top-2 w-2 h-2 rounded-full ${["bg-blue-600", "bg-cyan-500", "bg-indigo-500"][index]} -translate-x-1`}></div>
                <p className="text-xl">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 inline-block relative"
        >
          Meet Our Team
          <motion.div 
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setActiveTeamMember(member.id === activeTeamMember ? null : member.id)}
              onMouseEnter={() => setHoverMember(member.id)}
              onMouseLeave={() => setHoverMember(null)}
              className="cursor-pointer group"
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full overflow-hidden border bg-background shadow-lg hover:shadow-xl transition-all duration-300 relative">
                {/* Photo Section */}
                <div className="w-full h-64 relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70`}></div>
                  
                  {/* Info overlay that appears on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoverMember === member.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2 transform translate-y-0 transition-transform duration-300">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {member.expertise.map((skill, i) => (
                          <span 
                            key={i} 
                            className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${member.color} text-white font-medium`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-white/80 text-sm line-clamp-2">{member.bio}</p>
                      
                      <div className="pt-2 flex space-x-3">
                        <a 
                          href={member.social.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white/70 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={18} />
                        </a>
                        <a 
                          href={member.social.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white/70 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Twitter size={18} />
                        </a>
                        <a 
                          href={member.social.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-white/70 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin size={18} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Name and Role Section */}
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-gradient-to-br ${member.color}`}>
                      {React.cloneElement(member.icon, { className: "w-5 h-5 text-white" })}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${member.color}`}>
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${member.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Member Modal */}
        <AnimatePresence>
          {activeTeamMember && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-blue-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setActiveTeamMember(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background rounded-lg max-w-3xl w-full overflow-hidden shadow-blue-500/20 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                {teamMembers.filter(m => m.id === activeTeamMember).map(member => (
                  <div key={member.id} className="relative">
                    <div className="flex flex-col md:flex-row">
                      {/* Photo section in modal */}
                      <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent`}></div>
                      </div>
                      
                      {/* Content section in modal */}
                      <div className="w-full md:w-3/5 p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-3 rounded-full bg-gradient-to-br ${member.color} shadow-lg`}>
                            {React.cloneElement(member.icon, { className: "w-6 h-6 text-white" })} 
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{member.name}</h3>
                            <p className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${member.color}`}>
                              {member.role}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-lg mb-6">{member.bio}</p>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium text-cyan-500">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {member.expertise.map((skill, i) => (
                              <span 
                                key={i} 
                                className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${member.color} bg-opacity-10 text-cyan-100`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <h4 className="font-medium mt-6 text-cyan-500">Connect</h4>
                          <div className="flex space-x-4">
                            <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-blue-400">
                              <Github size={18} />
                              <span>GitHub</span>
                            </a>
                            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-blue-400">
                              <Twitter size={18} />
                              <span>Twitter</span>
                            </a>
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-blue-400">
                              <Linkedin size={18} />
                              <span>LinkedIn</span>
                            </a>
                          </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                          <button 
                            onClick={() => setActiveTeamMember(null)}
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}