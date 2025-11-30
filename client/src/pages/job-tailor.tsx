import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Zap } from "lucide-react";
import { useState } from "react";
import { tailorContentToJobDescription } from "@/lib/jobTailor";
import { useToast } from "@/hooks/use-toast";

interface TailoredContent {
  coverLetter: string;
  bulletPoints: string[];
  linkedInMessage: string;
  resumeRecommendations: {
    requiredSkills: string[];
    optionalSkills: string[];
    experienceHighlights: string[];
    certificationsToAdd: string[];
  };
}

export default function JobTailorPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [tailored, setTailored] = useState<TailoredContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTailor = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Empty Job Description",
        description: "Please paste a job description to get started.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = tailorContentToJobDescription(jobDescription);
    setTailored(result);
    setLoading(false);

    toast({
      title: "Content Generated!",
      description: "Your tailored materials are ready to use.",
    });
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
    toast({
      title: "Copied!",
      description: `${section} copied to clipboard.`,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
        {/* Header */}
        <div className="bg-muted/30 border-b py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-heading font-bold mb-4 flex items-center gap-3">
              <Zap size={32} />
              Job Application Tailorer
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Paste a job description and instantly get a tailored cover letter, resume bullets, and LinkedIn message.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div>
              <div className="bg-card border rounded-lg p-6 space-y-4 sticky top-20">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Job Description</label>
                  <Textarea
                    placeholder="Paste the job description here... Include job title, company, responsibilities, and required skills."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-96 resize-none"
                    data-testid="textarea-job-description"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleTailor}
                    disabled={loading || !jobDescription.trim()}
                    className="flex-1 gap-2"
                    data-testid="button-tailor-content"
                  >
                    <Zap size={16} />
                    {loading ? "Generating..." : "Tailor Content"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setJobDescription("");
                      setTailored(null);
                    }}
                    data-testid="button-clear-jd"
                  >
                    Clear
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
                  💡 <strong>Tip:</strong> Include job title, company name, key responsibilities, and required skills for better tailoring.
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              {tailored ? (
                <>
                  {/* Cover Letter */}
                  <Card className="p-6" data-testid="card-cover-letter">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        📄 Cover Letter
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(tailored.coverLetter, "Cover Letter")}
                        data-testid="button-copy-cover-letter"
                      >
                        {copied === "Cover Letter" ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {tailored.coverLetter}
                    </div>
                    <Badge variant="outline" className="mt-4">
                      {tailored.coverLetter.split(" ").length} words
                    </Badge>
                  </Card>

                  {/* Resume Bullets */}
                  <Card className="p-6" data-testid="card-bullets">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        ✨ Resume Bullets
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(tailored.bulletPoints.join("\n\n"), "Resume Bullets")
                        }
                        data-testid="button-copy-bullets"
                      >
                        {copied === "Resume Bullets" ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {tailored.bulletPoints.map((bullet, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 text-sm"
                          data-testid={`bullet-${idx}`}
                        >
                          <span className="text-primary font-bold flex-shrink-0">•</span>
                          <p className="text-muted-foreground">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* LinkedIn Message */}
                  <Card className="p-6" data-testid="card-linkedin">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        💼 LinkedIn Message
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(tailored.linkedInMessage, "LinkedIn Message")}
                        data-testid="button-copy-linkedin"
                      >
                        {copied === "LinkedIn Message" ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed bg-muted/20 p-3 rounded">
                      {tailored.linkedInMessage}
                    </div>
                  </Card>

                  {/* Resume Recommendations */}
                  <Card className="p-6" data-testid="card-resume-recommendations">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                      📋 Resume Recommendations
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Required Skills */}
                      <div>
                        <p className="text-sm font-semibold text-primary mb-2">✓ Skills to Highlight:</p>
                        <div className="flex flex-wrap gap-2">
                          {tailored.resumeRecommendations.requiredSkills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="capitalize">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Experience Highlights */}
                      <div>
                        <p className="text-sm font-semibold text-primary mb-2">💡 Experience to Add:</p>
                        <ul className="space-y-1">
                          {tailored.resumeRecommendations.experienceHighlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-primary">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Certifications */}
                      {tailored.resumeRecommendations.certificationsToAdd.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-primary mb-2">🎓 Certifications to Consider:</p>
                          <ul className="space-y-1">
                            {tailored.resumeRecommendations.certificationsToAdd.map((cert, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-primary">•</span>
                                <span>{cert}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Optional Skills */}
                      <div>
                        <p className="text-sm font-semibold text-primary mb-2">⭐ Soft Skills to Emphasize:</p>
                        <div className="flex flex-wrap gap-2">
                          {tailored.resumeRecommendations.optionalSkills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Zap size={32} className="mx-auto mb-4 opacity-50" />
                  <p>Paste a job description and click "Tailor Content" to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="font-semibold mb-2">🎯 How It Works</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                ✓ <strong>Analyzes</strong> the job description to extract key skills and responsibilities
              </li>
              <li>
                ✓ <strong>Generates</strong> a tailored cover letter with your most relevant experience matching the role
              </li>
              <li>
                ✓ <strong>Creates</strong> resume bullets highlighting measurable impact using job-specific language
              </li>
              <li>
                ✓ <strong>Suggests</strong> resume changes including skills to highlight, experience to add, and relevant certifications
              </li>
              <li>
                ✓ <strong>Crafts</strong> a professional LinkedIn outreach message for the hiring manager
              </li>
              <li>✓ <strong>One-click copy</strong> to clipboard for instant use</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
