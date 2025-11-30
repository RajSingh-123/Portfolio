# Open Graph Meta Tags Documentation

This document provides comprehensive Open Graph (OG) meta tags for all pages on Raj Singh's Data Analyst Portfolio. These tags are used by social media platforms (LinkedIn, Twitter, Facebook) when sharing your portfolio links.

## 🎯 Purpose

Open Graph meta tags control how your pages appear when shared on social media:
- **og:title** - The title displayed in the share preview
- **og:description** - The description text
- **og:image** - The thumbnail image (1200x630px recommended)
- **og:type** - The type of content (website, article, profile)
- **og:url** - The canonical URL

## 🏠 Homepage

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://raj-singh-portfolio.com/" />
<meta property="og:title" content="Raj Singh | Data Analyst Portfolio" />
<meta property="og:description" content="Data Analyst skilled in SQL, Power BI, Python, and Excel. Explore interactive projects, case studies, and STAR methodology implementations for entry-level roles in India & UAE." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Raj Singh - Data Analyst" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Raj Singh | Data Analyst Portfolio" />
<meta name="twitter:description" content="Data Analyst skilled in SQL, Power BI, Python, and Excel. Check out my interactive projects and case studies." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-image.png" />
<meta name="twitter:creator" content="@rajsingh" />
```

## 📊 Projects Page

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://raj-singh-portfolio.com/projects" />
<meta property="og:title" content="Data Analytics Projects | Raj Singh" />
<meta property="og:description" content="5 portfolio projects showcasing Dashboard Design, ETL Pipelines, and EDA using Power BI, SQL, Python, and Excel. Interactive case studies with metrics and implementations." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-images/projects.png" />
<meta property="og:site_name" content="Raj Singh - Data Analyst" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Data Analytics Projects | Raj Singh" />
<meta name="twitter:description" content="5 portfolio projects showcasing Dashboard Design, ETL Pipelines, and EDA." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-images/projects.png" />
```

## 📝 Individual Project Page

Example: `/projects/hr-analytics`

```html
<meta property="og:type" content="article" />
<meta property="og:url" content="https://raj-singh-portfolio.com/projects/hr-analytics" />
<meta property="og:title" content="HR Attrition & Retention Dashboard | Raj Singh" />
<meta property="og:description" content="Interactive Power BI dashboard analyzing employee attrition patterns. Reduced attrition by 12% through data-driven insights. Tech: Power BI, SQL, DAX." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-images/project-hr-analytics.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="article:published_time" content="2024-06-15T00:00:00Z" />
<meta property="article:author" content="Raj Singh" />
<meta property="og:site_name" content="Raj Singh - Data Analyst" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="HR Attrition & Retention Dashboard | Raj Singh" />
<meta name="twitter:description" content="Interactive Power BI dashboard analyzing employee attrition patterns. Reduced attrition by 12% through data-driven insights." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-images/project-hr-analytics.png" />
```

## 📚 Blog Page

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://raj-singh-portfolio.com/blog" />
<meta property="og:title" content="Data Analytics Blog | SQL, Power BI, Python Tips" />
<meta property="og:description" content="In-depth technical articles on SQL optimization, Power BI dashboards, Python data analysis, and advanced analytics techniques." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-images/blog.png" />
<meta property="og:site_name" content="Raj Singh - Data Analyst" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Data Analytics Blog | SQL, Power BI, Python Tips" />
<meta name="twitter:description" content="In-depth technical articles on SQL optimization, Power BI dashboards, and Python data analysis." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-images/blog.png" />
```

## 📄 Individual Blog Post

Example: `/blog/sql-query-optimization`

```html
<meta property="og:type" content="article" />
<meta property="og:url" content="https://raj-singh-portfolio.com/blog/sql-query-optimization" />
<meta property="og:title" content="SQL Query Optimization Techniques - Complete Guide" />
<meta property="og:description" content="Learn advanced SQL optimization techniques including indexing, query plans, and performance tuning. Includes real-world examples and benchmark results." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-images/blog-sql-optimization.png" />
<meta property="article:published_time" content="2024-11-15T08:00:00Z" />
<meta property="article:modified_time" content="2024-11-20T10:30:00Z" />
<meta property="article:author" content="Raj Singh" />
<meta property="article:section" content="SQL" />
<meta property="article:tag" content="SQL" />
<meta property="article:tag" content="Performance" />
<meta property="article:tag" content="Database" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="SQL Query Optimization Techniques - Complete Guide" />
<meta name="twitter:description" content="Learn advanced SQL optimization techniques including indexing, query plans, and performance tuning." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-images/blog-sql-optimization.png" />
```

## 🗣️ Testimonials Page

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://raj-singh-portfolio.com/testimonials" />
<meta property="og:title" content="Testimonials | Raj Singh - Data Analyst" />
<meta property="og:description" content="See what colleagues and managers say about working with Raj Singh on data analytics projects and implementations." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-images/testimonials.png" />
<meta property="og:site_name" content="Raj Singh - Data Analyst" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Testimonials | Raj Singh - Data Analyst" />
<meta name="twitter:description" content="See what colleagues and managers say about working with Raj Singh." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-images/testimonials.png" />
```

## 💼 Job Tools Pages

### Job Tailor Tool

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://raj-singh-portfolio.com/job-tailor" />
<meta property="og:title" content="Job Application Tailor | Raj Singh" />
<meta property="og:description" content="Instantly generate tailored cover letters, resume bullets, and LinkedIn messages from any job description. Optimize your application in seconds." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-images/job-tailor.png" />
<meta property="og:site_name" content="Raj Singh - Data Analyst" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Job Application Tailor | Raj Singh" />
<meta name="twitter:description" content="Generate tailored cover letters, resume bullets, and LinkedIn messages from job descriptions." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-images/job-tailor.png" />
```

### ATS Keywords Analyzer

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://raj-singh-portfolio.com/ats-keywords" />
<meta property="og:title" content="ATS Keywords Analyzer | Raj Singh" />
<meta property="og:description" content="Extract top 20 ATS keywords from job descriptions. Find alternate job titles and optimize your resume to pass Applicant Tracking Systems." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-images/ats-analyzer.png" />
<meta property="og:site_name" content="Raj Singh - Data Analyst" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="ATS Keywords Analyzer | Raj Singh" />
<meta name="twitter:description" content="Extract ATS keywords and optimize your resume for tracking systems." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-images/ats-analyzer.png" />
```

## ❓ FAQ Page

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://raj-singh-portfolio.com/faq" />
<meta property="og:title" content="FAQ - About Raj Singh | Data Analyst" />
<meta property="og:description" content="Frequently asked questions about Raj Singh's background, skills, project methodologies, and career goals." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-images/faq.png" />
<meta property="og:site_name" content="Raj Singh - Data Analyst" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="FAQ - About Raj Singh" />
<meta name="twitter:description" content="Frequently asked questions about Raj Singh's background and skills." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-images/faq.png" />
```

## 📧 Contact Page

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://raj-singh-portfolio.com/contact" />
<meta property="og:title" content="Contact Raj Singh | Data Analyst" />
<meta property="og:description" content="Get in touch with Raj Singh for data analytics opportunities, collaborations, or inquiries." />
<meta property="og:image" content="https://raj-singh-portfolio.com/og-images/contact.png" />
<meta property="og:site_name" content="Raj Singh - Data Analyst" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Contact Raj Singh | Data Analyst" />
<meta name="twitter:description" content="Get in touch with Raj Singh for opportunities and collaborations." />
<meta name="twitter:image" content="https://raj-singh-portfolio.com/og-images/contact.png" />
```

## 🎨 OG Image Dimensions & Best Practices

### Recommended Sizes

- **Default (1200x630px):** Best for most platforms
- **Square (1200x1200px):** Instagram, Pinterest
- **Vertical (600x1200px):** Stories on Instagram/Facebook
- **Minimum:** 200x200px (smaller files)

### Design Guidelines

1. **Text on Image:**
   - Use readable fonts (minimum 48px for titles)
   - High contrast (light text on dark or vice versa)
   - Avoid placing text in center (gets cut off)

2. **Branding:**
   - Include your logo or initials
   - Use consistent color scheme (dark theme)
   - Add your name or company branding

3. **Format:**
   - PNG (lossless, supports transparency)
   - JPG (smaller file size, supported everywhere)
   - WebP (best compression, check support)

## 🚀 Dynamic OG Image Generator

For production, consider using a dynamic OG image generator service:

### Option 1: Vercel OG (Built-in, Recommended)

Vercel provides built-in OG image generation:

```typescript
// pages/api/og.tsx (inside App Router)
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectTitle = searchParams.get('title') || 'Data Analytics Project';
  const projectName = searchParams.get('project') || 'Portfolio';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'white',
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          width: '100%',
          height: '100%',
          padding: '50px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: '40px', fontSize: '80px', fontWeight: 'bold' }}>
          {projectTitle}
        </div>
        <div style={{ fontSize: '30px', opacity: 0.7 }}>
          by {projectName} | Data Analyst
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

// Usage in meta tags:
// <meta property="og:image" content="https://your-domain.com/api/og?title=HR%20Dashboard&project=Raj%20Singh" />
```

### Option 2: Open Graph Image Generator

Use `og-image` library (self-hosted):

```bash
npm install og-image
```

### Option 3: Static Image Service

For simpler approach, use a static image library:

```typescript
// Generate image in Node.js and save
import { createCanvas } from 'canvas';

function generateOGImage(title: string, role: string) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, '#1f2937');
  gradient.addColorStop(1, '#111827');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);
  
  // Title text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(title, 600, 250);
  
  // Role text
  ctx.font = '30px Inter';
  ctx.opacity = 0.7;
  ctx.fillText(role, 600, 400);
  
  return canvas.buffer('image/png');
}
```

## 🔗 Testing Your OG Tags

### Tools to Test

1. **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/sharing
2. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector
4. **OG Preview:** https://www.opengraphcheck.com/

### Steps

1. Visit the testing tool
2. Enter your URL
3. Check:
   - ✓ Title displays correctly
   - ✓ Description shows
   - ✓ Image loads (1200x630px)
   - ✓ No warnings or errors

## 📋 Checklist

- [ ] All pages have unique og:title and og:description
- [ ] og:image URLs are absolute (include domain)
- [ ] Images are 1200x630px or larger
- [ ] og:url matches the actual page URL
- [ ] Twitter Card tags included on all pages
- [ ] og:type is appropriate (website, article, etc.)
- [ ] Tested with Facebook Sharing Debugger
- [ ] Tested with Twitter Card Validator
- [ ] Tested with LinkedIn Post Inspector

## 🔄 Implementation in React

See [OG_IMPLEMENTATION_REACT.md](./OG_IMPLEMENTATION_REACT.md) for React integration examples.
