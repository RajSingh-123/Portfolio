import { useState, useMemo } from "react";
import Layout from "@/components/layout";
import blogPosts from "@/data/blog.json";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Calendar, Clock, ChevronRight, Search, X } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { toast } from "sonner";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const handleSuggestTopic = () => {
    const subject = encodeURIComponent("Blog Topic Suggestion");
    const body = encodeURIComponent("Hi Raj,\n\nI'd like to suggest a blog topic:\n\n[Your suggestion here]\n\nThanks!");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
    toast.success("Opening Gmail with topic suggestion template!");
  };

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(blogPosts.map((post) => post.category)));
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
        {/* Header */}
        <div className="bg-muted/30 border-b py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-heading font-bold mb-4">Analytics Blog</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Deep dives into Power BI, SQL, data cleaning, and career tips for data analysts. Real
              projects, practical insights, actionable takeaways.
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="input-blog-search"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  data-testid="button-clear-search"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  !selectedCategory
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary"
                }`}
                data-testid="button-category-all"
              >
                All Posts
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary"
                  }`}
                  data-testid={`button-category-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="container mx-auto px-4 py-12">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => {
                const isExpanded = expandedPost === post.id;
                return (
                  <article
                    key={post.id}
                    className="bg-card border rounded-lg overflow-hidden hover:border-primary/50 transition-all group"
                    data-testid={`card-blog-post-${post.id}`}
                  >
                    <div className="p-6 md:p-8 space-y-4">
                      {/* Header */}
                      <div>
                        <div className="flex flex-wrap gap-2 mb-3 items-center">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime}
                          </span>
                        </div>
                        <h2 className="text-2xl font-heading font-bold group-hover:text-primary transition-colors mb-3">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                      </div>

                      {/* TL;DR Box */}
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm font-semibold text-primary mb-1">TL;DR:</p>
                        <p className="text-sm text-muted-foreground">{post.tldr}</p>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="pt-4 border-t">
                          <div className="prose dark:prose-invert max-w-none text-sm text-muted-foreground whitespace-pre-wrap">
                            {post.content}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-4">
                        <button
                          onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                          data-testid={`button-read-post-${post.id}`}
                        >
                          {isExpanded ? "Show Less" : "Read Full Post"}
                          <ChevronRight size={18} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-primary/5 border-y my-12">
          <div className="container mx-auto px-4 py-12 text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">More Content Coming</h2>
            <p className="text-muted-foreground mb-6">
              I regularly write about data analytics, career growth, and technical deep-dives.
            </p>
            <button
              onClick={handleSuggestTopic}
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              data-testid="button-suggest-topic"
            >
              Suggest a Topic
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
