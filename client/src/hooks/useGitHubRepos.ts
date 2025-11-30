import { useState, useEffect } from "react";

export interface GitHubRepo {
  id: number;
  name: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  updatedAt: string;
}

interface GitHubApiRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

const CACHE_KEY = "github_repos_cache";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function useGitHubRepos(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setRepos(data);
            setLoading(false);
            return;
          }
        }

        // Fetch from GitHub API
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=public`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data: GitHubApiRepo[] = await response.json();

        const formatted: GitHubRepo[] = data.map((repo) => ({
          id: repo.id,
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
          updatedAt: repo.updated_at,
        }));

        // Cache the data
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: formatted,
            timestamp: Date.now(),
          })
        );

        setRepos(formatted);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username]);

  return { repos, loading, error };
}
