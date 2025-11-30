# Dynamic OG Image Generator Setup

This guide provides instructions for setting up a **serverless OG image generator** to dynamically create social sharing images with project titles, your name, and custom content.

## 🎯 Overview

A dynamic OG image generator allows you to create unique preview images for each page without manually creating dozens of images. Instead of:

```
/og-image-home.png
/og-image-project-1.png
/og-image-project-2.png
...
```

You generate them on-the-fly:

```
/api/og?title=HR%20Dashboard&role=Data%20Analyst
```

## 🚀 Setup Options

### Option 1: Vercel OG (Recommended for Vercel Deployments)

**Best for:** Vercel-hosted portfolios (free, zero setup)

#### Installation

```bash
npm install @vercel/og
```

#### Create Edge Function

Create `pages/api/og.tsx` (for Next.js or Vite with edge functions):

```typescript
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Get parameters from query string
    const title = searchParams.get('title') || 'Raj Singh - Data Analyst';
    const description = searchParams.get('desc') || 'Portfolio & Projects';
    const project = searchParams.get('project') || '';
    const type = searchParams.get('type') || 'default'; // default, project, blog

    // Conditionally render different layouts
    let content;
    
    if (type === 'project') {
      content = (
        <div
          style={{
            display: 'flex',
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            width: '100%',
            height: '100%',
            padding: '60px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '32px',
                fontWeight: 'bold',
              }}
            >
              RS
            </div>
            <div style={{ color: '#9ca3af', fontSize: '24px' }}>
              Data Analyst Portfolio
            </div>
          </div>

          {/* Main Content */}
          <div>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '32px',
                color: '#d1d5db',
                marginBottom: '40px',
              }}
            >
              {description}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              width: '100%',
              justifyContent: 'space-between',
              borderTop: '1px solid #374151',
              paddingTop: '40px',
            }}
          >
            <div style={{ fontSize: '28px', color: '#9ca3af' }}>
              raj-singh-portfolio.com
            </div>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                fontSize: '20px',
                color: '#9ca3af',
              }}
            >
              <span>💻 Code</span>
              <span>📊 Data</span>
              <span>🎯 Analytics</span>
            </div>
          </div>
        </div>
      );
    } else if (type === 'blog') {
      content = (
        <div
          style={{
            display: 'flex',
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            width: '100%',
            height: '100%',
            padding: '60px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ color: '#3b82f6', fontSize: '28px', marginBottom: '20px' }}>
            📖 Blog Post
          </div>
          <div
            style={{
              fontSize: '66px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '30px',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#9ca3af',
            }}
          >
            by Raj Singh • Data Analyst
          </div>
        </div>
      );
    } else {
      // Default layout
      content = (
        <div
          style={{
            display: 'flex',
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            width: '100%',
            height: '100%',
            padding: '80px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '36px',
              color: '#d1d5db',
              marginBottom: '40px',
            }}
          >
            {description}
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#9ca3af',
            }}
          >
            raj-singh-portfolio.com
          </div>
        </div>
      );
    }

    return new ImageResponse(content, {
      width: 1200,
      height: 630,
    });
  } catch (error) {
    console.error('OG Image generation failed:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
```

#### Update Meta Tags

In your HTML or React component:

```jsx
// React component
import { useLocation } from 'wouter';

export function Head() {
  const [location] = useLocation();
  
  // Generate OG image URL based on current page
  let ogImageParams = new URLSearchParams();
  
  if (location === '/projects/hr-analytics') {
    ogImageParams.append('title', 'HR Attrition & Retention Dashboard');
    ogImageParams.append('desc', 'Interactive Power BI analytics');
    ogImageParams.append('type', 'project');
  } else if (location.startsWith('/blog/')) {
    ogImageParams.append('title', 'SQL Query Optimization Guide');
    ogImageParams.append('type', 'blog');
  }
  
  const ogImageUrl = `https://raj-singh-portfolio.com/api/og?${ogImageParams.toString()}`;
  
  return (
    <>
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </>
  );
}
```

### Option 2: Node.js Serverless Function (AWS Lambda, Netlify Functions)

Create a serverless function that generates images server-side:

#### Installation

```bash
npm install canvas jimp sharp
```

#### Create Function

Create `functions/og-image.js` or `api/og-image.ts`:

```typescript
import { createCanvas } from 'canvas';

export default async function handler(req: any) {
  const { title, description, role, type } = req.query;

  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, '#1f2937');
  gradient.addColorStop(1, '#111827');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);

  // Draw border accent
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 1160, 590);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  wrapText(ctx, title, 600, 200, 1100, 100);

  // Description
  ctx.fillStyle = '#d1d5db';
  ctx.font = '32px Arial';
  wrapText(ctx, description, 600, 400, 1100, 50);

  // Footer
  ctx.fillStyle = '#9ca3af';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${role} • raj-singh-portfolio.com`, 600, 580);

  // Return image
  const imageBuffer = canvas.toBuffer('image/png');
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
    body: imageBuffer.toString('base64'),
    isBase64Encoded: true,
  };
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      context.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}
```

#### Deploy to Netlify Functions

1. Create `netlify/functions/og-image.ts`
2. Deploy with:
   ```bash
   netlify deploy
   ```
3. Use in meta tags:
   ```html
   <meta property="og:image" content="https://your-domain.com/.netlify/functions/og-image?title=HR%20Dashboard&description=Analytics&role=Data%20Analyst" />
   ```

### Option 3: Use External Service (og-image.dev)

Quick setup without server code:

```html
<!-- Using og-image.dev service -->
<meta property="og:image" content="https://og-image.dev/**Raj%20Singh**%20Data%20Analyst/?.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg" />
```

## 🔄 Integration in React App

### Update App.tsx with Dynamic Meta Tags

```typescript
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export function useOGTags(title: string, description: string, ogImage?: string) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update OG meta tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    
    if (ogImage) {
      updateMetaTag('og:image', ogImage);
    }
  }, [title, description, ogImage]);
}

function updateMetaTag(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

// In your page components:
export function ProjectPage({ projectId }: { projectId: string }) {
  const project = getProject(projectId);
  
  const ogImage = `/api/og?title=${encodeURIComponent(project.title)}&type=project&desc=${encodeURIComponent(project.summary)}`;
  
  useOGTags(
    `${project.title} | Raj Singh`,
    project.summary,
    ogImage
  );

  return (
    // ... page content
  );
}
```

## 📊 Testing

Test your generated images:

```bash
# Vercel OG
curl "https://your-domain.com/api/og?title=Test&desc=Description" > test.png

# Check image
open test.png

# Or use online tools:
# - https://www.opengraphcheck.com/
# - https://metatags.io/
# - https://cards-dev.twitter.com/validator
```

## 📈 Performance Tips

1. **Cache Aggressively**
   ```typescript
   'Cache-Control': 'public, max-age=86400' // 24 hours
   ```

2. **Generate Once, Reuse**
   - Generate image on first request
   - Save to CDN/S3
   - Serve cached version

3. **Optimize Images**
   - Use PNG with optimization
   - Consider WebP format
   - Compress after generation

4. **Monitor Usage**
   - Track API calls
   - Set rate limits
   - Monitor for abuse

## 🔐 Security

```typescript
// Validate query parameters
const allowedParams = ['title', 'description', 'type'];
const params = new URLSearchParams(searchParams);

for (const [key, value] of params) {
  if (!allowedParams.includes(key)) {
    throw new Error('Invalid parameter');
  }
  // Limit string length to prevent abuse
  if (typeof value === 'string' && value.length > 500) {
    throw new Error('Parameter too long');
  }
}
```

## 🎨 Customization

Adjust the design in your image generation code:

```typescript
// Colors
const primaryColor = '#3b82f6';
const backgroundColor = '#1f2937';
const textColor = '#ffffff';

// Fonts
const titleFont = 'bold 72px "Segoe UI", Arial';
const descFont = '32px "Segoe UI", Arial';

// Layout
const padding = 60;
const borderRadius = 20;
```

## 📚 Additional Resources

- [Vercel OG Docs](https://vercel.com/docs/functions/edge-functions/og-image-generation)
- [Canvas.js Documentation](https://github.com/Automattic/node-canvas)
- [Sharp Image Library](https://sharp.pixelplumbing.com/)
- [Open Graph Protocol](https://ogp.me/)

## ✅ Deployment Checklist

- [ ] Function deployed and accessible
- [ ] Image generation tested locally
- [ ] Meta tags updated with new image URLs
- [ ] Cached appropriately (24 hours recommended)
- [ ] Tested with all social platforms
- [ ] Performance acceptable (<2s generation)
- [ ] Error handling in place
- [ ] Security checks implemented
