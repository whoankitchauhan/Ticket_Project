import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, ChevronRight, Search, ThumbsDown, ThumbsUp } from "lucide-react";
import { getKnowledgeBaseArticles, getKnowledgeBaseCategories, searchKnowledgeBase, rateFAQ } from "@/api/knowledge";
import { useToast } from "@/hooks/useToast";

export function KnowledgeBase() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { categoryId, articleId } = useParams<{ categoryId?: string; articleId?: string }>();
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId || null);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState<"helpful" | "unhelpful" | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getKnowledgeBaseCategories();
        setCategories(categoriesData.categories);
        
        if (categoryId) {
          setSelectedCategory(categoryId);
          const articlesData = await getKnowledgeBaseArticles(categoryId);
          setArticles(articlesData.articles);
        }

        if (articleId) {
          const articleData = articlesData?.articles.find((a: any) => a._id === articleId) || null;
          setSelectedArticle(articleData);
        }

        setLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load knowledge base",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, articleId, toast]);

  const handleCategorySelect = async (id: string) => {
    setSelectedCategory(id);
    setSelectedArticle(null);
    try {
      const data = await getKnowledgeBaseArticles(id);
      setArticles(data.articles);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load articles for this category",
      });
    }
  };

  const handleArticleSelect = (article: any) => {
    setSelectedArticle(article);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchKnowledgeBase(searchQuery);
      setSearchResults(data.results);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to search the knowledge base",
      });
    }
  };

  const handleRateArticle = async (rating: "helpful" | "unhelpful") => {
    if (!selectedArticle || userRating) return;

    try {
      await rateFAQ(selectedArticle._id, rating);
      setUserRating(rating);
      toast({
        title: "Thank you!",
        description: "Your feedback has been recorded.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit your rating",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground mt-1">
          Find answers to frequently asked questions and helpful guides
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search knowledge base..."
            className="pl-9 pr-16"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            className="absolute right-0 top-0"
            size="sm"
          >
            Search
          </Button>
        </div>
      </div>

      {isSearching && searchQuery ? (
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                {searchResults.length} results for "{searchQuery}"
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                setIsSearching(false);
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </CardHeader>
          <CardContent>
            {searchResults.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                <Search className="h-8 w-8 text-muted-foreground" />
                <p>No results found</p>
                <p className="text-sm">Try a different search term or browse categories</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <Card
                    key={result._id}
                    className="cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => handleArticleSelect(result)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{result.title}</h3>
                          <Badge variant="outline">
                            {result.category.name}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.excerpt}
                        </p>
                        <Button variant="link" className="p-0 h-auto flex items-center">
                          Read more <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : selectedArticle ? (
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{selectedArticle.title}</CardTitle>
              <CardDescription>
                Last updated: {new Date(selectedArticle.updatedAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              onClick={() => setSelectedArticle(null)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Was this article helpful?</h3>
              <div className="flex gap-2">
                <Button
                  variant={userRating === "helpful" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRateArticle("helpful")}
                  disabled={userRating !== null}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Yes, it helped
                  {userRating === "helpful" && <Check className="ml-1 h-3 w-3" />}
                </Button>
                <Button
                  variant={userRating === "unhelpful" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRateArticle("unhelpful")}
                  disabled={userRating !== null}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  No, I need more info
                  {userRating === "unhelpful" && <Check className="ml-1 h-3 w-3" />}
                </Button>
              </div>
              {userRating === "unhelpful" && (
                <div className="mt-4">
                  <Button onClick={() => navigate("/chat")}>
                    Chat with Support
                  </Button>
                </div>
              )}
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">Related Articles</h3>
              <div className="space-y-2">
                {selectedArticle.relatedArticles?.map((article: any) => (
                  <Button
                    key={article._id}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => handleArticleSelect(article)}
                  >
                    {article.title}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="categories">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="popular">Popular Articles</TabsTrigger>
          </TabsList>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card className="bg-card/60 backdrop-blur-sm h-fit">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                      selectedCategory === category._id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => handleCategorySelect(category._id)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="rounded-full p-1.5"
                        style={{ backgroundColor: category.color || "#4f46e5" }}
                      >
                        <div
                          className="h-3 w-3"
                          dangerouslySetInnerHTML={{ __html: category.icon }}
                        />
                      </div>
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="outline">{category.articleCount}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="md:col-span-2">
              <TabsContent value="categories" className="m-0">
                {selectedCategory ? (
                  <Card className="bg-card/60 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>
                        {
                          categories.find(
                            (c) => c._id === selectedCategory
                          )?.name
                        }
                      </CardTitle>
                      <CardDescription>
                        Select an article to read
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {articles.length === 0 ? (
                        <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                          <p>No articles found in this category</p>
                          <p className="text-sm">Please select another category</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {articles.map((article) => (
                            <Card
                              key={article._id}
                              className="cursor-pointer hover:bg-secondary/50 transition-colors"
                              onClick={() => handleArticleSelect(article)}
                            >
                              <CardContent className="p-4">
                                <div className="space-y-2">
                                  <h3 className="font-medium">{article.title}</h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {article.excerpt}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">
                                      Last updated: {new Date(article.updatedAt).toLocaleDateString()}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs">
                                      <ThumbsUp className="h-3 w-3 text-muted-foreground" />
                                      <span>{article.helpful || 0}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-card/60 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Search className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">Select a Category</h3>
                      <p className="mt-2 text-center text-muted-foreground">
                        Choose a category from the left to view related articles
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="popular" className="m-0">
                <Card className="bg-card/60 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Popular Articles</CardTitle>
                    <CardDescription>
                      Most viewed and helpful articles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {articles
                        .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
                        .slice(0, 5)
                        .map((article) => (
                          <Card
                            key={article._id}
                            className="cursor-pointer hover:bg-secondary/50 transition-colors"
                            onClick={() => handleArticleSelect(article)}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-medium">{article.title}</h3>
                                  <Badge variant="outline">
                                    {article.viewCount || 0} views
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {article.excerpt}
                                </p>
                                <Button variant="link" className="p-0 h-auto flex items-center">
                                  Read more <ChevronRight className="ml-1 h-3 w-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      )}
    </div>
  );
}