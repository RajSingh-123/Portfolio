import { projects, personalInfo, skills, softSkills } from "@/data/portfolio";
import Fuse from "fuse.js";

export interface SearchItem {
  id: string;
  type: "project" | "skill" | "resume";
  title: string;
  description: string;
  tags: string[];
  href: string;
  icon?: string;
}

export const buildSearchIndex = (): SearchItem[] => {
  const items: SearchItem[] = [];

  // Index projects
  projects.forEach((project: any) => {
    items.push({
      id: project.id,
      type: "project",
      title: project.title,
      description: project.summary,
      tags: [...project.tech, project.type || "", project.status || ""].filter(Boolean),
      href: `/projects/${project.id}`,
      icon: "📊",
    });
  });

  // Index skills
  Object.entries(skills).forEach(([category, skillList]: [string, string[]]) => {
    skillList.forEach((skill: string) => {
      items.push({
        id: `skill-${skill}`,
        type: "skill",
        title: skill,
        description: `${category.replace(/([A-Z])/g, " $1").trim()} skill`,
        tags: [category, "skill"],
        href: "/about",
        icon: "🛠️",
      });
    });
  });

  // Index soft skills
  softSkills.forEach((skill: string) => {
    items.push({
      id: `soft-skill-${skill}`,
      type: "skill",
      title: skill,
      description: "Soft skill",
      tags: ["soft-skill", "skill"],
      href: "/about",
      icon: "💡",
    });
  });

  // Index resume bullets
  items.push({
    id: "resume-summary",
    type: "resume",
    title: "Professional Summary",
    description: personalInfo.bio,
    tags: ["resume", "about", "bio"],
    href: "/about",
    icon: "📄",
  });

  projects.forEach((project: any) => {
    items.push({
      id: `resume-${project.id}`,
      type: "resume",
      title: `${project.title} - Case Study`,
      description: project.narrative || project.summary,
      tags: ["resume", "project", ...project.tech],
      href: `/projects/${project.id}`,
      icon: "📋",
    });
  });

  return items;
};

export const initializeFuseSearch = (items: SearchItem[]) => {
  return new Fuse(items, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "description", weight: 0.3 },
      { name: "tags", weight: 0.3 },
    ] as any,
    threshold: 0.3,
    includeScore: true,
  });
};

export const searchItems = (
  query: string,
  fuse: Fuse<SearchItem>,
  filters?: { type?: string; tags?: string[] }
) => {
  let results = fuse.search(query).map((result: any) => result.item);

  if (filters?.type) {
    results = results.filter((item) => item.type === filters.type);
  }

  if (filters?.tags && filters.tags.length > 0) {
    results = results.filter((item) =>
      filters.tags!.some((tag) =>
        item.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
      )
    );
  }

  return results;
};

// Lazy initialization - prevents issues with circular dependencies
let _searchIndex: SearchItem[] | null = null;
let _fuseInstance: Fuse<SearchItem> | null = null;

export const getSearchIndex = () => {
  if (!_searchIndex) {
    _searchIndex = buildSearchIndex();
  }
  return _searchIndex;
};

export const getFuseInstance = () => {
  if (!_fuseInstance) {
    const index = getSearchIndex();
    _fuseInstance = initializeFuseSearch(index);
  }
  return _fuseInstance;
};
