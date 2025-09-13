import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchBooks } from "../store/features/bookThunk.js";
import { clearBooks } from "../store/features/bookSlice.js";
import SearchBar from "../components/custom/SearchBar.jsx";
import BookList from "../components/custom/BookList";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler.jsx";
import { Book } from "lucide-react"; // Lucide icon
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const dispatch = useDispatch();
  const {
    items: books,
    lastQuery,
    loading,
  } = useSelector((state) => state.books);
  const [query, setQuery] = useState(lastQuery || "");

  useEffect(() => {
    if (lastQuery) {
      dispatch(fetchBooks(lastQuery));
    }
  }, [dispatch, lastQuery]);

  const handleSearch = (q) => {
    setQuery(q);
    if (q.trim()) {
      dispatch(fetchBooks(q));
    } else {
      dispatch(clearBooks());
      localStorage.removeItem("lastBooks");
      localStorage.removeItem("lastQuery");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 
      dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors"
    >
      {/* Mode Toggle Button - placed at top center */}
      <div className="flex justify-center pt-6">
        <AnimatedThemeToggler />
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mt-6">
        <div className="flex items-center justify-center gap-0">
          <Book className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
            ReadQuest
          </h1>
        </div>
        <Badge className="mt-2 text-sm bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
          Embark on your next great reading adventure
        </Badge>
      </div>

      {/* Search Section */}
      <Card className="max-w-2xl mx-auto mt-6 shadow-lg border-0 rounded-2xl">
        <CardContent className="p-6">
          <SearchBar onSearch={handleSearch} initialQuery={query} />
        </CardContent>
      </Card>

      {/* Results */}
      <div className="max-w-4xl mx-auto mt-10">
        <BookList books={books} loading={loading} />
      </div>
    </div>
  );
}
