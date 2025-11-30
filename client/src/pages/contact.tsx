import Layout from "@/components/layout";
import { personalInfo } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github, Send, Copy, Check, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import LinkedInConnectButton from "@/components/linkedin-connect-button";
import ContactCTA from "@/components/contact-cta";

export default function Contact() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Email copied!",
      description: "Address copied to clipboard.",
    });
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(personalInfo.emailTemplate);
    toast({
      title: "Template copied!",
      description: "Email template copied to clipboard.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Layout>
      <div className="container px-4 mx-auto py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-heading font-bold mb-6">Let's Connect</h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                I'm currently looking for entry-level opportunities in Data Analytics and BI Reporting. 
                If you have an open role or just want to discuss data, I'd love to hear from you.
              </p>
            </div>
            
            <div className="space-y-4">
              <Card className="p-4 flex items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer" onClick={handleCopyEmail}>
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-semibold">{personalInfo.email}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </Button>
              </Card>

              <div>
                <Card className="p-4 flex items-center gap-4 hover:border-primary/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Linkedin size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                    <p className="font-semibold">{personalInfo.linkedin}</p>
                  </div>
                </Card>
              </div>

              <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer">
                <Card className="p-4 flex items-center gap-4 hover:border-primary/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center">
                    <Github size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">GitHub</p>
                    <p className="font-semibold">View Code Repositories</p>
                  </div>
                </Card>
              </a>
            </div>

            {/* Email Template for Recruiters */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Recruiter Quick-Email Template</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleCopyTemplate}>
                  <Copy size={14} className="mr-1" /> Copy
                </Button>
              </div>
              <div className="bg-muted/30 p-4 rounded-xl border text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap h-32 overflow-y-auto">
                {personalInfo.emailTemplate}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-muted/20 rounded-2xl p-8 border h-fit">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input 
                  id="name" 
                  placeholder="Recruiter Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required 
                  data-testid="input-name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="recruiter@company.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required 
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Hi Raj, I reviewed your portfolio and would like to discuss a Data Analyst role..." 
                  className="min-h-[150px]"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required 
                  data-testid="textarea-message"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full gap-2 font-bold"
                disabled={isSubmitting}
                data-testid="button-send-message"
              >
                {isSubmitting ? "Sending..." : <>Send Message <Send size={16} /></>}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
}
