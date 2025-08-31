'use client';

import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w200";

interface SearchResultItem {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

const SearchClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";

  useEffect(() => {
    if (!query.trim()) return;

    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`
        );
        const filtered = res.data.results.filter(
          (item: any) => item.media_type === "movie" || item.media_type === "tv"
        );
        setResults(filtered);
      } catch {
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query) return <p className="text-center mt-10">Please enter a search query.</p>;

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Search Results for "{query}"
      </h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {results.map((item) => (
            <Link
              key={item.id}
              href={
                item.media_type === "movie"
                  ? `/movie-detail/${item.id}`
                  : `/series-detail/${item.id}`
              }
            >
              <div className="p-2 rounded shadow hover:scale-105 transition-transform cursor-pointer">
                <img
                  src={
                    item.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${item.poster_path}`
                      : "/no-image.jpg"
                  }
                  alt={item.title || item.name || "Poster"}
                  className="rounded w-full h-[300px] object-cover"
                />
                <h2 className="mt-2 text-lg font-semibold">{item.title || item.name}</h2>
                <p className="text-sm text-gray-500">
                  {item.release_date || item.first_air_date || "Unknown date"}
                </p>
                <p className="text-xs text-amber-500 flex items-center gap-1">
                  <FaStar />
                  <span>{item.vote_average.toFixed(1)}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center mt-10">No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchClient;
