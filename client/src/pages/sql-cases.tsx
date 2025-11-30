import React, { useState } from "react";

import Layout from "@/components/layout";
import { sqlCaseStudies } from "@/data/portfolio";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Database, Copy, Download } from "lucide-react";

export default function SQLCaseStudies() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId(openId === id ? null : id);
  }

  function downloadAllSQL() {
    const all = sqlCaseStudies
      .map((caseStudy) => {
        return `-- Case Study: ${caseStudy.title}\n-- Scenario: ${caseStudy.scenario}\n\n` +
          caseStudy.queries.map((q) => `-- Query: ${q.title}\n` + q.code + "\n\n").join("");
      })
      .join("\n\n");

    const blob = new Blob([all], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sql-case-studies.sql";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      // minimal UX feedback — keep lightweight
      window.dispatchEvent(new CustomEvent("notify", { detail: "SQL copied" }));
    } catch (e) {
      alert("Could not copy to clipboard — please select and copy manually.");
    }
  }

  return (
    <Layout>
      <div className="bg-slate-950 text-white py-16 border-b border-white/10">
        <div className="container px-4 mx-auto">
          <div className="flex items-center gap-3 mb-4 text-primary-foreground/80">
            <Terminal size={24} />
            <span className="font-mono text-sm">SELECT * FROM skills WHERE type = 'SQL';</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">SQL Case Studies</h1>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            A repository of complex SQL problems solved using PostgreSQL syntax. Featuring Window Functions, CTEs, Aggregations, and Performance Optimization techniques.
          </p>
        </div>
      </div>

      <div className="container px-4 mx-auto py-12">
        <div className="flex justify-end mb-6">
          <button onClick={downloadAllSQL} className="inline-flex items-center gap-2 rounded bg-emerald-600 px-3 py-2 text-sm font-medium">
            <Download size={16} /> Download All SQL
          </button>
        </div>

        <div className="grid gap-8">
          {sqlCaseStudies.map((study) => (
            <Card key={study.id} className="border-2 shadow-none overflow-hidden">
              <CardHeader className="bg-muted/30 border-b pb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <Database size={20} className="text-primary" /> {study.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-base">{study.scenario}</CardDescription>

                    {/* Skills badges (new) */}
                    {(() => {
                      const skills = (study as any).skills as string[] | undefined;
                      return skills && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {skills.map((s: string) => (
                            <Badge key={s} className="text-xs px-2 py-1" variant="secondary">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="text-right">
                    <Badge variant="outline" className="w-fit h-fit py-1 px-3 border-primary/30 text-primary bg-primary/5">
                      {study.queries.length} Queries
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {/* Optional: show tables at the top of expanded content */}
                  {study.queries.map((query, index) => (
                    <AccordionItem key={index} value={`item-${study.id}-${index}`} className="border-b last:border-0">
                      <AccordionTrigger className="px-6 hover:bg-muted/20 hover:no-underline py-4">
                        <div className="text-left">
                          <div className="font-mono text-xs text-muted-foreground mb-1">QUERY {index + 1}</div>
                          <div className="font-medium text-base">{query.title}</div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-6 pb-6 pt-2 bg-muted/10">
                        {/* Show tables used (if present in data) */}
                        {((study as any).tables) && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-300">Tables Used</h4>
                            <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5">
                              {((study as any).tables as string[]).map((t: string) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground mb-4">{query.description}</p>

                        <div className="relative rounded-lg overflow-hidden border bg-slate-950 shadow-inner">
                          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            <span className="ml-2 font-mono text-xs text-slate-500">sql_query.sql</span>

                            <div className="ml-auto flex items-center gap-2">
                              <button
                                className="inline-flex items-center gap-2 rounded border px-2 py-1 text-xs"
                                onClick={() => copyToClipboard(query.code)}
                                title="Copy SQL"
                              >
                                <Copy size={14} /> Copy
                              </button>
                            </div>
                          </div>

                          <pre className="p-4 overflow-x-auto">
                            <code className="font-mono text-sm text-blue-100">{query.code}</code>
                          </pre>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-sm text-muted-foreground">Tip: use the "Download All SQL" button to provide recruiters a single script. The badges help highlight skills at a glance.</div>
      </div>
    </Layout>
  );
}
