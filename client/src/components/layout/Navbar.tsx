import { Link } from "wouter";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";
import EventsLogo from "../ui/EventsLogo";
import TutorialsLogo from "../ui/TutorialsLogo";
import BlogsLogo from "../ui/BlogsLogo";
import ProjectsLogo from "../ui/ProjectsLogo";
import MerchLogo from "../ui/MerchLogo";
import AboutLogo from "../ui/AboutLogo";

const menuItems = [
  {
    title: "Learn",
    type: "dropdown",
    items: [
      {
        title: "Tutorials",
        description: "Step-by-step guides for electronics projects",
        href: "/tutorials",
        featured: true,
        hasLogo: true
      },
      {
        title: "Blogs",
        description: "Latest insights and tech articles",
        href: "/blogs",
        hasLogo: true
      },
    ],
  },
  { 
    title: "Events", 
    href: "/events",
    hasLogo: true 
  },
  { 
    title: "Projects", 
    href: "/projects",
    hasLogo: true 
  },
  { 
    title: "Merch", 
    href: "/merch",
    hasLogo: true 
  },
  { 
    title: "About", 
    href: "/about",
    hasLogo: true 
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bold text-2xl flex items-center gap-2"
        >
          <Link href="/">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-40 h-14 bg-primary rounded-3xl flex items-center justify-center overflow-hidden">
                <img 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  src="/assets/images/techno.jpg"
                  alt="Technocrats Logo" 
                  className="text-primary-foreground" 
                />
              </div>
              {/* <span className="hidden sm:inline text-2xl font-bold text-foreground dark:text-white">Technocrats</span> */}
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex">
              {menuItems.map((item) => {
                if (item.type === "dropdown") {
                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger
                        className={cn(
                          "text-lg font-medium",
                          isScrolled ? "text-foreground" : "text-black",
                          "dark:text-white hover:text-accent-foreground dark:hover:text-accent-foreground"
                        )}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 w-[400px]">
                          {item.items?.map((subItem) => (
                            <li key={subItem.title} className={cn(subItem.featured && "row-span-2")}>
                              <Link href={subItem.href || ""}>
                                <NavigationMenuLink asChild>
                                  <motion.a
                                    className={cn(
                                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                      "text-foreground dark:text-white",
                                      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    {subItem.hasLogo ? (
                                      subItem.title === "Tutorials" ? (
                                        <TutorialsLogo width={120} height={30} className="text-foreground dark:text-white" />
                                      ) : subItem.title === "Blogs" ? (
                                        <BlogsLogo width={100} height={30} className="text-foreground dark:text-white" />
                                      ) : (
                                        <div className="text-sm font-medium leading-none text-foreground dark:text-white">{subItem.title}</div>
                                      )
                                    ) : (
                                      <div className="text-sm font-medium leading-none text-foreground dark:text-white">{subItem.title}</div>
                                    )}
                                    {subItem.description && (
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground dark:text-muted-foreground mt-1">
                                        {subItem.description}
                                      </p>
                                    )}
                                  </motion.a>
                                </NavigationMenuLink>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={item.title}>
                      <Link href={item.href || ""}>
                        <NavigationMenuLink asChild>
                          <motion.a
                            className={cn(
                              "block select-none rounded-md px-4 py-2 leading-none no-underline outline-none transition-colors text-lg font-medium",
                              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isScrolled ? "text-foreground" : "text-black",
                              "dark:text-white"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {item.hasLogo ? (
                              item.title === "Events" ? (
                                <EventsLogo width={100} height={30} className="text-foreground dark:text-white" />
                              ) : item.title === "Projects" ? (
                                <ProjectsLogo width={100} height={30} className="text-foreground dark:text-white" />
                              ) : item.title === "Merch" ? (
                                <MerchLogo width={100} height={30} className="text-foreground dark:text-white" />
                              ) : item.title === "About" ? (
                                <AboutLogo width={100} height={30} className="text-foreground dark:text-white" />
                              ) : (
                                item.title
                              )
                            ) : (
                              item.title
                            )}
                          </motion.a>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden"
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <div className="border-t px-4 py-4 space-y-4">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.type === "dropdown" ? (
                <div className="space-y-2">
                  <div className="font-medium text-sm text-foreground dark:text-white">{item.title}</div>
                  {item.items?.map((subItem) => (
                    <Link key={subItem.title} href={subItem.href || ""}>
                      <motion.a
                        className={cn(
                          "block px-2 py-1.5 text-sm rounded-md hover:bg-accent",
                          "text-foreground dark:text-white hover:text-accent-foreground dark:hover:text-accent-foreground"
                        )}
                        whileTap={{ scale: 0.98 }}
                      >
                        {subItem.hasLogo ? (
                          subItem.title === "Tutorials" ? (
                            <TutorialsLogo width={100} height={30} className="text-background dark:text-white " />
                          ) : subItem.title === "Blogs" ? (
                            <BlogsLogo width={80} height={30} className="text-background dark:text-white " />
                          ) : (
                            <span className="text-background dark:text-white ">{subItem.title}</span>
                          )
                        ) : (
                          subItem.title
                        )}
                      </motion.a>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link href={item.href || ""}>
                  <motion.a
                    className="block px-2 py-1.5 text-base font-medium rounded-md hover:bg-accent text-foreground dark:text-white hover:text-accent-foreground dark:hover:text-accent-foreground"
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.hasLogo ? (
                      item.title === "Events" ? (
                        <EventsLogo width={100} height={35} className="text-foreground dark:text-white" />
                      ) : item.title === "Projects" ? (
                        <ProjectsLogo width={115} height={35} className="text-foreground dark:text-white" />
                      ) : item.title === "Merch" ? (
                        <MerchLogo width={100} height={35} className="text-foreground dark:text-white" />
                      ) : item.title === "About" ? (
                        <AboutLogo width={100} height={35} className="text-foreground dark:text-white" />
                      ) : (
                        item.title
                      )
                    ) : (
                      item.title
                    )}
                  </motion.a>
                </Link>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
