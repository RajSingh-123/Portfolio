import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github } from "lucide-react";
import LinkedInConnectButton from "@/components/linkedin-connect-button";

interface ContactCTAProps {
  email?: string;
  linkedInUrl?: string;
  githubUrl?: string;
}

export default function ContactCTA({
  email = "contact@rajsingh.dev",
  linkedInUrl = "https://linkedin.com/in/rajsingh",
  githubUrl = "https://github.com/rajsingh-123",
}: ContactCTAProps) {
  return (
    <div className="flex flex-wrap gap-3" data-testid="group-contact-buttons">
      <LinkedInConnectButton
        name="Raj Singh"
        title="Data Analyst"
        variant="default"
        size="sm"
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => (window.location.href = `mailto:${email}`)}
        className="gap-2"
        data-testid="button-email-contact"
      >
        <Mail size={16} />
        Email
      </Button>

      <Button
        variant="outline"
        size="sm"
        asChild
        className="gap-2"
        data-testid="button-github-profile"
      >
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <Github size={16} />
          GitHub
        </a>
      </Button>
    </div>
  );
}
