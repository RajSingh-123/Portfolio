import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";
import { X } from "lucide-react";

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const hasDecided = localStorage.getItem("analytics_consent") !== null;
    if (!hasDecided) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    analytics.setConsent(true);
    setShowBanner(false);
  };

  const handleReject = () => {
    analytics.setConsent(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-muted-foreground/20 shadow-lg">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>🍪</span> Privacy & Analytics
            </h3>
            <p className="text-sm text-muted-foreground">
              We use lightweight, privacy-friendly analytics to understand how you use this portfolio. No personal data
              is collected or shared. You can review analytics data anytime in the admin panel.{" "}
              <a href="#" className="text-primary hover:underline" data-testid="link-privacy">
                Learn more
              </a>
            </p>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              data-testid="button-reject-consent"
            >
              Reject
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              data-testid="button-accept-consent"
              className="bg-primary hover:bg-primary/90"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
