"use client";

import { useState, useEffect } from "react";
import { Search, Book, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SearchBar({ onSearch, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);

  // Update local state if initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      onSearch(trimmed);
      localStorage.setItem("lastQuery", trimmed);
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); // notify parent to clear results
    localStorage.removeItem("lastBooks");
    localStorage.removeItem("lastQuery");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          Find Your Next Great Read
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for books, authors, or subjects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
            {query && (
              <Button
                onClick={handleClear}
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            className="w-full sm:w-auto justify-center"
          >
            <span className="hidden xs:inline">Search</span>
            <span className="xs:hidden">Go</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
