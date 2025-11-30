/**
 * ProjectCard Component - Usage Examples
 * 
 * This file demonstrates how to use the reusable ProjectCard component
 * with various configurations and feature combinations.
 */

import ProjectCard from "./project-card";
import { useState } from "react";

/**
 * Example 1: Basic Project Card
 * Minimal props - just the essentials
 */
export function BasicProjectCardExample() {
  return (
    <ProjectCard
      title="Sales Dashboard"
      shortDesc="Interactive dashboard for real-time sales metrics"
      stack={["React", "TypeScript", "Tailwind"]}
      image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400"
    />
  );
}

/**
 * Example 2: Full-Featured Project Card
 * All props populated for maximum visual impact
 */
export function FullProjectCardExample() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <ProjectCard
        id="hr-analytics"
        title="HR Attrition & Retention Dashboard"
        shortDesc="Interactive Power BI dashboard analyzing employee attrition patterns and retention strategies"
        stack={["Power BI", "SQL", "DAX", "Data Modeling"]}
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400"
        repoUrl="https://github.com/user/hr-analytics"
        demoUrl="https://app.powerbi.com/view"
        tags={["Dashboard", "Real-time", "HR Analytics"]}
        stars={42}
        type="Dashboard"
        status="Live"
        onExpand={() => setIsExpanded(true)}
      />
      {isExpanded && <p className="text-sm text-muted-foreground">Modal would open here</p>}
    </div>
  );
}

/**
 * Example 3: Research/Incomplete Project
 * Shows status badge styling for different states
 */
export function IncompleteProjectCardExample() {
  return (
    <ProjectCard
      title="Customer Churn Prediction Model"
      shortDesc="Machine learning model predicting customer churn probability using historical data"
      stack={["Python", "Scikit-Learn", "Pandas", "Jupyter"]}
      image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400"
      tags={["ML", "Predictive Analytics"]}
      stars={28}
      type="EDA"
      status="Incomplete"
      repoUrl="https://github.com/user/churn-prediction"
    />
  );
}

/**
 * Example 4: Data Engineering Project
 * ETL workflow showcase with technical focus
 */
export function ETLProjectCardExample() {
  return (
    <ProjectCard
      title="Real-time Data Pipeline"
      shortDesc="Automated ETL pipeline processing 1M+ records daily from multiple sources"
      stack={["Python", "Apache Airflow", "PostgreSQL", "AWS S3"]}
      image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400"
      tags={["ETL", "Cloud", "Scalable"]}
      type="ETL"
      status="Live"
      repoUrl="https://github.com/user/data-pipeline"
      demoUrl="https://dashboard.example.com"
    />
  );
}

/**
 * Example 5: Multiple Cards in Grid
 * Realistic layout showing cards in a responsive grid
 */
export function ProjectGridExample() {
  const projects = [
    {
      title: "E-commerce Analytics",
      shortDesc: "Customer segmentation and RFM analysis for targeted marketing",
      stack: ["SQL", "Python", "Tableau"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f70504c8a?w=500&h=400",
      tags: ["Analytics", "Segmentation"],
      stars: 35,
      type: "Dashboard",
      status: "Live",
    },
    {
      title: "Supply Chain Optimization",
      shortDesc: "Inventory forecasting and demand planning dashboard",
      stack: ["Power BI", "SQL Server", "Excel"],
      image: "https://images.unsplash.com/photo-1434494694125-20a7ee215dd7?w=500&h=400",
      tags: ["Optimization", "Forecasting"],
      stars: 28,
      type: "Dashboard",
      status: "Live",
    },
    {
      title: "Customer Insights Platform",
      shortDesc: "Behavioral analytics and predictive modeling engine",
      stack: ["Python", "PySpark", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1516534775068-bb57ad1476b2?w=500&h=400",
      tags: ["ML", "Insights"],
      type: "EDA",
      status: "Incomplete",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          title={project.title}
          shortDesc={project.shortDesc}
          stack={project.stack}
          image={project.image}
          tags={project.tags}
          stars={project.stars}
          type={project.type}
          status={project.status}
        />
      ))}
    </div>
  );
}

/**
 * Example 6: With Click Handlers
 * Demonstrates interactivity with expand functionality
 */
export function InteractiveProjectCardExample() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    {
      id: "project-1",
      title: "Sales Forecasting",
      shortDesc: "Time-series analysis for quarterly revenue prediction",
      stack: ["Python", "Statsmodels", "NumPy"],
      image: "https://images.unsplash.com/photo-1551737904-11002b6b0b3e?w=500&h=400",
      tags: ["Forecasting"],
      stars: 52,
    },
    {
      id: "project-2",
      title: "Website Analytics",
      shortDesc: "User behavior tracking and conversion funnel analysis",
      stack: ["Google Analytics", "Tableau", "SQL"],
      image: "https://images.unsplash.com/photo-1507238691515-188a1d3d070c?w=500&h=400",
      tags: ["Analytics", "Conversion"],
      stars: 31,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            shortDesc={project.shortDesc}
            stack={project.stack}
            image={project.image}
            tags={project.tags}
            stars={project.stars}
            onExpand={() => setSelectedProject(project.id)}
          />
        ))}
      </div>
      {selectedProject && (
        <div className="p-4 bg-primary/10 border rounded-lg">
          <p>Selected: {selectedProject}</p>
          <button onClick={() => setSelectedProject(null)}>Clear</button>
        </div>
      )}
    </div>
  );
}
