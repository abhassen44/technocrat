import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Mail, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [email, setEmail] = useState("");

  // Animation variants
  const containerVariants = {
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
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <footer className="border-t relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background gradient element */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 opacity-50"></div>
      
      <div className="container relative py-16 px-4 md:px-6 mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-12"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div 
            className="md:col-span-4"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"></div>
              <h2 className="text-xl font-bold">Technocrats</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Empowering technology enthusiasts with cutting-edge resources and knowledge to build the future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-violet-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tutorials">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Tutorials
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blogs">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Blogs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Events
                  </a>
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/projects">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Projects
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
            
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div 
            className="md:col-span-4"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Join our community</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Stay updated with the latest technology trends and tutorials.
            </p>
            
            <div className="relative">
              <div className="flex items-center relative">
                <Mail className="absolute left-3 text-gray-400" size={16} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-16 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                />
                <motion.button
                  onMouseEnter={() => setEmailHovered(true)}
                  onMouseLeave={() => setEmailHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-2"
                >
                  <motion.div
                    animate={{ x: emailHovered ? 2 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </motion.button>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
          variants={itemVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © 2025 Technocrats. All rights reserved.
            </p>
            
          </div>
        </motion.div>
      </div>
    </footer>
  );
}