import Layout from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Search } from "lucide-react";
import { useState } from "react";
import { analyzeResumeForATS } from "@/lib/atsAnalyzer";
import { useToast } from "@/hooks/use-toast";

export default function ATSKeywordsPage() {
  const analysis = analyzeResumeForATS();
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
    toast({
      title: "Copied!",
      description: `${section} copied to clipboard.`,
    });
  };

  const summaryText = analysis.professionalSummary;
  const keywordsText = analysis.keywords.map((k) => k.keyword).join(", ");

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
        {/* Header */}
        <div className="bg-muted/30 border-b py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-heading font-bold mb-4 flex items-center gap-3">
              <Search size={32} />
              ATS Keyword Analysis
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Optimized keywords, alternate job titles, and professional summary tailored for Applicant Tracking
              Systems and job boards.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 space-y-8">
          {/* Top 20 ATS Keywords */}
          <Card className="p-8" data-testid="card-ats-keywords">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                🎯 Top 20 ATS Keywords
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(keywordsText, "Keywords")}
                data-testid="button-copy-keywords"
              >
                {copied === "Keywords" ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {analysis.keywords.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
                  data-testid={`row-keyword-${idx}`}
                >
                  <span className="font-medium text-sm">{item.keyword}</span>
                  <Badge variant="secondary" className="text-xs">
                    Appears {item.frequency}x
                  </Badge>
                </div>
              ))}
            </div>

            <div className="text-xs text-muted-foreground bg-primary/5 p-4 rounded-lg">
              💡 <strong>Tip:</strong> These keywords appear frequently in your resume and projects. Include them in
              cover letters, LinkedIn, and job applications to improve ATS matching. Most ATS systems match 50-70% of
              keywords to rank candidates.
            </div>
          </Card>

          {/* Alternate Job Titles */}
          <Card className="p-8" data-testid="card-job-titles">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                💼 Alternate Job Titles to Apply To
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  copyToClipboard(analysis.jobTitles.join(", "), "Job Titles")
                }
                data-testid="button-copy-titles"
              >
                {copied === "Job Titles" ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {analysis.jobTitles.map((title, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-muted/30 rounded-lg border hover:border-primary/50 transition-colors"
                  data-testid={`card-title-${idx}`}
                >
                  <h3 className="font-semibold text-lg mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {getTitleDescription(title)}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-xs text-muted-foreground bg-primary/5 p-4 rounded-lg">
              💡 <strong>Tip:</strong> Apply to roles with these titles even if your primary target is "Data Analyst".
              Many companies use different titles for similar roles. Expanding your search increases visibility by 40-60%.
            </div>
          </Card>

          {/* Professional Summary */}
          <Card className="p-8" data-testid="card-summary">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2 mb-1">
                  ✨ Professional Summary
                </h2>
                <p className="text-xs text-muted-foreground">{summaryText.split(" ").length} words</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(summaryText, "Summary")}
                data-testid="button-copy-summary"
              >
                {copied === "Summary" ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </Button>
            </div>

            <div className="bg-muted/20 p-6 rounded-lg border mb-6">
              <p className="text-base leading-relaxed text-foreground italic">
                "{summaryText}"
              </p>
            </div>

            <div className="text-xs text-muted-foreground bg-primary/5 p-4 rounded-lg space-y-2">
              <p>
                💡 <strong>Usage Tips:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>LinkedIn Headline: Use first 120 characters for maximum visibility</li>
                <li>Job Board Profiles: Use full summary in "About" sections</li>
                <li>Cover Letters: Reference this when opening applications</li>
                <li>Job Tailoring: Customize slightly per role while keeping core keywords</li>
              </ul>
            </div>
          </Card>

          {/* Strategy Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
            <h3 className="text-xl font-heading font-bold mb-4">🚀 ATS Optimization Strategy</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Before Applying</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Mirror job description keywords in resume</li>
                  <li>✓ Use specific tools (SQL, Power BI, not "analytics tools")</li>
                  <li>✓ Include metrics and quantified achievements</li>
                  <li>✓ Use consistent formatting (no fancy fonts/colors)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">During Application</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Fill out all required fields completely</li>
                  <li>✓ Match keywords from job posting to resume</li>
                  <li>✓ Use standard resume format (PDF or Word)</li>
                  <li>✓ Apply to multiple related job titles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Download Box */}
          <Card className="p-8 bg-primary/5 border-primary/20 text-center">
            <h3 className="text-xl font-heading font-bold mb-2">Save Your ATS Kit</h3>
            <p className="text-muted-foreground mb-6">
              Copy all three sections above to keep your ATS optimization kit handy across applications.
            </p>
            <Button
              size="lg"
              onClick={() => {
                const all = `KEYWORDS:\n${keywordsText}\n\nJOB TITLES:\n${analysis.jobTitles.join("\n")}\n\nSUMMARY:\n${summaryText}`;
                copyToClipboard(all, "Complete ATS Kit");
              }}
              data-testid="button-copy-all"
            >
              Copy All to Clipboard
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

function getTitleDescription(title: string): string {
  const descriptions: Record<string, string> = {
    "Business Analyst":
      "Similar role combining data analysis with process improvement. Companies hiring for this often accept data analyst candidates.",
    "BI Developer (Business Intelligence Developer)":
      "Technical role focused on building BI solutions. Heavily overlaps with Data Analyst in mid-market companies.",
    "Data Engineer":
      "Pipeline and infrastructure focused. Good for entry-level if you emphasize ETL and data modeling skills.",
  };
  return descriptions[title] || "";
}
