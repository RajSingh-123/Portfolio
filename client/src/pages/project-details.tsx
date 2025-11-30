import Layout from "@/components/layout";
import { projects } from "@/data/portfolio";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, ExternalLink, Code, Layers, Lightbulb, 
  ListChecks, CheckCircle2, Database, FileText, 
  Download, BarChart 
} from "lucide-react";
import NotFound from "@/pages/not-found";
import ProjectGallery from "@/components/project-gallery";

export default function ProjectDetails() {
  const [, params] = useRoute("/projects/:id");
  const project = projects.find((p) => p.id === params?.id);

  if (!project) return <NotFound />;

  // Function to mock downloading a SQL file
  const downloadSQL = () => {
    const element = document.createElement("a");
    const fileContent = `-- SQL Queries for ${project.title}\n-- Generated for Portfolio Demo\n\n` + 
      project.queries.map(q => `-- ${q.name}\n${q.code}\n\n`).join("");
    const file = new Blob([fileContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${project.id}-queries.sql`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Layout>
      {/* Header / Hero */}
      <div className="bg-muted/30 border-b">
        <div className="container px-4 mx-auto py-12">
          <Link href="/projects">
            <a className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to Projects
            </a>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-6">
                {project.tech.map((t) => (
                  <Badge key={t} variant="secondary" className="px-3 py-1 text-sm border border-primary/10">
                    {t}
                  </Badge>
                ))}
                {project.status && (
                  <Badge
                    variant="outline"
                    className={`px-3 py-1 text-sm ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : project.status === "Under Review"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : project.status === "Prototype"
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : "bg-gray-200 text-gray-700 border-gray-300"
                  }`}
                  >
                    {project.status}
                  </Badge>
              )}
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {project.summary}
              </p>
            </div>
            {project.status !== "Coming Soon" && (
              <div className="flex flex-col gap-3 shrink-0 mt-4 md:mt-0">
                <Button className="gap-2 shadow-lg shadow-primary/20" onClick={downloadSQL} disabled={!project.queries?.length}>
                  <Download size={16} /> {project.queries?.length ? "Download SQL File" : "SQL Coming Soon"}
                </Button>

                {project.dax?.length > 0 && (
                  <Button variant="outline" className="gap-2">
                    <FileText size={16} /> View PBI Brief
                  </Button>
                )}
              </div>
              )}
            </div>

            {project.status === "Prototype" && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm">
                This project uses prototype visuals. Final dashboards and assets will be uploaded soon.
              </div>
            )}

            {project.status === "Under Review" && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-sm">
                Some assets (screenshots, datasets, SQL files, demo video) are being updated.
              </div>
            )}

            {project.status === "Coming Soon" && (
              <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-xl text-gray-700 text-sm">
                This project page contains planned details. Final dashboard, datasets, and scripts will be added soon.
              </div>
            )}
        </div>
      </div>

      <div className="container px-4 mx-auto py-12">
        
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>

            {project.status !== "Coming Soon" && (
              <TabsTrigger value="analysis">Technical Analysis</TabsTrigger>
            )}

            {project.status !== "Coming Soon" && project.dax?.length > 0 && (
              <TabsTrigger value="powerbi">Power BI / DAX</TabsTrigger>
            )}

            {project.status !== "Coming Soon" && (
              <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
            )}
          </TabsList>


          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {/* Gallery Component */}
                {project.gallery && project.gallery.images?.length > 0 ? (
                  <ProjectGallery
                    images={project.gallery.images}
                    demoVideo={project.gallery.demoVideo ?? undefined}
                    datasets={project.gallery.datasets || []}
                  />
                ) : project.status === "Coming Soon" ? (
                  <div className="rounded-2xl p-10 border bg-muted/20 text-center text-muted-foreground">
                    Dashboard preview coming soon.
                  </div>
                ) : (
                  <div className="rounded-2xl p-10 border bg-muted/20 text-center text-muted-foreground">
                    No gallery available.
                  </div>
                )}


                {/* Thumbnail - Fallback if no gallery */}
                {!(project as any).gallery && (
                  <div className="rounded-2xl overflow-hidden border shadow-sm aspect-video bg-muted">
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Narrative Case Study */}
                <section>
                  <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-3">
                    <FileText className="text-primary" /> Case Study
                  </h2>
                  <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-loose whitespace-pre-line">
                    {project.narrative}
                  </div>
                </section>

                {/* Problem & Dataset */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-xl border hover:border-primary/30 transition-colors">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-primary">
                      <Lightbulb size={20} /> The Problem
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="bg-card p-6 rounded-xl border hover:border-primary/30 transition-colors">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-primary">
                      <Database size={20} /> The Dataset
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.dataset}</p>
                  </div>
                </div>

                {/* Methodology */}
                <section>
                  <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                    <Layers className="text-primary" /> Methodology
                  </h2>
                  <div className="space-y-4">
                    {project.approach.map((step, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-lg bg-muted/30 border hover:border-primary/30 transition-colors">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                          {i + 1}
                        </span>
                        <p className="text-foreground/90 text-sm md:text-base pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Insights Box */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
                    <CheckCircle2 size={20} /> Key Insights
                  </h3>
                  <ul className="space-y-4">
                    {project.insights.map((insight, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-sm font-medium text-foreground/90 leading-relaxed">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools Used */}
                <div className="p-6 border rounded-2xl bg-card">
                  <h3 className="text-lg font-bold mb-4">Tools & Tech</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <Badge key={t} variant="outline" className="bg-background hover:bg-primary/5">{t}</Badge>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    <strong>Environment:</strong> {project.tools}
                  </p>
                </div>

                {/* Recommendations */}
                <div className="p-6 border rounded-2xl bg-muted/10">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ListChecks size={18} /> Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {project.nextSteps.map((step, i) => (
                      <li key={i} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/30">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TECHNICAL ANALYSIS TAB */}
        {project.status !== "Coming Soon" && (
          <TabsContent value="analysis" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold flex items-center gap-3">
                <Code className="text-primary" /> Code & Queries
              </h2>
              <Button variant="outline" size="sm" onClick={downloadSQL}>
                <Download className="mr-2 h-4 w-4" /> Download .sql File
              </Button>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {project.queries.map((q, i) => (
                <div key={i} className="border rounded-xl overflow-hidden flex flex-col bg-card shadow-sm">
                  <div className="bg-muted/50 px-4 py-3 border-b font-medium text-sm flex justify-between items-center">
                    <span className="font-mono text-primary">{i + 1}. {q.name}</span>
                    <Badge variant="secondary" className="text-[10px] font-mono uppercase tracking-wider">
                      {project.tech.includes("Python") && !q.code.includes("SELECT") ? "Python" : "SQL"}
                    </Badge>
                  </div>
                  <div className="relative group flex-1 bg-slate-950">
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-white/50 hover:text-white">
                        <ExternalLink size={12} />
                      </Button>
                    </div>
                    <pre className="p-4 text-slate-50 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed h-full">
                      <code>{q.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        )}

          {/* POWER BI TAB */}
          {project.status !== "Coming Soon" && project.dax?.length > 0 && (
            <TabsContent value="powerbi" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-linear-to-r from-yellow-500/10 to-orange-500/10 p-8 rounded-2xl border border-yellow-500/20">
                <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-3 text-yellow-700 dark:text-yellow-500">
                  <BarChart size={24} /> Power BI Data Model
                </h2>
                <p className="text-muted-foreground max-w-3xl">
                  This project utilizes a Star Schema architecture with a central Fact table connected to Dimension tables (Date, Location, Product) via one-to-many relationships. 
                  DAX measures were created to handle dynamic aggregation based on user filter context.
                </p>
              </div>

              <div className="grid gap-6">
                <h3 className="text-xl font-bold">Key DAX Measures</h3>
                {project.dax.map((measure, i) => (
                  <div key={i} className="border rounded-xl p-6 bg-card hover:border-yellow-500/30 transition-colors shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <h4 className="font-bold text-lg">{measure.name}</h4>
                      <Badge variant="outline" className="w-fit border-yellow-500/30 text-yellow-600 dark:text-yellow-500 bg-yellow-500/5">
                        Calculated Measure
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 italic border-l-2 border-muted pl-3">
                      "{measure.description}"
                    </p>
                    <div className="bg-slate-950 rounded-lg p-4 overflow-x-auto border border-slate-800">
                      <code className="text-yellow-400 font-mono text-sm">
                        {measure.formula}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}

          {/* DELIVERABLES TAB */}
          {project.status !== "Coming Soon" && (
            <TabsContent value="deliverables" className="space-y-8">
              <div className="max-w-2xl mx-auto text-center py-12">
                <h2 className="text-2xl font-bold mb-6">Project Artifacts</h2>

                {project.deliverables?.length ? (
                  <div className="grid gap-4 text-left">
                    {project.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-xl bg-card hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <FileText size={20} />
                          </div>
                          <span className="font-medium">{item}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Deliverables coming soon.</p>
                )}
              </div>
            </TabsContent>
          )}


        </Tabs>
      </div>
    </Layout>
  );
}
