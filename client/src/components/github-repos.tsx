import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, Calendar } from "lucide-react";

interface GitHubReposProps {
  username: string;
  limit?: number;
}

export default function GitHubRepos({ username, limit = 6 }: GitHubReposProps) {
  const { repos, loading, error } = useGitHubRepos(username);

  const displayRepos = repos.slice(0, limit);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 text-sm text-destructive">
        Failed to load repositories: {error}
      </div>
    );
  }

  if (displayRepos.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No public repositories found.
      </div>
    );
  }

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      JavaScript: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      Python: "bg-green-500/10 text-green-700 dark:text-green-400",
      SQL: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      HTML: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
      CSS: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
      Java: "bg-red-500/10 text-red-700 dark:text-red-400",
      Go: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
      Rust: "bg-orange-600/10 text-orange-700 dark:text-orange-400",
    };
    return colors[language || "Unknown"] || "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="grid-github-repos">
      {displayRepos.map((repo) => (
        <a
          key={repo.id}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all group"
          data-testid={`card-repo-${repo.name}`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                {repo.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              <Star size={14} className="text-yellow-500" />
              <span className="text-xs font-medium">{repo.stars}</span>
            </div>
          </div>

          {/* Description */}
          {repo.description && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {repo.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-2">
              {repo.language && (
                <Badge variant="outline" className={`text-xs ${getLanguageColor(repo.language)}`}>
                  {repo.language}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              <span>{new Date(repo.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
