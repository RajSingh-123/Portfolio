import React from "react";
import { Link, useLocation } from "wouter";
import { personalInfo } from "@/data/portfolio";
import { Menu, X, Github, Linkedin, Mail, Search, Moon, Sun } from "lucide-react";
import { useState, useEffect, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import SearchModal from "@/components/search-modal";
import ConsentBanner from "@/components/consent-banner";
import { analytics } from "@/lib/analytics";

// Lazy load animated background
const AnimatedBackground = lazy(() => import("@/components/animated-background").then(m => ({ default: m.AnimatedBackground })));

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Render animated background once
  const animatedBg = React.useMemo(() => (
    <Suspense fallback={null}>
      <AnimatedBackground />
    </Suspense>
  ), []);

  // Track pageviews
  useEffect(() => {
    analytics.trackPageview(location);
  }, [location]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location]);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkMode = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDark(isDarkMode);
    updateTheme(isDarkMode);
  }, []);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    updateTheme(newDark);
  };

  // Global search shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/sql-case-studies", label: "SQL Cases" },
    { href: "/about", label: "About / Resume" },
    { href: "/blog", label: "Blog" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/job-tailor", label: "Job Tailor" },
    { href: "/ats-keywords", label: "ATS Keywords" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/20">
      {/* Animated Background */}
      {animatedBg}
      
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="font-heading font-bold text-xl tracking-tight hover:text-primary transition-colors">
              {personalInfo.name}<span className="text-primary">.</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Search, Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex text-muted-foreground hover:text-foreground"
              title="Search (Cmd+K)"
              data-testid="button-search"
            >
              <Search size={20} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
              title={isDark ? "Light mode" : "Dark mode"}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b bg-background p-4 animate-in slide-in-from-top-5">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`text-base font-medium p-2 rounded-md hover:bg-muted ${
                      location === link.href
                        ? "text-primary bg-primary/5"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Consent Banner */}
      <ConsentBanner />

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-heading font-bold text-lg">{personalInfo.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {personalInfo.role} based in {personalInfo.location}.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {personalInfo.relocation}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-full bg-background border hover:border-primary hover:text-primary transition-all"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href={`https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background border hover:border-primary hover:text-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background border hover:border-primary hover:text-primary transition-all"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Raj Singh. Built with React & Tailwind.
          </div>
        </div>
      </footer>
    </div>
  );
}
