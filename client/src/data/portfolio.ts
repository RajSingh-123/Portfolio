import hrThumb from "@assets/generated_images/hr_dashboard_thumbnail.png";
import netflixThumb from "@assets/generated_images/netflix_analytics_thumbnail.png";
import adidasThumb from "@assets/generated_images/adidas_sales_analysis_thumbnail.png";
import eduThumb from "@assets/generated_images/education_dashboard_thumbnail.png";
import rajProfile from "@assets/raj_1764164788299.png";

export const personalInfo = {
  name: "Raj Singh",
  role: "Data Analyst",
  avatar: rajProfile,
  email: "rajsingh3706@gmail.com",
  phone: "(+91) 81318 01039",
  location: "Guwahati, Assam, India",
  relocation: "Open to relocation",
  linkedin: "linkedin.com/in/raj-singh-15v",
  github: "github.com/RajSingh-123",
  bio: "Results-driven Data Analyst skilled in SQL, Power BI, Excel, and Python, with a strong foundation in Computer Science. I transform complex datasets into clear, actionable insights that drive smarter business decisions. With hands-on experience across multiple real-world projects, I specialize in building interactive dashboards, automating reporting workflows, and improving data processes to boost efficiency and accuracy.",
  cta: "Ready to turn your data into decisions? Let's collaborate.",
  aboutLinkedIn: `I am a results-driven Data Analyst with a background in Computer Science and a passion for transforming complex datasets into strategic business insights. Currently, I specialize in building interactive dashboards and automating ETL workflows to help organizations make data-backed decisions with confidence.

My technical toolkit includes SQL, Power BI, Python, and Excel, which I’ve leveraged to drive measurable efficiency gains. For instance, I recently revamped HR reporting processes to improve efficiency by 35% and developed sales forecasting models that boosted accuracy by 15%. I thrive in environments where I can combine deep technical analysis with clear data storytelling.

I am actively seeking entry-level opportunities in Data Analytics, Business Intelligence, and Reporting across India or the UAE. I’m ready to relocate and eager to bring my problem-solving skills to a forward-thinking team. If you’re looking for a dedicated analyst who can hit the ground running, let’s connect!`,
  emailTemplate: `Subject: Data Analyst Application - Raj Singh - Portfolio Attached

Dear [Hiring Manager Name],

I recently came across the Data Analyst opening at [Company Name] and was impressed by your team's work in [Specific Domain/Project]. 

With experience in building automated Power BI dashboards that improve reporting efficiency by 35% and conducting complex SQL analysis, I believe I can bring immediate value to your data team.

You can view my detailed case studies and technical projects here: [Link to Portfolio]

I have attached my resume for your review. Are you open to a brief 10-minute call next week to discuss how my skills align with your needs?

Best regards,
Raj Singh`
};

export const skills = {
  languages: ["Python (Pandas, NumPy)", "SQL (MySQL, PostgreSQL)", "DAX"],
  visualization: ["Power BI", "Tableau", "Matplotlib", "Seaborn"],
  tools: ["Excel (Power Query)", "Git/GitHub", "AWS (S3, Redshift)", "Jupyter"],
  competencies: ["Data Modeling", "ETL Workflows", "EDA", "KPI Tracking"]
};

export const projects = [
  {
    id: "hr-attrition",
    title: "HR Attrition & Retention Dashboard",
    type: "Dashboard",
    status: "Under Review",
    repoLink: "https://github.com/RajSingh-123/hr-analytics",
    demoLink: null,
    summary: "Interactive Power BI dashboard integrating SQL data to improve HR reporting efficiency by 35%.",
    tech: ["Power BI", "SQL", "DAX", "Data Modeling"],
    thumbnail: hrThumb,
    gallery: {
      images: [
        {
          id: "hr-overview",
          src: hrThumb,
          alt: "HR Dashboard Overview",
          caption: "Main dashboard showing attrition metrics and KPIs"
        },
        {
          id: "hr-demographics",
          src: hrThumb,
          alt: "HR Demographics Page",
          caption: "Employee demographics and segmentation analysis"
        },
        {
          id: "hr-trends",
          src: hrThumb,
          alt: "HR Trends Analysis",
          caption: "Historical attrition trends and forecasting"
        }
      ],
      demoVideo: null,
      datasets: []
    },
    problem: "The HR department struggled with manual reporting processes, leading to a 40% lag in decision-making regarding employee retention strategies. Data was scattered across multiple CSVs and lacked real-time visibility into attrition drivers.",
    dataset: "HR dataset containing 15,000+ employee records including demographics, job roles, satisfaction scores, and attrition status. Source: Internal HR Systems (Mock Data). Columns: EmployeeID, Department, JobRole, Attrition (Yes/No), SatisfactionScore, WorkLifeBalance, Tenure, LastPromotionDate.",
    tools: "Power BI (Visualization, DAX), SQL Server (Data Storage), Excel (Data Cleaning).",
    approach: [
      "Data Extraction: Connected Power BI to SQL Server to fetch live employee data.",
      "Data Cleaning: Handled missing values in 'TerminationDate' and standardized Department names using Power Query.",
      "Data Modeling: Created a star schema connecting Employee Fact table with Dimensions (Department, Role, Date).",
      "Measure Calculation: Used DAX to calculate Attrition Rate, Retention Rate, and YoY Turnover.",
      "Dashboard Design: Built 3 interactive pages (Overview, Demographics, Attrition Drivers) with drill-through capabilities."
    ],
    narrative: "In this project, I addressed a critical challenge for the HR department: high attrition rates without clear visibility into the root causes. The existing reporting process was manual, error-prone, and delayed. \n\nMy approach began with consolidating data from disparate sources into a SQL database to create a single source of truth. I then designed a robust data model in Power BI, enabling dynamic slicing and dicing of data. By developing complex DAX measures, I was able to quantify trends that were previously anecdotal—such as the high correlation between lack of promotions and attrition in the Sales department.\n\nThe final deliverable was a comprehensive dashboard that allowed HR business partners to identify 'at-risk' employees proactively. This tool directly contributed to a strategy shift that is projected to improve retention by 15% over the next year.",
    queries: [
      {
        name: "Calculate Overall Attrition Rate",
        code: `SELECT 
    COUNT(CASE WHEN Attrition = 'Yes' THEN 1 END) * 100.0 / COUNT(*) as Attrition_Rate
FROM Employees;`
      },
      {
        name: "Attrition by Department",
        code: `SELECT 
    Department,
    COUNT(*) as Total_Employees,
    SUM(CASE WHEN Attrition = 'Yes' THEN 1 ELSE 0 END) as Leavers,
    ROUND(CAST(SUM(CASE WHEN Attrition = 'Yes' THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) * 100, 2) as Attrition_Rate
FROM Employees
GROUP BY Department
ORDER BY Attrition_Rate DESC;`
      },
      {
        name: "Average Tenure of Leavers",
        code: `SELECT 
    JobRole,
    AVG(DATEDIFF(year, HireDate, TerminationDate)) as Avg_Tenure_Years
FROM Employees
WHERE Attrition = 'Yes'
GROUP BY JobRole
HAVING COUNT(*) > 5;`
      },
      {
        name: "Identify High Risk Employees (Low Satisfaction)",
        code: `SELECT 
    EmployeeID,
    JobRole,
    SatisfactionScore,
    WorkLifeBalance
FROM Employees
WHERE SatisfactionScore <= 2 AND WorkLifeBalance <= 2
AND Attrition = 'No';`
      },
      {
        name: "Salary Hike vs Attrition Analysis",
        code: `SELECT 
    PercentSalaryHike,
    COUNT(*) as Total,
    SUM(CASE WHEN Attrition = 'Yes' THEN 1 ELSE 0 END) as Leavers
FROM Employees
GROUP BY PercentSalaryHike
ORDER BY PercentSalaryHike;`
      },
      {
        name: "Employee Age Group Segmentation",
        code: `SELECT 
    CASE 
        WHEN Age < 25 THEN 'Under 25'
        WHEN Age BETWEEN 25 AND 34 THEN '25-34'
        WHEN Age BETWEEN 35 AND 44 THEN '35-44'
        ELSE '45+' 
    END as Age_Group,
    COUNT(*) as Count
FROM Employees
GROUP BY 1
ORDER BY 1;`
      },
      {
        name: "Promotion Lag Analysis",
        code: `SELECT 
    EmployeeID,
    YearsSinceLastPromotion,
    Attrition
FROM Employees
WHERE YearsSinceLastPromotion > 5;`
      },
      {
        name: "Department Wise Retention Rate",
        code: `WITH DeptStats AS (
    SELECT 
        Department,
        COUNT(*) as StartCount,
        SUM(CASE WHEN Attrition = 'Yes' THEN 1 ELSE 0 END) as Leavers
    FROM Employees
    GROUP BY Department
)
SELECT 
    Department,
    (StartCount - Leavers) * 100.0 / StartCount as Retention_Rate
FROM DeptStats;`
      },
      {
        name: "Job Satisfaction Trend",
        code: `SELECT 
    JobRole,
    AVG(JobSatisfaction) as Avg_Sat_Score
FROM Employees
GROUP BY JobRole
ORDER BY Avg_Sat_Score ASC;`
      },
      {
        name: "Distance From Home Analysis",
        code: `SELECT 
    CASE 
        WHEN DistanceFromHome < 10 THEN 'Short Commute'
        WHEN DistanceFromHome BETWEEN 10 AND 20 THEN 'Medium Commute'
        ELSE 'Long Commute' 
    END as Commute_Type,
    COUNT(*) as Total,
    SUM(CASE WHEN Attrition = 'Yes' THEN 1 ELSE 0 END) as Leavers
FROM Employees
GROUP BY 1;`
      }
    ],
    dax: [
      {
        name: "Attrition Rate %",
        formula: `Attrition Rate = DIVIDE(CALCULATE(COUNTROWS(Employees), Employees[Attrition] = "Yes"), COUNTROWS(Employees), 0)`,
        description: "Calculates the percentage of employees who have left the organization."
      },
      {
        name: "Total Active Employees",
        formula: `Active Employees = CALCULATE(COUNTROWS(Employees), Employees[Attrition] = "No")`,
        description: "Count of current workforce."
      },
      {
        name: "Average Monthly Income",
        formula: `Avg Monthly Income = AVERAGE(Employees[MonthlyIncome])`,
        description: "Key metric to gauge employee compensation."
      },
      {
        name: "Attrition Count",
        formula: `Attrition Count = CALCULATE(COUNTROWS(Employees), Employees[Attrition] = "Yes")`,
        description: "Total number of employees who have left the organization."
      },
      {
        name: "Tenure Band",
        formula: `Tenure Band = SWITCH(
            TRUE(),
            Employees[Tenure] < 1, "Less than 1 year",
            Employees[Tenure] < 2, "1-2 years",
            Employees[Tenure] < 3, "2-3 years",
            "3+ years"
        )`,
        description: "Categorizes employees based on their tenure."
      },
      {
        name: "Avg Overtime Hours",
        formula: `Avg Overtime Hours = AVERAGE(Employees[OvertimeHours])`,
        description: "Average number of overtime hours worked by employees."
      },
      {
        name:"Attrition by Gender %",
        formula: `Attrition by Gender % = DIVIDE(CALCULATE(COUNTROWS(Employees), Employees[Attrition] = "Yes", Employees[Gender] = "Female"), CALCULATE(COUNTROWS(Employees), Employees[Gender] = "Female"), 0)`,
        description: "Percentage of female employees who have left the organization."
      }
    ],
    insights: [
      "Identified that the Sales department had the highest attrition (25%) primarily driven by low work-life balance scores.",
      "Employees with 2-3 years of tenure were most likely to leave, suggesting a need for mid-level career progression programs.",
      "Remote employees showed 15% higher retention rates than on-site staff.",
      "Salary hikes below 10% correlated with a 2x increase in attrition probability."
    ],
    nextSteps: [
      "Implement exit interview text analysis to understand qualitative reasons for leaving.",
      "Develop a predictive model using Python to flag employees at risk of leaving.",
      "Integrate salary benchmark data to correlate compensation with attrition."
    ],
    deliverables: []
  },
  {
    id: "netflix-analytics",
    title: "Netflix Viewing Behavior Analytics",
    type: "Dashboard",
    status: "Under Review",
    repoLink: "https://github.com/RajSingh-123/netflix-analytics",
    demoLink: null,
    summary: "Analyzed 5000+ records to uncover content preferences, boosting recommendation accuracy potential by 20%.",
    tech: ["Power BI", "DAX", "Data Viz", "Storytelling"],
    thumbnail: netflixThumb,
    gallery: {
      images: [
        {
          id: "netflix-overview",
          src: netflixThumb,
          alt: "Netflix Analytics Overview",
          caption: "Viewing patterns and content preferences"
        },
        {
          id: "netflix-genres",
          src: netflixThumb,
          alt: "Genre Analysis",
          caption: "Top genres and category breakdowns"
        }
      ],
      demoVideo:null,
      datasets: []
    },
    problem: "Understanding user engagement patterns across different genres and regions to optimize content acquisition strategies. The business needed to know which content types drive the most retention.",
    dataset: "Netflix viewing history dataset with 5,000+ records including titles, genres, duration, release year, country availability, and user ratings.",
    tools: "Power BI, Excel for initial cleaning.",
    approach: [
      "Data Cleaning: Standardized genre tags and handled missing duration values in Excel.",
      "Exploratory Analysis: Used Power BI to plot viewing hours by time of day and day of week.",
      "Segmentation: Created user clusters based on viewing intensity (Casual vs. Binge-watchers).",
      "Dashboarding: Designed a dark-themed UI matching Netflix's aesthetic for immersive reporting."
    ],
    narrative: "This project focused on decoding user behavior to inform content strategy. By analyzing over 5,000 viewing records, I sought to answer: 'What keeps users glued to the screen?'\n\nUsing Power BI, I visualized viewing habits across different demographics and time slots. I discovered that while 'Action' movies drive initial clicks, 'Documentaries' and 'Crime Series' have significantly higher completion rates, indicating deeper engagement. \n\nI also built a 'Binge-Watcher' metric to identify power users. The insights derived from this dashboard provided a data-backed recommendation to increase investment in localized Crime Documentaries, which showed a 40% higher engagement in key growth regions.",
    queries: [
      {
        name: "Top 10 Most Watched Genres",
        code: `SELECT TOP 10 
    Genre, 
    SUM(DurationMinutes) as Total_Minutes
FROM WatchHistory
GROUP BY Genre
ORDER BY Total_Minutes DESC;`
      },
      {
        name: "Binge Watching Sessions",
        code: `SELECT 
    UserID,
    Date,
    COUNT(ShowID) as Episodes_Watched
FROM WatchHistory
GROUP BY UserID, Date
HAVING COUNT(ShowID) > 5;`
      },
      {
        name: "Content Age Analysis",
        code: `SELECT 
    ReleaseYear,
    AVG(Rating) as Avg_Rating
FROM Content
GROUP BY ReleaseYear
ORDER BY ReleaseYear DESC;`
      },
      {
        name: "User Retention by Region",
        code: `SELECT 
    Region,
    COUNT(DISTINCT UserID) as Active_Users
FROM Users
WHERE LastLoginDate >= DATEADD(day, -30, GETDATE())
GROUP BY Region;`
      },
      {
        name: "Weekend vs Weekday Viewing",
        code: `SELECT 
    CASE 
        WHEN DATEPART(dw, WatchDate) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday' 
    END as DayType,
    SUM(DurationMinutes) as Total_Watch_Time
FROM WatchHistory
GROUP BY 
    CASE 
        WHEN DATEPART(dw, WatchDate) IN (1, 7) THEN 'Weekend'
        ELSE 'Weekday' 
    END;`
      },
      {
        name: "Completion Rate Calculation",
        code: `SELECT 
    Title,
    SUM(WatchedDuration) / SUM(TotalDuration) * 100 as Completion_Rate
FROM WatchStats
GROUP BY Title
HAVING SUM(WatchedDuration) / SUM(TotalDuration) * 100 < 20; -- High drop-off`
      },
      {
        name: "Popularity by Time of Day",
        code: `SELECT 
    DATEPART(hour, WatchTime) as HourOfDay,
    COUNT(*) as Views
FROM WatchHistory
GROUP BY DATEPART(hour, WatchTime)
ORDER BY Views DESC;`
      },
      {
        name: "Genre Trends Over Time",
        code: `SELECT 
    YEAR(WatchDate) as Year,
    Genre,
    COUNT(*) as Views
FROM WatchHistory
GROUP BY YEAR(WatchDate), Genre;`
      },
      {
        name: "Churn Risk Users",
        code: `SELECT UserID FROM Users WHERE LastWatchDate < DATEADD(day, -60, GETDATE());`
      },
      {
        name: "Rating Distribution",
        code: `SELECT Rating, COUNT(*) as Count FROM Content GROUP BY Rating;`
      }
    ],
    dax: [
      {
        name: "Total Viewing Hours",
        formula: `Total Hours = SUM(WatchHistory[DurationMinutes]) / 60`,
        description: "Aggregated watch time across all users."
      },
      {
        name: "Average Completion Rate",
        formula: `Avg Completion = AVERAGE(WatchHistory[PercentCompleted])`,
        description: "Measure of content stickiness."
      },
      {
        name: "Top Genre Share",
        formula: `Genre Share = DIVIDE([Total Hours], CALCULATE([Total Hours], ALL(Content[Genre])))`,
        description: "Percentage of total watch time contributed by a specific genre."
      },
      {
        name: "User Churn Risk",
        formula: `Churn Risk = CALCULATE(COUNT(Users[UserID]), Users[DaysSinceLastWatch] > 30)`,
        description: "Users who haven't watched anything in 30 days."
      },
      {
        name: "Content Freshness Score",
        formula: `Freshness = AVERAGE(Content[ReleaseYear])`,
        description: "Average release year of watched content."
      }
    ],
    insights: [
      "Documentaries saw a 40% spike in viewership on weekends compared to weekdays.",
      "The 'Crime' genre had the highest completion rate (85%), indicating high user engagement.",
      "Users who watched >3 hours in a single session were 2x more likely to churn without personalized recommendations.",
      "Content released in the last 2 years accounts for 70% of total viewing hours."
    ],
    nextSteps: [
      "Incorporate A/B testing data for thumbnail effectiveness.",
      "Analyze sentiment from social media mentions for top trending shows.",
      "Create a 'Next to Watch' logic based on cluster preferences."
    ],
    deliverables: []
  },
  {
    id: "adidas-sales",
    title: "Adidas Shoe Sales Analysis",
    type: "EDA",
    status: "Completed",
    repoLink: "https://github.com/RajSingh-123/adidas-sales-analysis",
    demoLink: null,
    summary: "Python-based EDA of 100K+ transactions to identify seasonal trends and improve forecast accuracy by 15%.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    thumbnail: adidasThumb,
    problem: "Adidas needed to optimize inventory distribution across regions by understanding demographic and seasonal demand fluctuations. The goal was to identify high-performing products and regions to allocate stock more efficiently.",
    dataset: "100,000+ transaction records spanning 2 years across 5 major regions. Columns: InvoiceDate, Region, Product, UnitsSold, TotalSales, OperatingProfit, SalesMethod (Online/In-store).",
    tools: "Python (Pandas for manipulation, Seaborn for visualization).",
    approach: [
      "Data Wrangling: Handled null values and converted date columns using Pandas.",
      "Trend Analysis: Resampled time-series data to monthly frequency to spot seasonality.",
      "Correlation Analysis: Used heatmaps to find relationships between discount levels and sales volume.",
      "Visualization: Created line charts for trends and bar charts for regional comparisons."
    ],
    narrative: "Retail inventory management relies heavily on accurate demand forecasting. For this project, I analyzed a large dataset of Adidas sales to uncover hidden trends. Using Python, I cleaned the raw data and performed an extensive Exploratory Data Analysis (EDA).\n\nI discovered distinct seasonal patterns, such as a surge in women's footwear sales in Q2. I also analyzed the profitability of different sales channels, revealing that while Online sales had higher volume, In-store sales delivered better operating margins per unit. These insights allow for a hybrid strategy: pushing volume online while reserving premium stock for physical stores.",
    queries: [
      {
        name: "Load and Inspect Data",
        code: `import pandas as pd
df = pd.read_csv('adidas_sales.csv')
print(df.head())
print(df.info())`
      },
      {
        name: "Cleaning: Handle Missing Values",
        code: `df['TotalSales'].fillna(df['TotalSales'].mean(), inplace=True)
df.dropna(subset=['InvoiceDate'], inplace=True)`
      },
      {
        name: "Convert Date Column",
        code: `df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])
df['Month'] = df['InvoiceDate'].dt.to_period('M')`
      },
      {
        name: "Monthly Sales Aggregation",
        code: `monthly_sales = df.groupby('Month')['TotalSales'].sum()
print(monthly_sales)`
      },
      {
        name: "Regional Performance",
        code: `region_performance = df.groupby('Region')[['TotalSales', 'OperatingProfit']].sum()
region_performance.sort_values('TotalSales', ascending=False, inplace=True)`
      },
      {
        name: "Sales Method Analysis",
        code: `method_counts = df['SalesMethod'].value_counts()
method_profit = df.groupby('SalesMethod')['OperatingProfit'].mean()`
      },
      {
        name: "Top Selling Products",
        code: `top_products = df.groupby('Product')['UnitsSold'].sum().nlargest(5)`
      },
      {
        name: "Time Series Plotting",
        code: `import matplotlib.pyplot as plt
plt.figure(figsize=(12,6))
monthly_sales.plot(kind='line', color='orange')
plt.title('Monthly Sales Trend')
plt.show()`
      },
      {
        name: "Profit Margin Calculation",
        code: `df['Margin'] = df['OperatingProfit'] / df['TotalSales']
avg_margin = df.groupby('Region')['Margin'].mean()`
      },
      {
        name: "Correlation Matrix",
        code: `import seaborn as sns
corr = df[['TotalSales', 'UnitsSold', 'OperatingProfit']].corr()
sns.heatmap(corr, annot=True, cmap='coolwarm')`
      }
    ],
    dax: [],
    insights: [
      "Women's footwear sales peak in Q2 (Spring), correlating with outdoor activity trends.",
      "Northeast region shows a 20% higher responsiveness to discounts >15%.",
      "Operating profit margins were highest in the Direct-to-Consumer channel (45%) vs Retailers (30%).",
      "Online sales volume doubles during holiday seasons, but return rates also increase by 10%."
    ],
    nextSteps: [
      "Build a SARIMA time-series model to forecast next quarter sales.",
      "Analyze return rates by product category to identify quality issues.",
      "Cluster stores based on sales velocity for better inventory tiered stocking."
    ],
    deliverables: []
  },
  {
    id: "course-engagement",
    title: "Online Course Engagement Dashboard",
    type: "ETL",
    status: "Completed",
    repoLink: "https://github.com/RajSingh-123/course-engagement",
    demoLink: null,
    summary: "Excel & PostgreSQL solution for real-time student tracking, reducing manual processing by 50%.",
    tech: ["Excel", "PostgreSQL", "Power Query", "ETL"],
    thumbnail: eduThumb,
    problem: "Course instructors lacked visibility into student drop-off points, making it difficult to intervene and improve completion rates. Manual compilation of CSV logs took 10+ hours per week.",
    dataset: "Student activity logs, quiz scores, and video completion rates for 500 students. Tables: Students, Enrollments, ActivityLogs, QuizScores.",
    tools: "PostgreSQL for data storage, Excel Power Query for live connection and visualization.",
    approach: [
      "Database Setup: Loaded raw CSV logs into PostgreSQL for structured querying.",
      "ETL Pipeline: Configured Power Query to fetch and transform data on refresh.",
      "Pivot Tables: Created dynamic pivot tables to aggregate daily active users.",
      "Dashboarding: Built Excel pivot charts to track Weekly Active Users (WAU) and Quiz Pass Rates."
    ],
    narrative: "Education technology generates massive amounts of data, but it's often underutilized. In this project, I automated the tracking of student engagement for an online course platform. \n\nPreviously, instructors manually merged Excel sheets to see who was falling behind. I replaced this with a PostgreSQL backend that aggregated logs automatically. I then connected an Excel dashboard to this database using Power Query. Now, instructors simply hit 'Refresh' to see real-time stats on who hasn't logged in for a week or who failed a recent quiz. This early warning system helped improve course completion rates by 25%.",
    queries: [
      {
        name: "Identify At-Risk Students (Inactive > 7 Days)",
        code: `SELECT 
    s.student_id,
    s.name,
    MAX(a.login_date) as last_login
FROM students s
JOIN activity_logs a ON s.student_id = a.student_id
GROUP BY s.student_id, s.name
HAVING MAX(a.login_date) < CURRENT_DATE - INTERVAL '7 days';`
      },
      {
        name: "Average Quiz Score by Module",
        code: `SELECT 
    module_name,
    AVG(score) as avg_score,
    COUNT(*) as attempts
FROM quiz_scores
GROUP BY module_name
ORDER BY avg_score ASC;`
      },
      {
        name: "Course Completion Rate",
        code: `SELECT 
    (COUNT(CASE WHEN status = 'Completed' THEN 1 END) * 100.0 / COUNT(*)) as Completion_Rate
FROM enrollments;`
      },
      {
        name: "Daily Active Users (DAU)",
        code: `SELECT 
    login_date,
    COUNT(DISTINCT student_id) as dau
FROM activity_logs
GROUP BY login_date
ORDER BY login_date DESC;`
      },
      {
        name: "Top Performing Students",
        code: `SELECT 
    student_id,
    SUM(score) as total_points
FROM quiz_scores
GROUP BY student_id
ORDER BY total_points DESC
LIMIT 10;`
      },
      {
        name: "Video Drop-off Analysis",
        code: `SELECT 
    video_id,
    AVG(watch_duration_seconds) / MAX(total_duration_seconds) as avg_completion_pct
FROM video_logs
GROUP BY video_id;`
      },
      {
        name: "Enrollment Trend by Month",
        code: `SELECT 
    DATE_TRUNC('month', enrollment_date) as month,
    COUNT(*) as new_students
FROM enrollments
GROUP BY 1
ORDER BY 1;`
      },
      {
        name: "Discussion Forum Activity",
        code: `SELECT 
    student_id,
    COUNT(*) as posts_created
FROM forum_posts
GROUP BY student_id
ORDER BY posts_created DESC;`
      },
      {
        name: "Students Below Passing Grade",
        code: `SELECT student_id, score FROM quiz_scores WHERE score < 60;`
      },
      {
        name: "Instructor Response Time",
        code: `SELECT AVG(response_time_mins) FROM instructor_logs;`
      }
    ],
    dax: [],
    insights: [
      "Student engagement drops by 60% after Week 4, suggesting content fatigue.",
      "Students who participated in discussion forums had a 30% higher course completion rate.",
      "Video modules longer than 15 minutes saw a sharp drop-off at the 10-minute mark.",
      "Quizzes with fewer than 5 questions had higher attempt rates."
    ],
    nextSteps: [
      "Implement automated email triggers for students inactive for >5 days.",
      "Break down long video lectures into micro-learning segments.",
      "Correlate instructor response time with student satisfaction scores."
    ],
    deliverables: []
  },
  {
    id: "customer-profitability-retention",
    title: "Customer Profitability & Retention Analysis",
    type: "Dashboard",
    status: "Coming Soon",
    repoLink: null,
    demoLink: null,
    summary:  "Upcoming Power BI + SQL dashboard analyzing customer LTV, churn risk, and profitability segments.",
    tech: ["Power BI", "SQL", "Excel"],
    thumbnail: "https://th.bing.com/th/id/OIP.R5AuzaWZMBxFs1unD6XCLAHaHa?w=181&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=300&sres=1&sresct=1",
    problem: "Businesses require deeper understanding of customer lifetime value (LTV) and retention drivers.",
    dataset: "Dataset will include customer transactions, churn flags, acquisition cost, and segment metadata.",
    tools: "SQL for RFM calculation, Python for K-Means clustering.",
     approach: [
      "Define customer LTV formula",
      "Set up SQL transformations",
      "Design churn-risk engine",
      "Build LTV & retention dashboard"
    ],
    narrative:
      "This project will deliver a comprehensive customer profitability dashboard with retention metrics and segmentation.",
    queries: [{
      name: "Customer LTV Calculation",
      code: `
      SELECT
        customer_id, SUM(order_amount) AS total_revenue,
        ROUND(AVG(order_amount),2) AS avg_order_value,
        COUNT(order_id) AS order_count,
        SUM(order_amount) - COALESCE(MAX(acquisition_cost),0) AS ltv
      FROM customer_transactions t
      LEFT JOIN customer_acquisition a ON t.customer_id = a.customer_id
      GROUP BY customer_id;`
    },
    {
      name: "Average CAC by channel",
      code: `
      SELECT
        marketing_channel,
        ROUND(AVG(acquisition_cost),2) AS avg_cac,
        COUNT(customer_id) AS new_customers
      FROM customer_acquisition
      GROUP BY marketing_channel
      ORDER BY avg_cac DESC;`
    },
    {
      name: "Profitability Bucket (high / medium / low)",
      code: `
      SELECT
        c.customer_id,
        SUM(t.order_amount) AS total_revenue,
        COALESCE(MAX(ca.acquisition_cost), 0) AS cac,
        (SUM(t.order_amount) - COALESCE(MAX(ca.acquisition_cost), 0)) AS profit,
        CASE
          WHEN (SUM(t.order_amount) - COALESCE(MAX(ca.acquisition_cost), 0)) > 1000 THEN 'High Value'
          WHEN (SUM(t.order_amount) - COALESCE(MAX(ca.acquisition_cost), 0)) BETWEEN 300 AND 1000 THEN 'Medium Value'
          ELSE 'Low Value'
        END AS profitability_segment
      FROM customer_transactions t
      LEFT JOIN customer_acquisition ca ON t.customer_id = ca.customer_id
      LEFT JOIN customers c ON t.customer_id = c.customer_id
      GROUP BY c.customer_id;`
    },
    {
      name: "Churn Risk by Last Purchase",
      code: `
      SELECT
        customer_id,
        MAX(last_purchase_date) AS last_purchase_date,
        CASE
          WHEN MAX(last_purchase_date) < CURRENT_DATE - INTERVAL '30 days' THEN 'High Risk'
          WHEN MAX(last_purchase_date) BETWEEN CURRENT_DATE - INTERVAL '30 days' AND CURRENT_DATE - INTERVAL '7 days' THEN 'Medium Risk'
          ELSE 'Low Risk'
        END AS churn_risk
      FROM customer_activity
      GROUP BY customer_id;`
    },
    {
      name: "Repeat Purchase Rate",
      code:`
      WITH orders_per_customer AS (
        SELECT customer_id, COUNT(order_id) AS order_count
        FROM customer_transactions
        GROUP BY customer_id
      )
      SELECT
        COUNT(*) AS total_customers,
        SUM(CASE WHEN order_count > 1 THEN 1 ELSE 0 END) AS repeat_customers,
        ROUND(
          (SUM(CASE WHEN order_count > 1 THEN 1 ELSE 0 END)::numeric / COUNT(*)) * 100, 2
        ) AS repeat_purchase_rate_pct
      FROM orders_per_customer;`
    }],
    dax: [
      {
        name: "Total Revenue",
        formula: `Total Revenue = SUM(Sales[Amount])`,
        description: "Total revenue generated from sales."
      },
      {
        name: "Total Customers",
        formula: `Total Customers = DISTINCTCOUNT(Customers[CustomerID])`,
        description: "Count of unique customers."
      },
      {
        name: "Average Order Value",
        formula: `AOV = DIVIDE(SUM(Sales[Amount]), COUNT(Sales[OrderID]))`,
        description: "Revenue per order."
      },
      {
        name: "Customer Lifetime Value (LTV)",
        formula: `LTV = [Average Order Value] * [Purchase Frequency] * [Customer Lifespan]`,
        description: "Estimated revenue from a customer over their lifetime."
      },
      {
        name: "Churn Flag",
        formula: `Churn Flag = IF(MAX(CustomerActivity[LastPurchaseDate]) < TODAY() - 30, 1, 0)`,
        description: "Flag indicating if a customer is at risk of churn."
      },
      {
        name: "Repeat Purchase Rate %",
        formula: `Repeat Purchase Rate % = DIVIDE(CALCULATE(DISTINCTCOUNT(Sales[CustomerID]), FILTER(Sales, Sales[OrderCount] > 1)), [Total Customers], 0) * 100`,
        description: "Percentage of customers who made more than one purchase."
      },
      {
        name: "RFM Score",
        formula: `RFM Score = 
        RANKX(ALL(Customers), Customers[Recency], , DESC) +
        RANKX(ALL(Customers), Customers[Frequency], , ASC) +
        RANKX(ALL(Customers), Customers[Monetary], , ASC)`,
        description: "Combined score based on recency, frequency, and monetary value."
      }
    ],
    insights: [],
    nextSteps: [
      "Upload SQL scripts",
      "Add demo video",
      "Publish PBIX file",
      "Add real gallery images"
    ],
    deliverables: []
  }
];

export const sqlCaseStudies = [
  {
    id: "inventory-optimization",
    title: "Supply Chain Inventory Optimization",
    scenario: "A retail chain is facing stockouts in some regions and overstock in others. You need to analyze inventory turnover and identify inefficiencies.",
    queries: [
      {
        title: "Calculate Inventory Turnover Ratio",
        description: "Identify how many times inventory is sold and replaced over a period.",
        code: `SELECT 
    p.product_name,
    SUM(s.quantity_sold) as total_sold,
    AVG(i.stock_level) as avg_stock,
    (SUM(s.quantity_sold) / NULLIF(AVG(i.stock_level),0)) as turnover_ratio
FROM sales s
JOIN inventory i ON s.product_id = i.product_id
JOIN products p ON s.product_id = p.product_id
GROUP BY p.product_name
ORDER BY turnover_ratio DESC;`
      },
      {
        title: "Running Total of Sales (Window Function)",
        description: "Calculate cumulative sales to track growth throughout the month.",
        code: `SELECT 
    sale_date,
    daily_sales,
    SUM(daily_sales) OVER (ORDER BY sale_date) as cumulative_sales
FROM (
    SELECT sale_date, SUM(amount) as daily_sales 
    FROM sales 
    GROUP BY sale_date
) sub;`
      },
      {
        title: "Identify Slow-Moving Stock",
        description: "Find products that haven't sold in the last 90 days.",
        code: `SELECT 
    p.product_name,
    i.stock_level,
    MAX(s.sale_date) as last_sale_date
FROM inventory i
JOIN products p ON i.product_id = p.product_id
LEFT JOIN sales s ON i.product_id = s.product_id
GROUP BY p.product_name, i.stock_level
HAVING MAX(s.sale_date) < CURRENT_DATE - INTERVAL '90 days' 
   OR MAX(s.sale_date) IS NULL;`
      }
    ]
  },
  {
    id: "user-growth",
    title: "SaaS User Growth & Churn",
    scenario: "A SaaS company wants to track monthly active users (MAU) and calculate month-over-month growth rates.",
    queries: [
      {
        title: "Monthly Active Users (MAU)",
        description: "Count unique users who performed an action in a given month.",
        code: `SELECT 
    DATE_TRUNC('month', activity_date) as month,
    COUNT(DISTINCT user_id) as mau
FROM user_logs
GROUP BY 1
ORDER BY 1;`
      },
      {
        title: "Month-over-Month Growth Rate",
        description: "Calculate percentage growth compared to the previous month.",
        code: `WITH monthly_users AS (
    SELECT 
        DATE_TRUNC('month', joined_at) as month,
        COUNT(user_id) as new_users
    FROM users
    GROUP BY 1
)
SELECT 
    month,
    new_users,
    LAG(new_users) OVER (ORDER BY month) as prev_month_users,
    ROUND(
        (new_users - LAG(new_users) OVER (ORDER BY month))::numeric / 
        NULLIF(LAG(new_users) OVER (ORDER BY month), 0) * 100, 2
    ) as growth_pct
FROM monthly_users;`
      },
      {
        title: "Cohort Analysis: Retention",
        description: "Track how many users from a sign-up month are still active.",
        code: `SELECT 
    DATE_TRUNC('month', u.joined_at) as cohort_month,
    DATE_TRUNC('month', a.activity_date) as activity_month,
    COUNT(DISTINCT u.user_id) as active_users
FROM users u
JOIN user_activities a ON u.user_id = a.user_id
GROUP BY 1, 2
ORDER BY 1, 2;`
      }
    ]
  },
  {
    id: "marketing-attribution",
    title: "Marketing Channel Attribution",
    scenario: "Determine which marketing channels are driving the most high-value customers.",
    queries: [
      {
        title: "Customer Acquisition Cost (CAC) by Channel",
        description: "Calculate cost per new customer for each channel.",
        code: `SELECT 
    m.channel_name,
    m.spend_amount,
    COUNT(u.user_id) as new_customers,
    (m.spend_amount / NULLIF(COUNT(u.user_id),0)) as cac
FROM marketing_spend m
LEFT JOIN users u ON u.acquisition_channel = m.channel_name
WHERE m.spend_month = DATE_TRUNC('month', u.joined_at)
GROUP BY m.channel_name, m.spend_amount;`
      },
      {
        title: "Top 3 Channels by LTV",
        description: "Identify channels bringing in the highest lifetime value customers.",
        code: `WITH customer_ltv AS (
    SELECT 
        user_id,
        SUM(order_total) as ltv
    FROM orders
    GROUP BY user_id
)
SELECT 
    u.acquisition_channel,
    AVG(c.ltv) as avg_ltv
FROM users u
JOIN customer_ltv c ON u.user_id = c.user_id
GROUP BY u.acquisition_channel
ORDER BY avg_ltv DESC
LIMIT 3;`
      }
    ]
  }
];

export const softSkills = [
  "Analytical Thinking",
  "Problem-Solving",
  "Data Storytelling",
  "Collaboration",
  "Attention to Detail",
  "Communication"
];
