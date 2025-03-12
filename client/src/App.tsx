import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/home/ParticleBackground";
import Home from "@/pages/Home";
import Tutorials from "@/pages/Tutorials";
import Blogs from "@/pages/Blogs";
import Events from "@/pages/Events";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Merch from "@/pages/Merch";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { RobotCursor } from "@/components/home/RobotCursor";
const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <ParticleBackground />
      <RobotCursor />
      <Navbar />
      <div className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tutorials" component={Tutorials} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/events" component={Events} />
          <Route path="/projects" component={Projects} />
          <Route path="/merch" component={Merch} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}