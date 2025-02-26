import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RobotCursor } from "@/components/ui/RobotCursor";
import Home from "@/pages/Home";
import Tutorials from "@/pages/Tutorials";
import Blogs from "@/pages/Blogs";
import Events from "@/pages/Events";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Merch from "@/pages/Merch";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
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
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;