import Layout from "@/components/layout";
import { projects } from "@/data/portfolio";
import ProjectCard from "@/components/project-card";
import SkeletonCard from "@/components/skeletonCard";
import { useState, useMemo, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Extract unique values for filters
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tech.forEach(t => techs.add(t)));
    return ["All", ...Array.from(techs).sort()];
  }, []);

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    projects.forEach(p => {
      if (p.type) types.add(p.type);
    });
    return ["All", ...Array.from(types).sort()];
  }, []);

  const allStatuses = useMemo(() => {
    const statuses = new Set<string>();
    projects.forEach(p => {
      if (p.status) statuses.add(p.status);
    });
    return ["All", ...Array.from(statuses).sort()];
  }, []);

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesTech = selectedTech === "All" || project.tech.includes(selectedTech);
    const matchesType = selectedType === "All" || project.type === selectedType;
    const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTech && matchesType && matchesStatus && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedTech("All");
    setSelectedType("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedTech !== "All" || selectedType !== "All" || selectedStatus !== "All" || searchQuery !== "";

    const statusColors: Record<string, string> = {
    "Completed": "bg-green-100 text-green-700 border-green-300",
    "Under Review": "bg-yellow-100 text-yellow-700 border-yellow-300",
    "Prototype": "bg-blue-100 text-blue-700 border-blue-300",
    "Coming Soon": "bg-gray-200 text-gray-700 border-gray-300"
  };

  return (
    <Layout>
      <div className="bg-muted/30 py-12 border-b">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            A curated collection of data analytics projects demonstrating skills
            in SQL, Python, Power BI, Excel, and real-world problem solving.
          </p>
        </div>
      </div>

      <section className="container px-4 mx-auto py-12">
        {/* Filters Section */}
        <div className="bg-card border rounded-xl p-6 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            
            <div className="w-full md:w-1/4 space-y-2">
              <Label htmlFor="search" className="text-xs font-semibold uppercase text-muted-foreground">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="search"
                  placeholder="Search projects..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-1/4 space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">Technology</Label>
              <Select value={selectedTech} onValueChange={setSelectedTech}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Tech" />
                </SelectTrigger>
                <SelectContent>
                  {allTechs.map(tech => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/4 space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {allTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/4 space-y-2">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {allStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground mr-2 flex items-center">
                  <Filter size={14} className="mr-1" /> Active Filters:
                </span>
                {selectedTech !== "All" && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    {selectedTech} <X size={12} className="cursor-pointer hover:text-destructive" onClick={() => setSelectedTech("All")} />
                  </Badge>
                )}
                {selectedType !== "All" && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    {selectedType} <X size={12} className="cursor-pointer hover:text-destructive" onClick={() => setSelectedType("All")} />
                  </Badge>
                )}
                {selectedStatus !== "All" && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    {selectedStatus} <X size={12} className="cursor-pointer hover:text-destructive" onClick={() => setSelectedStatus("All")} />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1 pr-1">
                    Search: "{searchQuery}" <X size={12} className="cursor-pointer hover:text-destructive" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Showing {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredProjects.map((project) => (
              <div key={project.id} className="relative group">
                <ProjectCard {...project} />

                <Badge
                className={`absolute top-3 left-3 border text-xs px-2 py-0.5 rounded-md ${statusColors[project.status]}`}
                >
                {project.status}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Filter className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button onClick={clearFilters}>Reset Filters</Button>
          </div>
        )}
      </section>
    </Layout>
  );
}
