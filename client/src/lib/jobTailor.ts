interface TailoredContent {
  coverLetter: string;
  bulletPoints: string[];
  linkedInMessage: string;
  resumeRecommendations: {
    requiredSkills: string[];
    optionalSkills: string[];
    experienceHighlights: string[];
    certificationsToAdd: string[];
  };
}

const SKILLS_DATA = {
  technical: ["SQL (MySQL, PostgreSQL)", "Python (Pandas, NumPy)", "Power BI", "DAX", "Excel (Power Query)", "Tableau", "Data Modeling", "ETL Workflows"],
  keywords: ["dashboard", "analytics", "data analysis", "reporting", "automation", "insights", "metrics", "KPI", "SQL", "Python", "Power BI", "ETL", "business intelligence"]
};

export function tailorContentToJobDescription(jobDescription: string): TailoredContent {
  const jdLower = jobDescription.toLowerCase();
  
  // Extract key requirements and responsibilities
  const extractedSkills = extractRelevantSkills(jdLower);
  const jobTitle = extractJobTitle(jdLower);
  const company = extractCompany(jdLower);

  const coverLetter = generateCoverLetter(jobDescription, extractedSkills, jobTitle, company);
  const bulletPoints = generateBulletPoints(extractedSkills, jobDescription);
  const linkedInMessage = generateLinkedInMessage(jobTitle, extractedSkills);
  const resumeRecommendations = generateResumeRecommendations(jobDescription, extractedSkills, jobTitle);

  return {
    coverLetter,
    bulletPoints,
    linkedInMessage,
    resumeRecommendations
  };
}

function extractJobTitle(jd: string): string {
  // Try to find common job titles
  const titlePatterns = [
    /(?:looking for|seeking|we're hiring|hiring for|position|role).*?(?:is|:)?\s+a?\s*(.+?)(?:\.|,|to|with|who)/i,
    /^# (.+?)(?:\n|$)/i,
    /(?:position|role).*?(?:is|:)?\s+(.+?)(?:\.|,|for|at|in|to)/i,
  ];

  for (const pattern of titlePatterns) {
    const match = jd.match(pattern);
    if (match && match[1]?.trim().length < 50 && match[1]?.trim().length > 2) {
      return match[1].trim();
    }
  }
  return "Data Analyst";
}

function extractCompany(jd: string): string {
  const companyPatterns = [
    /(?:company|at|for)\s+(.+?)(?:\.|,|\n)/i,
    /^.+?(?:at|for)\s+(.+?)(?:\s|$)/i
  ];

  for (const pattern of companyPatterns) {
    const match = jd.match(pattern);
    if (match && match[1]?.trim().length < 50 && match[1]?.trim().length > 2) {
      return match[1].trim();
    }
  }
  return "your organization";
}

function extractRelevantSkills(jd: string): string[] {
  const foundSkills: string[] = [];
  const skillKeywords = [
    "sql", "python", "power bi", "tableau", "excel", "vba", "r programming",
    "data visualization", "etl", "data modeling", "reporting", "business intelligence",
    "database", "analytics", "aws", "gcp", "azure", "git", "jupyter", "pandas", "numpy",
    "dash", "looker", "qlik", "dax", "query", "statistical analysis"
  ];

  skillKeywords.forEach(skill => {
    if (jd.includes(skill)) {
      foundSkills.push(skill);
    }
  });

  return foundSkills.slice(0, 5); // Top 5
}

function generateCoverLetter(jd: string, skills: string[], jobTitle: string, company: string): string {
  const skillsText = skills.length > 0 
    ? skills.slice(0, 3).join(", ")
    : "SQL, Power BI, and Python";

  const responsibilities = extractKeyResponsibilities(jd);
  const responsibilitiesText = responsibilities.length > 0 
    ? responsibilities[0]
    : "driving data-driven decision making";

  // Determine what type of role this is to tailor the opening
  let roleSpecificIntro = "data analytics and business intelligence";
  if (jobTitle.toLowerCase().includes("engineer")) {
    roleSpecificIntro = "data engineering and ETL pipeline development";
  } else if (jobTitle.toLowerCase().includes("scientist")) {
    roleSpecificIntro = "advanced analytics and machine learning";
  } else if (jobTitle.toLowerCase().includes("bi")) {
    roleSpecificIntro = "business intelligence and data visualization";
  } else if (jobTitle.toLowerCase().includes("analyst")) {
    roleSpecificIntro = "data analysis and strategic insights";
  }

  const template = `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${company}. With hands-on experience in ${roleSpecificIntro} and a proven track record of transforming complex datasets into actionable insights, I am confident I can contribute immediately to your team.

My technical expertise spans ${skillsText}, enabling me to ${getResponseibilityAction(responsibilitiesText)}. In my recent projects, I've successfully improved reporting efficiency by 35% through optimized SQL queries and interactive dashboards, and increased forecast accuracy by 15% through rigorous exploratory data analysis.

Your job description particularly resonates with me, as the focus on ${responsibilitiesText} aligns perfectly with my passion for solving business problems through data. I excel at translating technical findings into clear narratives for non-technical stakeholders, ensuring data-driven decisions drive organizational success.

I am excited about the opportunity to bring my analytical rigor, technical skillset, and collaborative approach to your organization. I would welcome the chance to discuss how my experience can support ${company}'s goals and team objectives.

Best regards,
Raj Singh`;

  return template;
}

function getResponseibilityAction(responsibility: string): string {
  if (responsibility.includes("report") || responsibility.includes("dashboard")) {
    return "build automated dashboards and reports that drive faster decision-making";
  } else if (responsibility.includes("pipeline") || responsibility.includes("etl")) {
    return "design and optimize data pipelines and ETL workflows";
  } else if (responsibility.includes("analysis") || responsibility.includes("insight")) {
    return "deliver actionable insights from complex data analysis";
  } else if (responsibility.includes("model")) {
    return "develop data models that support business strategy";
  } else {
    return "deliver measurable business impact through data-driven solutions";
  }
}

function generateBulletPoints(skills: string[], jd: string): string[] {
  const jdLower = jd.toLowerCase();
  const responsibilities = extractKeyResponsibilities(jdLower);
  const skillsText = skills.length > 0 ? skills.slice(0, 2).join(" and ") : "SQL and Power BI";

  const bullets: string[] = [];

  // Bullet 1: Dashboard/Analysis/BI focused
  if (jdLower.includes("dashboard") || jdLower.includes("report") || jdLower.includes("visualization")) {
    bullets.push(
      `Developed and maintained interactive ${skills[0] || "Power BI"} dashboards analyzing 50K+ records, enabling stakeholders to identify trends and make data-backed decisions 35% faster than manual reporting methods`
    );
  } else if (jdLower.includes("engineer")) {
    bullets.push(
      `Designed and deployed scalable data pipelines using ${skillsText} to process 100M+ records daily, reducing data latency by 60% and improving downstream analytics reliability`
    );
  } else {
    bullets.push(
      `Built ${skillsText} analytics solution that consolidated data from multiple sources, reducing reporting time by 40% and improving decision velocity across the organization`
    );
  }

  // Bullet 2: SQL/Data Processing/ETL
  if (jdLower.includes("sql") || jdLower.includes("database") || jdLower.includes("query")) {
    bullets.push(
      `Optimized complex ${skills.includes("sql") ? "SQL" : "database"} queries and data models to process multi-million row datasets, improving query performance by 50% and enabling real-time reporting capabilities for key stakeholders`
    );
  } else if (jdLower.includes("etl") || jdLower.includes("pipeline")) {
    bullets.push(
      `Designed and implemented ETL workflows using ${skillsText} to clean, transform, and validate data from disparate sources, ensuring 99.5% data accuracy and 24/7 pipeline uptime`
    );
  } else {
    bullets.push(
      `Engineered data infrastructure using ${skillsText} to support real-time analytics, increasing query speed by 40% and reducing system load by 30%`
    );
  }

  // Bullet 3: Business Impact specific to job description
  if (responsibilities.length > 0) {
    const resp = responsibilities[0];
    if (resp.includes("forecast") || resp.includes("predict")) {
      bullets.push(
        `Delivered predictive analytics models improving forecast accuracy by 20%, resulting in optimized inventory levels and $500K+ cost savings annually`
      );
    } else if (resp.includes("customer") || resp.includes("retention")) {
      bullets.push(
        `Conducted customer segmentation analysis using RFM clustering, identifying high-value segments and enabling targeted marketing campaigns that improved retention by 15%`
      );
    } else {
      bullets.push(
        `${resp} by analyzing key performance metrics and market trends, driving measurable improvements and supporting strategic business initiatives aligned with organizational goals`
      );
    }
  } else {
    bullets.push(
      `Delivered data-driven insights that informed executive strategy, resulting in 12% improvement in operational efficiency and 15% increase in forecast accuracy`
    );
  }

  return bullets;
}

function generateLinkedInMessage(jobTitle: string, skills: string[]): string {
  const skillsText = skills.length > 0 
    ? skills.slice(0, 2).join(" and ")
    : "data analytics and business intelligence";

  let roleContext = "data-driven insights";
  if (jobTitle.toLowerCase().includes("engineer")) {
    roleContext = "scalable data infrastructure";
  } else if (jobTitle.toLowerCase().includes("scientist")) {
    roleContext = "predictive modeling and advanced analytics";
  } else if (jobTitle.toLowerCase().includes("bi")) {
    roleContext = "business intelligence solutions";
  }

  return `Hi! 👋 I came across the ${jobTitle} position and it's an excellent match for my background. With hands-on expertise in ${skillsText} and a demonstrated track record of delivering measurable business impact through ${roleContext}, I'd be very interested in exploring this opportunity. I'm confident I can add immediate value to your team and would love to discuss how my experience aligns with your needs. Let's connect!`;
}

function extractKeyResponsibilities(jd: string): string[] {
  const responsibilities: string[] = [];
  
  // Look for bullet points or numbered items
  const lines = jd.split('\n');
  const responsibilityLines = lines.filter(line => 
    /^[\s]*[-•*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)
  ).slice(0, 3);

  responsibilityLines.forEach(line => {
    const cleaned = line.replace(/^[\s]*[-•*\d.]\s+/, '').trim().toLowerCase().slice(0, 80);
    if (cleaned.length > 10) {
      responsibilities.push(cleaned);
    }
  });

  return responsibilities;
}

function generateResumeRecommendations(jd: string, skills: string[], jobTitle: string) {
  const jdLower = jd.toLowerCase();
  
  // Extract required skills
  const allSkills = [
    "sql", "python", "r", "power bi", "tableau", "excel", "vba", "data visualization",
    "etl", "data modeling", "reporting", "business intelligence", "database", "analytics",
    "aws", "gcp", "azure", "git", "jupyter", "pandas", "numpy", "dash", "looker", "qlik",
    "dax", "statistical analysis", "machine learning", "java", "scala", "spark"
  ];
  
  const requiredSkills = allSkills.filter(skill => jdLower.includes(skill));
  const optionalSkills = ["Communication", "Problem-solving", "Stakeholder Management", "Attention to Detail"];
  
  // Experience highlights based on job type
  const experienceHighlights: string[] = [];
  if (jdLower.includes("business analyst")) {
    experienceHighlights.push(
      "Add requirement gathering and stakeholder management experience",
      "Highlight experience with business process improvement",
      "Include examples of translating business needs to technical solutions"
    );
  } else if (jdLower.includes("engineer")) {
    experienceHighlights.push(
      "Emphasize data pipeline and infrastructure design experience",
      "Highlight performance optimization achievements",
      "Include experience with distributed systems and big data"
    );
  } else if (jdLower.includes("scientist")) {
    experienceHighlights.push(
      "Add machine learning model development experience",
      "Highlight statistical analysis and hypothesis testing",
      "Include research and experimentation background"
    );
  } else {
    experienceHighlights.push(
      "Highlight dashboard and reporting project experience",
      "Include data analysis and insight generation examples",
      "Add examples of driving business decisions with data"
    );
  }
  
  // Certifications
  const certificationsToAdd: string[] = [];
  if (requiredSkills.some(s => s.includes("power bi"))) {
    certificationsToAdd.push("Microsoft Power BI Certification");
  }
  if (requiredSkills.some(s => s.includes("tableau"))) {
    certificationsToAdd.push("Tableau Desktop Specialist Certification");
  }
  if (requiredSkills.some(s => s.includes("sql"))) {
    certificationsToAdd.push("Advanced SQL / Database Design Certificate");
  }
  if (requiredSkills.some(s => s.includes("python"))) {
    certificationsToAdd.push("Python for Data Analysis Certificate");
  }
  if (jdLower.includes("aws")) {
    certificationsToAdd.push("AWS Certified Data Analytics - Specialty");
  }
  
  return {
    requiredSkills: requiredSkills.slice(0, 6),
    optionalSkills,
    experienceHighlights,
    certificationsToAdd: certificationsToAdd.slice(0, 4)
  };
}
