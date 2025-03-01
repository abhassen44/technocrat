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
      },
      {
        title: "Blogs",
        description: "Latest insights and tech articles",
        href: "/blogs",
      },
    ],
  },
  { title: "Events", href: "/events" },
  { title: "Projects", href: "/projects" },
  { title: "Merch", href: "/merch" },
  { title: "About", href: "/about" },
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
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground">T</span>
              </div>
              <span className="hidden sm:inline">Technocrats</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-1">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.type === "dropdown" ? (
                    <>
                      <NavigationMenuTrigger className="text-base h-9 px-4">
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
                                      "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    )}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                    {subItem.description && (
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
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
                    </>
                  ) : (
                    <Link href={item.href || ""}>
                      <NavigationMenuLink asChild>
                        <motion.a
                          className={cn(
                            "block select-none rounded-md px-4 py-2 leading-none no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item.title}
                        </motion.a>
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
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
                  <div className="font-medium text-sm text-muted-foreground">{item.title}</div>
                  {item.items?.map((subItem) => (
                    <Link key={subItem.title} href={subItem.href || ""}>
                      <motion.a
                        className="block px-2 py-1.5 text-sm rounded-md hover:bg-accent"
                        whileTap={{ scale: 0.98 }}
                      >
                        {subItem.title}
                      </motion.a>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link href={item.href || ""}>
                  <motion.a
                    className="block px-2 py-1.5 text-sm rounded-md hover:bg-accent"
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.title}
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
