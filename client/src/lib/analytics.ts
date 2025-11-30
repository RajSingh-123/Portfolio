interface PageviewEvent {
  timestamp: number;
  path: string;
  referrer: string;
  userAgent: string;
}

interface AnalyticsData {
  pageviews: PageviewEvent[];
  downloads: Array<{
    timestamp: number;
    filename: string;
  }>;
}

const ANALYTICS_STORAGE_KEY = "analytics_data";
const CONSENT_STORAGE_KEY = "analytics_consent";

export const analytics = {
  hasConsent(): boolean {
    if (typeof window === "undefined") return false;
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    return consent === "true";
  },

  setConsent(value: boolean): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(CONSENT_STORAGE_KEY, value.toString());
  },

  trackPageview(path: string): void {
    if (!this.hasConsent()) return;

    const data = this.getAnalyticsData();
    data.pageviews.push({
      timestamp: Date.now(),
      path,
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
    });

    // Keep last 1000 pageviews
    if (data.pageviews.length > 1000) {
      data.pageviews = data.pageviews.slice(-1000);
    }

    this.saveAnalyticsData(data);
  },

  trackDownload(filename: string): void {
    if (!this.hasConsent()) return;

    const data = this.getAnalyticsData();
    data.downloads.push({
      timestamp: Date.now(),
      filename,
    });

    // Keep last 500 downloads
    if (data.downloads.length > 500) {
      data.downloads = data.downloads.slice(-500);
    }

    this.saveAnalyticsData(data);
  },

  getAnalyticsData(): AnalyticsData {
    if (typeof window === "undefined") {
      return { pageviews: [], downloads: [] };
    }

    try {
      const data = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      return data ? JSON.parse(data) : { pageviews: [], downloads: [] };
    } catch {
      return { pageviews: [], downloads: [] };
    }
  },

  saveAnalyticsData(data: AnalyticsData): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
    } catch {
      console.warn("Failed to save analytics data");
    }
  },

  clearAnalyticsData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ANALYTICS_STORAGE_KEY);
  },

  clearConsent(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  },

  getStats() {
    const data = this.getAnalyticsData();
    const now = Date.now();
    const last24h = now - 24 * 60 * 60 * 1000;
    const last7d = now - 7 * 24 * 60 * 60 * 1000;
    const last30d = now - 30 * 24 * 60 * 60 * 1000;

    const pageviewsLast24h = data.pageviews.filter((pv) => pv.timestamp > last24h).length;
    const pageviewsLast7d = data.pageviews.filter((pv) => pv.timestamp > last7d).length;
    const pageviewsLast30d = data.pageviews.filter((pv) => pv.timestamp > last30d).length;

    const downloadsLast24h = data.downloads.filter((d) => d.timestamp > last24h).length;
    const downloadsLast7d = data.downloads.filter((d) => d.timestamp > last7d).length;
    const downloadsLast30d = data.downloads.filter((d) => d.timestamp > last30d).length;

    // Get top pages
    const pageCount: Record<string, number> = {};
    data.pageviews.forEach((pv) => {
      pageCount[pv.path] = (pageCount[pv.path] || 0) + 1;
    });
    const topPages = Object.entries(pageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    // Get top downloads
    const downloadCount: Record<string, number> = {};
    data.downloads.forEach((d) => {
      downloadCount[d.filename] = (downloadCount[d.filename] || 0) + 1;
    });
    const topDownloads = Object.entries(downloadCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([filename, count]) => ({ filename, count }));

    return {
      pageviews: {
        total: data.pageviews.length,
        last24h: pageviewsLast24h,
        last7d: pageviewsLast7d,
        last30d: pageviewsLast30d,
      },
      downloads: {
        total: data.downloads.length,
        last24h: downloadsLast24h,
        last7d: downloadsLast7d,
        last30d: downloadsLast30d,
      },
      topPages,
      topDownloads,
    };
  },
};
