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

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <NavigationMenuLink className="font-bold">
                  LastMinuteEngineers
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <li className="row-span-3">
                    <Link href="/tutorials">
                      <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                        <div className="text-sm font-medium leading-none">Tutorials</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Step-by-step guides for electronics projects
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogs">
                      <NavigationMenuLink className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                        Blogs
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/events">
                <NavigationMenuLink className={cn("block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                  Events
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/projects">
                <NavigationMenuLink className={cn("block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                  Projects
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about">
                <NavigationMenuLink className={cn("block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
