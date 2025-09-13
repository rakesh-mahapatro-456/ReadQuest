import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Calendar, User, Eye, BookOpen } from "lucide-react";

export default function BookCard({ book }) {
  const { key, title, author_name, first_publish_year, cover_i } = book;

  // Open Library cover image
  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : null;

  // Book ID (for detail page)
  const bookId = key?.replace("/works/", "");

  // Get author initials for avatar fallback
  const getAuthorInitials = (authors) => {
    if (!authors || authors.length === 0) return "?";
    return authors[0]
      .split(" ")
      .map(name => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-background to-muted/20">
      {/* Cover Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback cover design */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-primary ${coverUrl ? 'hidden' : 'flex'}`}
          style={{ display: coverUrl ? 'none' : 'flex' }}
        >
          <BookOpen className="h-16 w-16 mb-4 opacity-40" />
          <div className="text-center px-4">
            <p className="text-sm font-medium line-clamp-3">{title}</p>
          </div>
        </div>

        {/* Overlay with quick action */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link to={`/book/${bookId}`}>
            <Button size="sm" variant="secondary" className="gap-2">
              <Eye className="h-4 w-4" />
              Quick View
            </Button>
          </Link>
        </div>

        {/* Publication year badge */}
        {first_publish_year && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 text-xs bg-background/90 backdrop-blur-sm"
          >
            {first_publish_year}
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        {/* Author Section */}
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="" /> {/* Could be enhanced with author photos */}
            <AvatarFallback className="text-xs bg-muted">
              {getAuthorInitials(author_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground truncate">
              {author_name?.join(", ") || "Unknown Author"}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{first_publish_year || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{author_name?.length || 0}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link to={`/book/${bookId}`} className="w-full block">
            <Button 
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" 
              variant="outline"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}