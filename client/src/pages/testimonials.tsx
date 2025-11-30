import Layout from "@/components/layout";
import Testimonials from "@/components/testimonials";

export default function TestimonialsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
        {/* Header */}
        <div className="bg-muted/30 border-b py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-heading font-bold mb-4">Testimonials & Recommendations</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Kind words from managers, peers, and clients I've worked with. Plus templates to request testimonials
              from your own professional network.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <Testimonials />
        </div>
      </div>
    </Layout>
  );
}
