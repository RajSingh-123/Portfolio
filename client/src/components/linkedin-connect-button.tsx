import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

interface LinkedInConnectButtonProps {
  name?: string;
  title?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function LinkedInConnectButton({
  name = "Raj Singh",
  title = "Data Analyst",
  variant = "default",
  size = "default",
  className = "",
}: LinkedInConnectButtonProps) {
  const handleLinkedInConnect = () => {
    const message = encodeURIComponent(
      `Hi ${name}! 👋 I'm impressed by your work in data analytics and your portfolio projects. I'd love to connect and learn more about your experience with Power BI, SQL, and Python. Looking forward to connecting!`
    );

    // LinkedIn message link format
    const linkedInUrl = `https://www.linkedin.com/messaging/compose/?message=${message}`;

    // Alternative: Direct profile link (if LinkedIn username is known)
    // For now, we'll use the messaging compose approach which works without a profile URL

    window.open(linkedInUrl, "_blank", "width=600,height=600");
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLinkedInConnect}
      className={`gap-2 ${className}`}
      data-testid="button-linkedin-connect"
    >
      <Linkedin size={16} />
      Connect on LinkedIn
    </Button>
  );
}
