import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  relevance: number;
}

const SearchPage: React.FC = () => {
  const location = useLocation();
  const url = location.state?.url || "example.com";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return [];

    // Simulate different results based on query
    const mockResults: SearchResult[] = [
      {
        id: "1",
        title: `${searchQuery} - Main Documentation`,
        url: `https://${url}/docs/${searchQuery
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
        snippet: `Comprehensive guide about ${searchQuery}. Learn how to implement and optimize ${searchQuery} for your projects.`,
        relevance: 0.95,
      },
      {
        id: "2",
        title: `Getting Started with ${searchQuery}`,
        url: `https://${url}/tutorials/getting-started-with-${searchQuery
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
        snippet: `This tutorial walks you through the basics of ${searchQuery} and provides examples of common use cases.`,
        relevance: 0.88,
      },
      {
        id: "3",
        title: `${searchQuery} API Reference`,
        url: `https://${url}/api/${searchQuery
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
        snippet: `Complete API documentation for ${searchQuery} including parameters, return values, and example code.`,
        relevance: 0.82,
      },
      {
        id: "4",
        title: `Advanced ${searchQuery} Techniques`,
        url: `https://${url}/advanced/${searchQuery
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
        snippet: `Explore advanced techniques and best practices for ${searchQuery} implementation in complex scenarios.`,
        relevance: 0.75,
      },
      {
        id: "5",
        title: `${searchQuery} FAQ`,
        url: `https://${url}/faq#${searchQuery
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
        snippet: `Frequently asked questions about ${searchQuery} with detailed answers from our experts.`,
        relevance: 0.68,
      },
    ];

    return mockResults;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);

    setTimeout(() => {
      setResults(mockSearch(query));
      setIsSearching(false);
    }, 800);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Search Information</h2>
              <p className="text-gray-600 text-sm">
                Your search engine for{" "}
                <span className="font-semibold text-indigo-600">{url}</span> is
                ready to use.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Pages Indexed</p>
                  <p className="text-lg font-semibold">1,248</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="text-lg font-semibold">Just now</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Search Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Use quotes for exact phrases</li>
                <li>• Add + to require a term</li>
                <li>• Add - to exclude a term</li>
                <li>• Use OR between terms for either/or</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for anything..."
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                disabled={isSearching}
              >
                {isSearching ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Search className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>

          <AnimatePresence>
            {isSearching ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
                  >
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                ))}
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-sm text-gray-500 mb-2">
                  {results.length} results for "{query}"
                </p>

                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                        {result.title}
                      </h3>
                      <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
                        {Math.round(result.relevance * 100)}% match
                      </span>
                    </div>

                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-600 hover:underline flex items-center mb-2"
                    >
                      {result.url}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>

                    <p className="text-gray-600 mb-4">{result.snippet}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button className="text-xs flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition-colors">
                          <ThumbsUp className="h-3 w-3" />
                          <span>Helpful</span>
                        </button>
                        <button className="text-xs flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition-colors">
                          <ThumbsDown className="h-3 w-3" />
                          <span>Not helpful</span>
                        </button>
                      </div>

                      <button
                        onClick={() => copyToClipboard(result.url, result.id)}
                        className="text-xs flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition-colors"
                      >
                        {copied === result.id ? (
                          <>
                            <Check className="h-3 w-3 text-green-500" />
                            <span className="text-green-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : query && !isSearching ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-gray-600">
                  We couldn't find any results for "{query}". Try using
                  different keywords or simplifying your search.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;
