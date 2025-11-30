import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Github, ExternalLink } from "lucide-react";

interface CaseStudyData {
  title: string;
  subtitle?: string;
  description: string;
  fullDescription?: string;
  image: string;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
  keyMetrics?: Array<{ label: string; value: string }>;
  challenge?: string;
  solution?: string;
  results?: string[];
}

interface ProjectCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudyData;
}

export const ProjectCaseModal: React.FC<ProjectCaseModalProps> = ({
  isOpen,
  onClose,
  caseStudy,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="modal-case-study">
        <DialogHeader>
          <DialogTitle className="text-2xl">{caseStudy.title}</DialogTitle>
          {caseStudy.subtitle && (
            <p className="text-sm text-muted-foreground mt-2">{caseStudy.subtitle}</p>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image */}
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-64 object-cover rounded-lg"
            loading="lazy"
          />

          {/* Short Description */}
          <p className="text-base text-muted-foreground leading-relaxed">
            {caseStudy.description}
          </p>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          {caseStudy.keyMetrics && caseStudy.keyMetrics.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-3">
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {caseStudy.keyMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-muted/30 p-3 rounded-lg border"
                    data-testid={`metric-${metric.label}`}
                  >
                    <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                    <p className="font-bold text-lg">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenge */}
          {caseStudy.challenge && (
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">
                Challenge
              </h3>
              <p className="text-muted-foreground">{caseStudy.challenge}</p>
            </div>
          )}

          {/* Solution */}
          {caseStudy.solution && (
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">
                Solution
              </h3>
              <p className="text-muted-foreground">{caseStudy.solution}</p>
            </div>
          )}

          {/* Results */}
          {caseStudy.results && caseStudy.results.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-2">
                Results
              </h3>
              <ul className="space-y-2">
                {caseStudy.results.map((result, idx) => (
                  <li key={idx} className="flex gap-2 text-muted-foreground">
                    <span className="text-primary font-bold">✓</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Description */}
          {caseStudy.fullDescription && (
            <div className="bg-muted/20 p-4 rounded-lg border">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {caseStudy.fullDescription}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            {caseStudy.repoUrl && (
              <Button
                variant="outline"
                asChild
                className="flex-1"
                data-testid="btn-modal-repo"
              >
                <a href={caseStudy.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={16} className="mr-2" />
                  View Repository
                </a>
              </Button>
            )}
            {caseStudy.demoUrl && (
              <Button
                variant="outline"
                asChild
                className="flex-1"
                data-testid="btn-modal-demo"
              >
                <a href={caseStudy.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} className="mr-2" />
                  View Live Demo
                </a>
              </Button>
            )}
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCaseModal;
