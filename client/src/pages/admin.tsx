import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { analytics } from "@/lib/analytics";
import { BarChart, Download, Eye, Trash2 } from "lucide-react";

interface Stats {
  pageviews: {
    total: number;
    last24h: number;
    last7d: number;
    last30d: number;
  };
  downloads: {
    total: number;
    last24h: number;
    last7d: number;
    last30d: number;
  };
  topPages: Array<{ path: string; count: number }>;
  topDownloads: Array<{ filename: string; count: number }>;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = analytics.hasConsent();
    setHasConsent(consent);
    if (consent) {
      setStats(analytics.getStats());
    }
  }, []);

  const handleClearData = () => {
    if (confirm("Are you sure? This will delete all analytics data.")) {
      analytics.clearAnalyticsData();
      setStats(analytics.getStats());
    }
  };

  const handleResetConsent = () => {
    analytics.clearConsent();
    setHasConsent(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-b from-background via-background to-primary/5">
        {/* Header */}
        <div className="bg-muted/30 border-b py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-heading font-bold mb-4 flex items-center gap-3">
              <BarChart size={32} />
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Lightweight, privacy-friendly analytics. No personal data collected.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 space-y-8">
          {/* Consent Status */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Consent Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Analytics Tracking</p>
                  <p className="text-sm font-medium mt-1">
                    {hasConsent ? (
                      <span className="text-green-600">✓ Enabled</span>
                    ) : (
                      <span className="text-yellow-600">⊗ Disabled</span>
                    )}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetConsent}
                  data-testid="button-reset-consent"
                >
                  Reset Consent
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Data is stored locally in your browser. No information is sent to external servers.
              </p>
            </div>
          </div>

          {hasConsent && stats ? (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pageviews Card */}
                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Eye size={20} />
                      Pageviews
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="font-bold text-lg">{stats.pageviews.total}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">Last 24h</p>
                        <p className="font-semibold">{stats.pageviews.last24h}</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">Last 7d</p>
                        <p className="font-semibold">{stats.pageviews.last7d}</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">Last 30d</p>
                        <p className="font-semibold">{stats.pageviews.last30d}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Downloads Card */}
                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Download size={20} />
                      Downloads
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="font-bold text-lg">{stats.downloads.total}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">Last 24h</p>
                        <p className="font-semibold">{stats.downloads.last24h}</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">Last 7d</p>
                        <p className="font-semibold">{stats.downloads.last7d}</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <p className="text-xs text-muted-foreground">Last 30d</p>
                        <p className="font-semibold">{stats.downloads.last30d}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Pages */}
              {stats.topPages.length > 0 && (
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
                  <div className="space-y-2">
                    {stats.topPages.map((page, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded"
                        data-testid={`row-top-page-${idx}`}
                      >
                        <span className="text-sm truncate flex-1">{page.path}</span>
                        <Badge variant="secondary" className="ml-2">
                          {page.count} views
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Downloads */}
              {stats.topDownloads.length > 0 && (
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Top Downloads</h3>
                  <div className="space-y-2">
                    {stats.topDownloads.map((download, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded"
                        data-testid={`row-top-download-${idx}`}
                      >
                        <span className="text-sm truncate flex-1">{download.filename}</span>
                        <Badge variant="secondary" className="ml-2">
                          {download.count} downloads
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Data State */}
              {stats.topPages.length === 0 && stats.topDownloads.length === 0 && (
                <div className="bg-muted/30 border border-dashed rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">No data yet. Start browsing to collect analytics.</p>
                </div>
              )}

              {/* Clear Data */}
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Trash2 size={20} className="text-destructive" />
                  Danger Zone
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Delete all collected analytics data from your local storage.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearData}
                  data-testid="button-clear-analytics"
                >
                  Clear All Data
                </Button>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-8">
              <h3 className="text-lg font-semibold mb-2">Analytics Disabled</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You haven't consented to analytics tracking. No data is being collected. Reset your consent to enable
                analytics.
              </p>
              <Button onClick={handleResetConsent} size="sm" data-testid="button-enable-analytics">
                Enable Analytics
              </Button>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h3 className="font-semibold mb-2">🔒 Privacy First</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ All data stored locally in your browser (localStorage)</li>
              <li>✓ No personal identifiable information collected</li>
              <li>✓ No third-party analytics services used</li>
              <li>✓ No data sent to external servers</li>
              <li>✓ You control your consent anytime</li>
              <li>✓ You can clear all data at any time</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
