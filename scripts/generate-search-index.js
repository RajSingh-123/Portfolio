#!/usr/bin/env node

/**
 * Build Script: Generate Search Index
 * 
 * This script reads the portfolio data and generates a search index
 * for use with Fuse.js on the client side.
 * 
 * Usage: node scripts/generate-search-index.js
 */

const fs = require("fs");
const path = require("path");

// Mock the portfolio data (in a real app, you'd import the actual TypeScript)
const portfolioData = {
  projects: [
    {
      id: "hr-attrition",
      title: "HR Attrition & Retention Dashboard",
      type: "Dashboard",
      status: "Live",
      summary: "Interactive Power BI dashboard integrating SQL data to improve HR reporting efficiency by 35%.",
      tech: ["Power BI", "SQL", "DAX", "Data Modeling"],
    },
    {
      id: "netflix-analytics",
      title: "Netflix Viewing Behavior Analytics",
      type: "Dashboard",
      status: "Live",
      summary: "Analyzed 5000+ records to uncover content preferences, boosting recommendation accuracy potential by 20%.",
      tech: ["Power BI", "DAX", "Data Viz", "Storytelling"],
    },
    {
      id: "adidas-sales",
      title: "Adidas Shoe Sales Analysis",
      type: "EDA",
      status: "Live",
      summary: "Python-based EDA of 100K+ transactions to identify seasonal trends and improve forecast accuracy by 15%.",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    },
    {
      id: "course-engagement",
      title: "Online Course Engagement Dashboard",
      type: "ETL",
      status: "Incomplete",
      summary: "Excel & PostgreSQL solution for real-time student tracking, reducing manual processing by 50%.",
      tech: ["Excel", "PostgreSQL", "Power Query", "ETL"],
    },
    {
      id: "ecommerce-segmentation",
      title: "E-commerce Customer Segmentation",
      type: "EDA",
      status: "Live",
      summary: "RFM Analysis using SQL and Python to identify high-value customer segments for targeted marketing.",
      tech: ["SQL", "Python", "RFM Analysis", "Clustering"],
    },
  ],
  skills: {
    languages: ["Python (Pandas, NumPy)", "SQL (MySQL, PostgreSQL)", "DAX"],
    visualization: ["Power BI", "Tableau", "Matplotlib", "Seaborn"],
    tools: ["Excel (Power Query)", "Git/GitHub", "AWS (S3, Redshift)", "Jupyter"],
    competencies: ["Data Modeling", "ETL Workflows", "EDA", "KPI Tracking"],
  },
  softSkills: [
    "Analytical Thinking",
    "Problem-Solving",
    "Data Storytelling",
    "Collaboration",
    "Attention to Detail",
    "Communication",
  ],
};

// Build search index
function buildSearchIndex() {
  const items = [];

  // Index projects
  portfolioData.projects.forEach((project) => {
    items.push({
      id: project.id,
      type: "project",
      title: project.title,
      description: project.summary,
      tags: [...project.tech, project.type || "", project.status || ""],
      href: `/projects/${project.id}`,
      icon: "📊",
    });
  });

  // Index skills
  Object.entries(portfolioData.skills).forEach(([category, skillList]) => {
    skillList.forEach((skill) => {
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
  portfolioData.softSkills.forEach((skill) => {
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

  return items;
}

// Generate the index
const searchIndex = buildSearchIndex();

// Write to public directory for potential static generation
const outputPath = path.join(__dirname, "../client/public/search-index.json");
const outputDir = path.dirname(outputPath);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2), "utf-8");

console.log(`✅ Search index generated successfully!`);
console.log(`📄 Location: ${outputPath}`);
console.log(`📊 Total items indexed: ${searchIndex.length}`);
console.log(`📈 Breakdown:`);
console.log(`   - Projects: ${searchIndex.filter((i) => i.type === "project").length}`);
console.log(`   - Skills: ${searchIndex.filter((i) => i.type === "skill").length}`);

// Log sample
console.log(`\n📌 Sample indexed items:`);
searchIndex.slice(0, 3).forEach((item) => {
  console.log(`   - [${item.type.toUpperCase()}] ${item.title}`);
});
