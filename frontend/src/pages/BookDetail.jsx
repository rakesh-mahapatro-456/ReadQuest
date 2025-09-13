import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetail } from "../store/features/bookThunk.js";
import { clearBookDetail } from "../store/features/bookSlice.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Calendar, 
  BookOpen, 
  Tag, 
  FileText,
  AlertCircle,
  ExternalLink
} from "lucide-react";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookDetail, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (id) {
      dispatch(clearBookDetail());
      dispatch(fetchBookDetail(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Skeletons */}
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="aspect-[3/4] w-full rounded-md mb-4" />
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-5 w-24" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!bookDetail) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Alert>
          <BookOpen className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>No book details found</span>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const coverId = bookDetail.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;

  const description = bookDetail.description?.value || 
                     bookDetail.description || 
                     "No description available for this book.";

  const subjects = bookDetail.subjects || [];
  const authors = bookDetail.authorNames?.join(", ") || "Unknown Author";
  const publishDate = bookDetail.first_publish_date || bookDetail.created?.value?.split("T")[0] || "Unknown";
  const pageCount = bookDetail.number_of_pages || null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-muted-foreground">Book Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cover */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="relative mb-6 group">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={`Cover of ${bookDetail.title}`}
                    className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] rounded-lg shadow-lg bg-gradient-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center text-primary">
                    <BookOpen className="h-16 w-16 mb-4 opacity-40" />
                    <p className="text-center text-sm font-medium px-4 line-clamp-3">
                      {bookDetail.title}
                    </p>
                  </div>
                )}
              </div>

              {/* View on Open Library */}
              <Button variant="ghost" className="w-full gap-2" asChild>
                <a 
                  href={`https://openlibrary.org/works/${id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Open Library
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Book Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl leading-tight">
                {bookDetail.title}
              </CardTitle>
              <p className="text-xl text-muted-foreground">{authors}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{publishDate}</span>
                </div>
                {pageCount && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{pageCount} pages</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subjects/Tags */}
          {subjects.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Subjects & Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {subjects.slice(0, 20).map((subject, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      {subject}
                    </Badge>
                  ))}
                  {subjects.length > 20 && (
                    <Badge variant="outline">
                      +{subjects.length - 20} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
