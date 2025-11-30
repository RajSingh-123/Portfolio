import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SubmitTestimonial() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    rating: 5,
    text: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.company || !formData.text) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit testimonial");
      }

      toast({
        title: "Testimonial Submitted!",
        description: "Thank you! Your testimonial has been received and will be reviewed shortly.",
      });

      setSubmitted(true);
      setFormData({ name: "", role: "", company: "", rating: 5, text: "" });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center bg-primary/5 border-primary/20">
        <CheckCircle2 size={48} className="mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Your testimonial has been submitted successfully. I'll review and feature it on my portfolio soon.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-8 border-primary/20 bg-card">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
        <p className="text-muted-foreground">
          If Raj has worked with you or helped your team, we'd love to hear your feedback!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Your Name *
          </label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
            data-testid="input-testimonial-name"
          />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">
            Your Role/Title *
          </label>
          <Input
            id="role"
            name="role"
            placeholder="e.g., Senior Manager, Data Lead"
            value={formData.role}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
            data-testid="input-testimonial-role"
          />
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company/Organization *
          </label>
          <Input
            id="company"
            name="company"
            placeholder="Your Company Name"
            value={formData.company}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
            data-testid="input-testimonial-company"
          />
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label htmlFor="rating" className="text-sm font-medium">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
            data-testid="select-testimonial-rating"
          >
            <option value={5}>⭐⭐⭐⭐⭐ 5 Stars - Exceptional</option>
            <option value={4}>⭐⭐⭐⭐ 4 Stars - Very Good</option>
            <option value={3}>⭐⭐⭐ 3 Stars - Good</option>
          </select>
        </div>

        {/* Testimonial Text */}
        <div className="space-y-2">
          <label htmlFor="text" className="text-sm font-medium">
            Your Testimonial *
          </label>
          <Textarea
            id="text"
            name="text"
            placeholder="Share your experience working with Raj. What was the impact? What skills stood out? Be specific with metrics or outcomes if possible..."
            value={formData.text}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="min-h-[150px]"
            required
            data-testid="textarea-testimonial-text"
          />
          <p className="text-xs text-muted-foreground">
            Testimonials with specific metrics and outcomes are most impactful
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full gap-2 font-bold"
          disabled={isSubmitting}
          data-testid="button-submit-testimonial"
        >
          {isSubmitting ? "Submitting..." : <>Submit Testimonial <Send size={16} /></>}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your testimonial will be reviewed and featured on the portfolio upon approval.
        </p>
      </form>
    </Card>
  );
}
