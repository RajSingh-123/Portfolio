import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import ProjectDetails from "@/pages/project-details";
import SQLCaseStudies from "@/pages/sql-cases";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import FAQ from "@/pages/faq";
import Blog from "@/pages/blog";
import TestimonialsPage from "@/pages/testimonials";
import AdminPage from "@/pages/admin";
import JobTailorPage from "@/pages/job-tailor";
import ATSKeywordsPage from "@/pages/ats-keywords";
import { AnimationProvider } from "./context/AnimationContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetails} />
      <Route path="/sql-case-studies" component={SQLCaseStudies} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/blog" component={Blog} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/job-tailor" component={JobTailorPage} />
      <Route path="/ats-keywords" component={ATSKeywordsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimationProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AnimationProvider>
    </QueryClientProvider>
  );
}

export default App;
