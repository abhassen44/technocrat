import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 px-10">
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/tutorials">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    Tutorials
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blogs">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    Blogs
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    Events
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold">Community</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/projects">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    Projects
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
            <h3 className="text-xl font-semibold">Subscribe to our community</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get the latest updates and tutorials directly in your inbox.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Technocrats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
