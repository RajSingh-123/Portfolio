export interface ATSAnalysis {
  keywords: Array<{ keyword: string; frequency: number }>;
  jobTitles: string[];
  professionalSummary: string;
}

export function analyzeResumeForATS(): ATSAnalysis {
  const resumeContent = `
    Results-driven Data Analyst skilled in SQL Power BI Excel Python
    Building interactive dashboards automating reporting workflows
    Data cleaning exploratory data analysis ETL workflows
    Attrition analytics retention dashboard HR analytics
    Netflix viewing behavior analytics data visualization
    Adidas sales analysis seasonal trends forecasting
    Course engagement dashboard student tracking
    E-commerce customer segmentation RFM analysis clustering
    Data modeling data mining statistical analysis
    Business intelligence reporting automation
    MySQL PostgreSQL database design optimization
    Pandas NumPy Python programming machine learning
    Power Query data transformation aggregation
    DAX measures calculated columns
    Tableau visualization Matplotlib Seaborn
    Git GitHub version control
    AWS S3 Redshift cloud databases
    Jupyter notebooks exploratory analysis
    JSON CSV Excel data formats
    CASE WHEN SELECT GROUP BY window functions
    Correlation analysis hypothesis testing
    KPI tracking metrics dashboard design
    Stakeholder communication data storytelling
    Decision support business analytics
    Performance metrics efficiency gains
    35% improvement reporting accuracy
    15% forecast improvement demand planning
    Real-time dashboards automated alerts
    Data quality validation data integrity
    Requirements gathering process optimization
  `;

  const keywords = extractKeywords(resumeContent);
  const jobTitles = generateAlternateJobTitles();
  const professionalSummary = generateProfessionalSummary();

  return {
    keywords: keywords.slice(0, 20),
    jobTitles,
    professionalSummary,
  };
}

function extractKeywords(content: string): Array<{ keyword: string; frequency: number }> {
  const atsKeywords = [
    "SQL",
    "Power BI",
    "Python",
    "Data Analysis",
    "Dashboard",
    "ETL",
    "Data Modeling",
    "Excel",
    "SQL Server",
    "Reporting",
    "Analytics",
    "Business Intelligence",
    "Data Visualization",
    "MySQL",
    "PostgreSQL",
    "Tableau",
    "Data Cleaning",
    "Exploratory Data Analysis",
    "KPI Tracking",
    "Pandas",
    "NumPy",
    "DAX",
    "Power Query",
    "Database Design",
    "Statistical Analysis",
    "Automation",
    "Query Optimization",
    "Data Warehouse",
    "Machine Learning",
    "Python Programming",
  ];

  const frequencyMap: Record<string, number> = {};

  atsKeywords.forEach((keyword) => {
    const pattern = new RegExp(keyword, "gi");
    const matches = content.match(pattern);
    frequencyMap[keyword] = matches ? matches.length : 0;
  });

  return Object.entries(frequencyMap)
    .map(([keyword, frequency]) => ({ keyword, frequency }))
    .sort((a, b) => b.frequency - a.frequency || a.keyword.localeCompare(b.keyword))
    .filter((item) => item.frequency > 0);
}

function generateAlternateJobTitles(): string[] {
  return [
    "Business Analyst",
    "BI Developer (Business Intelligence Developer)",
    "Data Engineer",
  ];
}

function generateProfessionalSummary(): string {
  return `Results-driven Data Analyst with proven expertise in SQL, Power BI, and Python. Specialized in building automated dashboards, conducting exploratory analysis, and delivering actionable insights. Demonstrated success improving reporting efficiency by 35% and forecast accuracy by 15%. Seeking entry-level Data Analyst roles in analytics or BI reporting.`;
}
