import React, { useMemo } from "react";
import Layout from "@/components/layout";
import { personalInfo, skills } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BarChart2, Database, Code2, Download } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import heroBg from "@assets/generated_images/abstract_data_visualization_hero_background.png";
import { projects } from "@/data/portfolio";
import ProjectCard from "@/components/project-card";
import { GridBackground } from "@/components/grid-background";
import { UnifiedHeroScene } from "@/components/unified-hero-scene";
import { AnimatedBackground } from "@/components/animated-background";
import { DataSphere } from "@/components/data-sphere";
import { FloatingOrbs } from "@/components/floating-orbs";

export default function Home() {
  // Get top 3 projects
  const featuredProjects = projects.slice(0, 3);

  // Render grid background once
  const gridBackground = useMemo(() => <GridBackground />, []);

  return (
    <Layout>
      {/* 3D Background Theme - Data Sphere Network */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <DataSphere containerClass="w-full h-full" />
      </div>
      
      {/* Floating Orbs - Animated Background Elements */}
      <FloatingOrbs />
      
      {/* Animated Background Theme */}
       <div className="pointer-events-none absolute inset-0 -z-20 hidden sm:block">
        <div className="opacity-40" aria-hidden>
          <AnimatedBackground />
        </div>
      </div>
      
      {/* Sci-Fi Grid Background */}
      {gridBackground}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Unified 3D Hero Scene - Optimized */}
        <div className="absolute inset-0 z-0">
          <UnifiedHeroScene />
        </div>

        {/* Background Image with Overlay (fallback) */}
        <div className="absolute inset-0 z-0 opacity-0">
          <img 
            src={heroBg} 
            alt="Data Visualization Background" 
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
        </div>

        <div className="container px-4 relative z-10 pt-20">
          <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            <div className="flex justify-center mb-8">
              <div className="p-1 rounded-full bg-linear-to-tr from-primary to-blue-600 shadow-2xl">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background">
                  <AvatarImage src={personalInfo.avatar} alt={personalInfo.name} className="object-cover" />
                  <AvatarFallback>{personalInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for immediate joining
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-foreground mb-6">
              Turning Raw Data into <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">Business Impact</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Hi, I'm <span className="font-semibold text-foreground">{personalInfo.name}</span>. 
              A {personalInfo.role} specializing in building interactive dashboards, 
              automating ETL workflows, and uncovering actionable insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <a>
                  <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                    View My Work <ArrowRight className="ml-2" />
                  </Button>
                </a>
              </Link>
              <Link href="/contact">
                <a>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8 rounded-full bg-background/50 backdrop-blur-sm border-foreground/10">
                    Contact Me
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Skills Grid */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Animated gradient glow */}
        <div className="absolute inset-0 -z-10" style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 208, 132, 0.08), transparent)',
          animation: 'glow-pulse-soft 4s ease-in-out infinite'
        }} />
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Core Competencies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bridging the gap between technical data processing and strategic business decision making.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Skill 1 */}
            <div className="bg-background p-8 rounded-2xl border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md group">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Data Visualization</h3>
              <p className="text-muted-foreground mb-4">
                Transforming complex datasets into intuitive dashboards using Power BI and Tableau for stakeholder reporting.
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.visualization.slice(0,3).map(s => (
                  <span key={s} className="text-xs px-2 py-1 bg-secondary rounded-md font-medium">{s}</span>
                ))}
              </div>
            </div>

            {/* Skill 2 */}
            <div className="bg-background p-8 rounded-2xl border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md group">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Data Modeling & SQL</h3>
              <p className="text-muted-foreground mb-4">
                Designing efficient schemas, writing complex queries with CTEs, and optimizing database performance.
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.languages.filter(l => l.includes("SQL") || l.includes("DAX")).map(s => (
                  <span key={s} className="text-xs px-2 py-1 bg-secondary rounded-md font-medium">{s}</span>
                ))}
              </div>
            </div>

            {/* Skill 3 */}
            <div className="bg-background p-8 rounded-2xl border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md group">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Python & Automation</h3>
              <p className="text-muted-foreground mb-4">
                Automating repetitive ETL tasks and performing advanced statistical analysis with Pandas and NumPy.
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.languages.filter(l => l.includes("Python")).map(s => (
                  <span key={s} className="text-xs px-2 py-1 bg-secondary rounded-md font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Highlights - Achievements & Impact */}
      <section className="relative py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading font-bold mb-2">Portfolio Highlights</h2>
            <p className="text-muted-foreground">Quantified impact from completed projects</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { metric: "35%", label: "HR Efficiency Improvement", desc: "Automated reporting in Power BI" },
              { metric: "20%", label: "Recommendation Accuracy", desc: "Netflix viewing analytics boost" },
              { metric: "5", label: "Live Projects", desc: "End-to-end analytics solutions" },
              { metric: "50K+", label: "Customer Segments", desc: "RFM analysis & clustering" },
              { metric: "15%", label: "Forecast Accuracy", desc: "Adidas sales prediction" },
              { metric: "25%", label: "Course Completion Lift", desc: "Student engagement automation" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-background border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <div className="text-3xl font-bold text-primary mb-2">{stat.metric}</div>
                <div className="font-semibold text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 container px-4 mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">Featured Projects</h2>
            <p className="text-muted-foreground">Selected works demonstrating end-to-end analytics.</p>
          </div>
          <Link href="/projects">
            <a className="hidden md:flex items-center text-primary font-medium hover:underline">
              View all projects <ArrowRight size={16} className="ml-2" />
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/projects">
            <Button variant="outline">View all projects</Button>
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 max-w-2xl mx-auto">
            {personalInfo.cta}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-foreground font-bold shadow-xl hover:scale-105 transition-transform">
                Get in Touch
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground hover:text-white">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
