import { Link } from "wouter";
import { ArrowRight, ExternalLink, Github, LayoutTemplate, Database, Activity, Clock, CheckCircle2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProjectCardProps {
  // New props format
  id?: string;
  title?: string;
  summary?: string;
  tech?: string[];
  thumbnail?: string;
  repoLink?: string | null;
  demoLink?: string | null;
  status?: string;
  type?: string;
  stars?: number;
  tags?: string[];
  onExpand?: () => void;
}

export default function ProjectCard(props: ProjectCardProps) {
  // Support both new and old prop formats
  const {
    id,
    title = "Untitled Project",
    summary = "",
    tech = [],
    thumbnail = "/placeholder.png",
    repoLink,
    demoLink,
    status = "Completed",
    type,
    stars,
    tags = [],
    onExpand
  } = props;
  const isComingSoon = status === "Coming Soon";

  const getStatusColor: Record<string,string> = {
    Completed: "bg-green-100 text-green-700 border-green-300",
    "Under Review": "bg-yellow-100 text-yellow-700 border-yellow-300",
    Prototype: "bg-blue-100 text-blue-700 border-blue-300",
    "Coming Soon": "bg-gray-200 text-gray-700 border-gray-300",
    };

    const getTypeIcon = (t: string) => {
      switch (t) {
        case "Dashboard":
          return <LayoutTemplate size={14} className="mr-1" />;
        case "ETL":
          return <Database size={14} className="mr-1" />;
        case "EDA":
          return <Activity size={14} className="mr-1" />;
        default:
          return null;
      }
    };

    const CardUI = (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-muted-foreground/10 hover:border-primary/50 flex flex-col h-full">
      
      {/* THUMBNAIL */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* OVERLAY (COMING SOON) */}
        {isComingSoon && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white text-sm font-semibold tracking-wide">
              COMING SOON
            </span>
          </div>
        )}

        {/* STATUS BADGE */}
        <div
          className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium border backdrop-blur-md ${getStatusColor[status]} flex items-center`}
        >
          {status === "Completed" ? (
            <CheckCircle2 size={12} className="mr-1" />
          ) : (
            <Clock size={12} className="mr-1" />
          )}
          {status}
        </div>

        {/* STARS */}
        {stars !== undefined && (
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs font-medium bg-yellow-500/20 text-yellow-600 border border-yellow-500/30 backdrop-blur-md flex items-center gap-1">
            <Star size={12} className="fill-yellow-500 text-yellow-500" />
            {stars}
          </div>
        )}

        {/* OVERLAY ACTIONS */}
        {!isComingSoon && (
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {repoLink && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={repoLink} target="_blank" rel="noreferrer">
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background">
                        <Github size={16} />
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>View Code</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {demoLink && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href={demoLink} target="_blank" rel="noreferrer">
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background">
                        <ExternalLink size={16} />
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Live Demo</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          {type && (
            <Badge variant="outline" className="text-[10px] h-5 px-2 bg-primary/5 border-primary/20 text-primary flex items-center">
              {getTypeIcon(type)}
              {type}
            </Badge>
          )}
        </div>

        <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {summary}
        </p>

        {/* TAGS */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tech.slice(0, 3).map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal bg-muted hover:bg-muted-foreground/10">
              {t}
            </Badge>
          ))}
          {tech.length > 3 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{tech.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-4">
        <Button
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          disabled={isComingSoon}
        >
          {isComingSoon ? "Coming Soon" : "View Details"}
          {!isComingSoon && (
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );

  if (isComingSoon) return CardUI;

  return (
    <Link href={`/projects/${id}`}>
      <a>{CardUI}</a>
    </Link>
  );
}