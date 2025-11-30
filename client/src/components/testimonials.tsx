import { Star, CheckCircle2, Mail, Copy, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SubmitTestimonial from "./submit-testimonial";
import testimonialData from "@/data/testimonials.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"; // adjust path if your dialog is located elsewhere

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  verified: boolean;
  date: string;
  text: string;
}

export default function Testimonials() {
  const [copied, setCopied] = useState<string | null>(null);
  const [whyModalOpen, setWhyModalOpen] = useState(false);

  // IMPORTANT: keep this `false` while your JSON contains dummy testimonials.
  // When you replace the JSON with real testimonials, set this to `true`.
  const SHOW_EXISTING_TESTIMONIALS = false;

  // filter out testimonials if we are not showing existing (dummy) ones
  const testimonialsToShow: Testimonial[] = SHOW_EXISTING_TESTIMONIALS
    ? (testimonialData as Testimonial[])
    : [];

  const templates = [
    {
      id: "manager",
      title: "From Your Manager",
      icon: "👔",
      template: `Hi [Raj's Name],

I'd love to recommend you on your portfolio! I'd be happy to share a brief testimonial about your work.

Could you suggest a few key points about the [project name] project that you'd like me to highlight? For example:
- The specific business impact (e.g., 35% efficiency improvement)
- Technical approach you took (e.g., DAX formulas, SQL optimization)
- How you communicated findings to stakeholders
- Any collaboration highlights

Feel free to provide a rough outline or bullet points—I'll craft a personalized testimonial. You can include my role, company, and any specific metrics you'd like mentioned.

Thanks for all your great work!

Best,
[Your Name]`,
    },
    {
      id: "peer",
      title: "From a Peer/Colleague",
      icon: "🤝",
      template: `Hey Raj,

I'm building your professional portfolio and would love to include a testimonial from someone who's worked with you directly. Would you be open to sharing a quick note about:

- A project we collaborated on (and what stood out)
- Your technical strengths (coding, analysis, problem-solving)
- How you approach communication or documentation
- Any specific wins or metrics from working together

Even 3-4 sentences would be amazing! I can include your name, title, company, and link to your LinkedIn if you'd like. No pressure if you're busy—just let me know!

Thanks,
Raj`,
    },
    {
      id: "client",
      title: "From a Client/Stakeholder",
      icon: "💼",
      template: `Hi [Client Name],

I hope you're doing well! I'm currently developing my data analytics portfolio and would love to include your perspective on the work we did together on [project name].

A testimonial from your angle would be incredibly valuable—especially highlighting:
- The business challenge we solved
- How the insights/dashboard impacted your decision-making
- The working relationship and collaboration style
- Any quantified results (e.g., cost savings, efficiency gains, revenue impact)

Even 2-3 sentences about what value it brought to your team would be fantastic. I can include your name, title, company, and can even make it anonymous if you prefer.

Would you be open to sharing a quick testimonial? Happy to chat by phone if that's easier!

Thanks so much,
Raj`,
    },
  ];

  const copyToClipboard = (text: string, templateId: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(templateId);
      setTimeout(() => setCopied(null), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div className="space-y-12">
      {/* Testimonials Display */}
      <div>
        <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-3">
          <span>⭐</span> Testimonials
        </h2>

        {/* If no testimonials, show empty state */}
        {testimonialsToShow.length === 0 ? (
          <div className="bg-card border rounded-lg p-8 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">No testimonials yet — collecting real feedback</h3>
            <p className="text-muted-foreground mb-4">
              I'm currently gathering testimonials from colleagues, mentors, and clients. This page is intentionally left
              empty until I can share real, verified feedback. Fake reviews damage credibility — so real ones only.
            </p>

            <div className="flex flex-col md:flex-row gap-3">
              <Button
                variant="default"
                onClick={() => {
                  const el = document.getElementById("testimonial-templates");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Use Request Templates
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  const el = document.getElementById("submit-testimonial-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Submit a Testimonial
              </Button>

              {/* Replaced alert with modal trigger */}
              <Dialog open={whyModalOpen} onOpenChange={setWhyModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost">Why no testimonials?</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Why There Are No Testimonials Yet</DialogTitle>
                    <DialogDescription>
                      <p className="mb-2">
                        I believe real testimonials should come from real managers, peers, or clients who have genuinely
                        worked with me.
                      </p>
                      <p className="mb-2">
                        Instead of adding dummy or AI-generated reviews, I’m choosing to keep this section authentic. I’m
                        currently collecting real feedback through the request templates below.
                      </p>
                      <p>
                        Once I receive verified testimonials, they’ll be displayed here to reflect real work, collaboration,
                        and measurable impact.
                      </p>
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setWhyModalOpen(false)}>
                      Close
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        onClick={() => {
                          const el = document.getElementById("testimonial-templates");
                          el?.scrollIntoView({ behavior: "smooth" });
                          setWhyModalOpen(false);
                        }}
                      >
                        See Request Templates
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsToShow.map((testimonial: Testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border rounded-lg p-6 hover:border-primary/50 transition-all shadow-sm"
                data-testid={`card-testimonial-${testimonial.id}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                      {testimonial.verified && (
                        <CheckCircle2 size={16} className="text-primary" data-testid="badge-verified" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                  <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full" loading="lazy" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{testimonial.text}"</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <Badge variant="outline" className="text-xs">
                    {new Date(testimonial.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </Badge>
                  {testimonial.verified && (
                    <span className="text-xs text-primary font-medium flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Templates */}
      <div id="testimonial-templates">
        <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-3">
          <span>📝</span> Request Templates
        </h2>
        <p className="text-muted-foreground mb-6">
          Copy any of these templates to request testimonials from managers, peers, or clients. Personalize as needed!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-card border rounded-lg overflow-hidden"
              data-testid={`card-template-${template.id}`}
            >
              {/* Header */}
              <div className="bg-primary/5 border-b p-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>{template.icon}</span>
                  {template.title}
                </h3>
              </div>

              {/* Template Text */}
              <div className="p-4 space-y-4">
                <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
                  {template.template}
                </pre>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => copyToClipboard(template.template, template.id)}
                    className="flex-1 gap-2"
                    data-testid={`button-copy-template-${template.id}`}
                  >
                    <Copy size={14} />
                    {copied === template.id ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const subject = encodeURIComponent("Testimonial Request for My Portfolio");
                      const body = encodeURIComponent(template.template);
                      window.open(`mailto:?subject=${subject}&body=${body}`);
                    }}
                    className="flex-1 gap-2"
                    data-testid={`button-email-template-${template.id}`}
                  >
                    <Mail size={14} />
                    Email
                  </Button>
                </div>

                {/* Tips */}
                <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  <p className="font-semibold mb-1">💡 Tips:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    {template.id === "manager" && (
                      <>
                        <li>Be specific about projects</li>
                        <li>Suggest 3-4 talking points</li>
                        <li>Ask for metrics when possible</li>
                      </>
                    )}
                    {template.id === "peer" && (
                      <>
                        <li>Keep it casual but professional</li>
                        <li>Mention specific collaboration</li>
                        <li>Ask for 3-4 sentences minimum</li>
                      </>
                    )}
                    {template.id === "client" && (
                      <>
                        <li>Focus on business impact</li>
                        <li>Offer anonymity if needed</li>
                        <li>Ask about quantified results</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Your Own Testimonial Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-3">
          <span>💬</span> Share Your Experience
        </h2>
        {/* add id so CTA can jump to this form */}
        <div id="submit-testimonial-form">
          <SubmitTestimonial />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center mt-12">
        <h3 className="text-2xl font-heading font-bold mb-3">Ready to Collect Testimonials?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Testimonials from managers, peers, and clients add credibility to your portfolio. Personalize these templates,
          send them out, and we'll add the responses to showcase your impact.
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => {
            const element = document.getElementById("testimonial-templates");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
          data-testid="button-get-started-testimonials"
        >
          Start Requesting
        </Button>
      </div>
    </div>
  );
}
