import { Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme/ThemeToggle";
import CartButton from "../shop/CartButton";
import EventsLogo from "../ui/EventsLogo";
import TutorialsLogo from "../ui/TutorialsLogo";
import BlogsLogo from "../ui/BlogsLogo";
import ProjectsLogo from "../ui/ProjectsLogo";
import MerchLogo from "../ui/MerchLogo";
import AboutLogo from "../ui/AboutLogo";

// Type definitions
interface MenuItem {
  title: string;
  href?: string;
  type?: "dropdown";
  items?: SubMenuItem[];
  hasLogo?: boolean;
}

interface SubMenuItem {
  title: string;
  description?: string;
  href: string;
  featured?: boolean;
  hasLogo?: boolean;
}

const menuItems: MenuItem[] = [
  {
    title: "Learn",
    type: "dropdown",
    items: [
      {
        title: "Tutorials",
        description: "Step-by-step guides for electronics projects",
        href: "/tutorials",
        featured: true,
        hasLogo: true,
      },
      {
        title: "Blogs",
        description: "Latest insights and tech articles",
        href: "/blogs",
        hasLogo: true,
      },
    ],
  },
  { title: "Events", href: "/events", hasLogo: true },
  { title: "Projects", href: "/projects", hasLogo: true },
  { title: "Merch", href: "/merch", hasLogo: true },
  { title: "About", href: "/about", hasLogo: true },
];

const LogoMap = {
  Tutorials: TutorialsLogo,
  Blogs: BlogsLogo,
  Events: EventsLogo,
  Projects: ProjectsLogo,
  Merch: MerchLogo,
  About: AboutLogo,
};

const MenuLink = ({
  item,
  className,
  onClick,
}: {
  item: MenuItem | SubMenuItem;
  className?: string;
  onClick?: () => void;
}) => {
  const LogoComponent = item.hasLogo && item.title in LogoMap ? LogoMap[item.title as keyof typeof LogoMap] : null;

  return (
    <motion.a
      className={cn(className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {LogoComponent ? (
        <LogoComponent width={100} height={30} className="text-foreground dark:text-white" />
      ) : (
        <span className="relative z-10">{item.title}</span>
      )}
      {"description" in item && item.description && (
        <p className="text-sm text-muted-foreground mt-1 relative z-10">{item.description}</p>
      )}
    </motion.a>
  );
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <div className="w-40 h-14 bg-primary rounded-full overflow-hidden shadow-md">
              <img
                src="/assets/images/techno.jpg"
                alt="Technocrats Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div ref={navRef} className="hidden md:flex items-center gap-4 relative">
          <NavigationMenu>
            <NavigationMenuList className="relative flex gap-2">
              {menuItems.map((item) => (
                <NavigationMenuItem
                  key={item.title}
                  onMouseEnter={() => setHoveredItem(item.title)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  {item.type === "dropdown" ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          "text-lg font-medium px-4 py-2 rounded-full transition-all duration-200 relative z-10",
                          isScrolled ? "text-foreground" : "text-black dark:text-white",
                          hoveredItem === item.title && "text-primary"
                        )}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-background/95 backdrop-blur-md border rounded-lg shadow-xl">
                        <ul className="grid gap-3 p-6 w-[400px]">
                          {item.items?.map((subItem) => (
                            <li key={subItem.title} className={cn(subItem.featured && "row-span-2")}>
                              <NavigationMenuLink asChild>
                                <Link href={subItem.href}>
                                  <MenuLink
                                    item={subItem}
                                    className="block space-y-1 rounded-md p-3 hover:bg-accent/80 transition-colors"
                                  />
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link href={item.href || ""}>
                        <MenuLink
                          item={item}
                          className={cn(
                            "px-4 py-2 text-lg font-medium rounded-full transition-all duration-200 relative z-10",
                            "hover:text-primary",
                            isScrolled ? "text-foreground" : "text-black dark:text-white",
                            hoveredItem === item.title && "text-primary"
                          )}
                        />
                      </Link>
                    </NavigationMenuLink>
                  )}
                  {/* Slider Background */}
                  <AnimatePresence>
                    {hoveredItem === item.title && (
                      <motion.div
                        className="absolute inset-0 bg-accent/20 rounded-full -z-10 shadow-sm"
                        layoutId="nav-slider"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <CartButton />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <CartButton />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="rounded-full hover:bg-accent/20"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          >
            <motion.div
              className="absolute top-16 inset-x-0 px-4 py-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto bg-background/90 rounded-t-xl shadow-xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.title}
                  className="space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {item.type === "dropdown" ? (
                    <>
                      <div className="font-medium text-sm text-foreground px-3">{item.title}</div>
                      {item.items?.map((subItem) => (
                        <Link key={subItem.title} href={subItem.href}>
                          <MenuLink
                            item={subItem}
                            className="block px-4 py-2 text-sm rounded-lg hover:bg-accent/20 transition-colors"
                            onClick={closeMobileMenu}
                          />
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link href={item.href || ""}>
                      <MenuLink
                        item={item}
                        className="block px-4 py-2 text-base font-medium rounded-lg hover:bg-accent/20 transition-colors"
                        onClick={closeMobileMenu}
                      />
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}