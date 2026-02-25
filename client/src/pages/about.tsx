import Layout from "@/components/layout";
import { personalInfo, skills, softSkills } from "@/data/portfolio";
import { Download, Mail, MapPin, Phone, Linkedin, Github, Briefcase, Eye, FileText, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import GitHubRepos from "@/components/github-repos";
import ContactCTA from "@/components/contact-cta";

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}
//
// ================= Animated Counter ==================
//
function Counter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <div ref={ref} className="text-center p-4 bg-background/50 backdrop-blur-sm rounded-xl border shadow-sm">
      <div className="text-3xl font-bold text-primary mb-1 flex justify-center items-center">
        <motion.span>{rounded}</motion.span>{suffix}
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
    </div>
  );
}

//
// ================= Skill Bar ==================
function SkillBar({ skill, level }: { skill: string; level: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

//
// ================= About Component ==================
//
export default function About() {
  const [viewMode, setViewMode] = useState<"concise" | "detailed">("concise");
  const { toast } = useToast();

  // Skill levels
  const proficiencyMap: Record<string, number> = {
    Python: 85,
    SQL: 92,
    "Power BI": 90,
    Excel: 88,
    Tableau: 75,
    Pandas: 82,
    NumPy: 78,
    "Data Modeling": 85,
    DAX: 80,
    "ETL Workflows": 85,
  };

  //
  // =============== Resume Variant (from server cookie) ===============
  //
  const [recommendedVariant, setRecommendedVariant] = useState<"global" | "uae" | null>(null);
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // read the cookie that middleware.ts set
    const match = document.cookie.match(/(?:^|;\s*)resume_variant=([^;]+)/);
    const variant = match ? match[1] : null;

    if (variant === "uae") {
      setRecommendedVariant("uae");

      toast({
        title: "Resume suggestion",
        description: "Recommended resume for your location: UAE version.",
      });
    } else if (variant === "global") {
      setRecommendedVariant("global");
    } else {
      setRecommendedVariant("global"); // fallback
    }

    setDetected(true);
  }, [toast]);

  //
  // =============== Download handlers ===============
  //

const downloadResume = (variant: "global" | "uae") => {
  // 1. ANALYTICS: Send the event to Google before opening the file
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "resume_click", // This is the trigger name you'll use in GTM
    resume_variant: variant === "global" ? "Global_ATS" : "UAE_Local",
  });

  // 2. LOGGING & UI
  console.log(`[GTM] Pushed ${variant} to DataLayer`);
  toast({
    title: "Preparing download...",
    description: variant === "global" 
      ? "Opening Global (ATS-friendly) resume." 
      : "Opening UAE resume (with photo).",
  });

  // 3. EXECUTION
  const path = variant === "global" ? "/resume-global.pdf" : "/resume-uae.pdf";
  window.open(path, "_blank");
};

const downloadAndClose = (variant: "global" | "uae", e: React.MouseEvent<HTMLButtonElement>) => {
  downloadResume(variant);
  const details = e.currentTarget.closest("details") as HTMLDetailsElement | null;
  if (details) details.removeAttribute("open");
};

  //
  // ================================================================
  return (
    <Layout>
      <div className="container px-4 mx-auto py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-heading font-bold mb-2">About Me</h1>
              <p className="text-xl text-muted-foreground">
                Data Analyst | Business Intelligence | Data Visualization
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="flex items-center space-x-2 bg-muted/50 p-2 rounded-lg border">
                <Switch
                  id="view-mode"
                  checked={viewMode === "detailed"}
                  onCheckedChange={(checked) => setViewMode(checked ? "detailed" : "concise")}
                />
                <Label
                  htmlFor="view-mode"
                  className="cursor-pointer flex items-center gap-2 text-sm font-medium"
                >
                  {viewMode === "detailed" ? <FileText size={16} /> : <Eye size={16} />}
                  {viewMode === "detailed" ? "Detailed View" : "Concise View"}
                </Label>
              </div>

              {/* ========= Download dropdown ========= */}
              <div className="relative">
                <details className="relative">
                  <summary className="flex items-center gap-2 cursor-pointer select-none bg-card px-4 py-2 rounded-lg shadow-lg hover:opacity-95">
                    <Download size={18} />
                    <span>Download Resume</span>
                    <svg
                      className="ml-2"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>

                  <div className="absolute right-0 mt-2 w-64 bg-card border rounded-md shadow-lg z-50">
                    {/* Global Resume */}
                    <button
                      onClick={(e) => downloadAndClose("global", e)}
                      className={`w-full text-left px-4 py-3 hover:bg-muted/10 transition-colors flex items-center gap-3 ${
                        recommendedVariant === "global" ? "ring-2 ring-primary rounded-md" : ""
                      }`}
                    >
                      <span className="text-sm">
                        🌍 Global — ATS-friendly (recommended)
                      </span>
                      {recommendedVariant === "global" && (
                        <span className="ml-auto text-xs text-primary font-medium">
                          Recommended
                        </span>
                      )}
                    </button>

                    {/* UAE Resume */}
                    <button
                      onClick={(e) => downloadAndClose("uae", e)}
                      className={`w-full text-left px-4 py-3 hover:bg-muted/10 transition-colors flex items-center gap-3 ${
                        recommendedVariant === "uae" ? "ring-2 ring-primary rounded-md" : ""
                      }`}
                    >
                      <span className="text-sm">
                        🇦🇪 UAE — Local format (photo & personal details)
                      </span>
                      {recommendedVariant === "uae" && (
                        <span className="ml-auto text-xs text-primary font-medium">
                          Recommended
                        </span>
                      )}
                    </button>
                  </div>
                </details>
              </div>
              {/* ===================================== */}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Counter value={8} label="Months Experience" suffix="+" />
            <Counter value={15} label="Projects Completed" suffix="+" />
            <Counter value={500} label="Queries Written" suffix="+" />
            <Counter value={100} label="Dashboards Built" suffix="%" />
          </div>

          <div className="grid gap-8">
            {/* LinkedIn About Section (Detailed only) */}
            {viewMode === "detailed" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-8 border-l-4 border-l-primary shadow-md bg-linear-to-r from-background to-muted/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Linkedin className="text-blue-600" size={24} />
                    <h2 className="text-2xl font-bold">Professional Bio</h2>
                  </div>
                  <div className="prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
                    {personalInfo.aboutLinkedIn}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Main Resume Paper */}
            <div className="bg-card border shadow-sm rounded-xl p-8 md:p-12 space-y-10 transition-all duration-500">
              {/* Header */}
              <div className="border-b pb-8 text-center md:text-left flex flex-col md:flex-row gap-8 items-center md:items-start">
                <Avatar className="w-32 h-32 border-4 border-muted shadow-xl">
                  <AvatarImage
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{personalInfo.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-primary mb-4">{personalInfo.name}</h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {personalInfo.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={14} /> {personalInfo.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={14} /> {personalInfo.phone}
                    </span>

                    <span className="hidden md:inline">|</span>
                    <a
                      href={`https://${personalInfo.linkedin}`}
                      className="hover:text-primary underline"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={`https://${personalInfo.github}`}
                      className="hover:text-primary underline"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4 border-b border-primary/20 pb-1">
                  Professional Summary
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {personalInfo.bio} 8+ months of project-based experience, delivering measurable
                  insights that improved efficiency and reporting accuracy. Seeking entry-level roles
                  across Data Analytics, Business Analysis, BI Reporting, and Insights.
                </p>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4 border-b border-primary/20 pb-1">
                  Technical Skills
                </h3>

                {viewMode === "detailed" ? (
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Activity size={16} /> Core Competencies
                      </h4>
                      <SkillBar skill="SQL (MySQL, PostgreSQL)" level={proficiencyMap["SQL"]} />
                      <SkillBar skill="Power BI" level={proficiencyMap["Power BI"]} />
                      <SkillBar skill="Python (Pandas)" level={proficiencyMap["Python"]} />
                      <SkillBar skill="Excel (Power Query)" level={proficiencyMap["Excel"]} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Briefcase size={16} /> Tools & Libraries
                      </h4>
                      <SkillBar skill="Data Modeling" level={proficiencyMap["Data Modeling"]} />
                      <SkillBar skill="ETL Workflows" level={proficiencyMap["ETL Workflows"]} />
                      <SkillBar skill="DAX" level={proficiencyMap["DAX"]} />
                      <SkillBar skill="Tableau" level={proficiencyMap["Tableau"]} />
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <span className="font-semibold block mb-1 text-sm">
                        Languages & Libraries
                      </span>
                      <p className="text-sm text-muted-foreground">{skills.languages.join(", ")}</p>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1 text-sm">
                        Visualization Tools
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {skills.visualization.join(", ")}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1 text-sm">Databases</span>
                      <p className="text-sm text-muted-foreground">
                        MySQL, PostgreSQL (Joins, CTEs, Window Functions)
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1 text-sm">Platforms</span>
                      <p className="text-sm text-muted-foreground">{skills.tools.join(", ")}</p>
                    </div>
                  </div>
                )}
              </section>

              {/* Education */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4 border-b border-primary/20 pb-1">
                  Education
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between items-baseline flex-wrap">
                    <h4 className="font-bold text-base">
                      Bachelor of Technology (B.Tech) – Computer Science and Engineering
                    </h4>
                    <span className="text-sm text-muted-foreground">July 2025</span>
                  </div>
                  <p className="text-primary/80 font-medium text-sm">
                    Assam Downtown University | CGPA: 8.63
                  </p>

                  {viewMode === "detailed" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground mt-2"
                    >
                      Relevant Coursework: Statistics, Data Mining, Probability, Linear Algebra,
                      Data Wrangling
                    </motion.p>
                  )}
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4 border-b border-primary/20 pb-1">
                  Certifications
                </h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Google Data Analytics (In Progress, 2025)</li>
                  <li>Kaggle – Pandas & Data Visualization (2025)</li>
                  <li>HackerRank – SQL (Basic & Advanced, 2023–2025)</li>
                </ul>
              </section>

              {/* Soft Skills */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4 border-b border-primary/20 pb-1">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* GitHub Repos */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4 border-b border-primary/20 pb-1">
                  Latest Projects on GitHub
                </h3>
                <GitHubRepos username="RajSingh-123" limit={6} />
              </section>

              {/* Contact */}
              <section>
                <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-4 border-b border-primary/20 pb-1">
                  Let's Connect
                </h3>
                <ContactCTA
                  email={personalInfo.email}
                  linkedInUrl={`https://${personalInfo.linkedin}`}
                  githubUrl={`https://${personalInfo.github}`}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

