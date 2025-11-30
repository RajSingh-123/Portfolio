import { useState, useEffect, useCallback, useRef } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, X } from "lucide-react";
import { Link } from "wouter";
import { getSearchIndex, getFuseInstance, searchItems, type SearchItem } from "@/lib/searchIndex";
import { Button } from "@/components/ui/button";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchIndex = getSearchIndex();
  const fuseInstance = getFuseInstance();

  // Get all unique tags
  const allTags = Array.from(
    new Set(searchIndex.flatMap((item) => item.tags))
  ).sort();

  // Perform search
  useEffect(() => {
    if (!query.trim() && selectedTags.length === 0) {
      setResults(searchIndex.slice(0, 10)); // Show first 10 items
      return;
    }

    const filtered = searchItems(query, fuseInstance, {
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    });

    setResults(filtered);
    setSelectedIndex(0);
  }, [query, selectedTags, searchIndex, fuseInstance]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        const item = results[selectedIndex];
        if (item) {
          window.location.href = item.href;
          onOpenChange(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, results, selectedIndex, onOpenChange]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-lg max-h-[80vh] flex flex-col">
        <div className="flex flex-col border-b">
          <div className="flex items-center gap-2 px-4 py-3">
            <SearchIcon size={18} className="text-muted-foreground" />
            <input
              ref={inputRef}
              placeholder="Search projects, skills, resume..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="p-1 hover:bg-muted rounded">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Tag Filter Bar */}
          {allTags.length > 0 && (
            <div className="px-4 py-2 border-t flex flex-wrap gap-1 max-h-16 overflow-y-auto">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer text-xs"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">No results found</p>
            </div>
          ) : (
            <div className="divide-y">
              {results.map((item, idx) => (
                <Link key={item.id} href={item.href}>
                  <a
                    onClick={() => onOpenChange(false)}
                    className={`block px-4 py-3 transition-colors cursor-pointer ${
                      idx === selectedIndex
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.icon}</span>
                          <div>
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[10px] py-0 px-1">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="outline" className="text-[10px] py-0 px-1">
                              +{item.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize flex-shrink-0">
                        {item.type}
                      </span>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-2 text-xs text-muted-foreground flex justify-between">
          <span>Use ↑↓ to navigate, ↵ to select</span>
          <span>Press Cmd+K to close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
