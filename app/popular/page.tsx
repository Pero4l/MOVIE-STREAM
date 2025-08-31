'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w200";

interface TrendingItem {
  id: number;
  media_type: "movie" | "tv";
  title?: string;            // For movies
  name?: string;             // For TV shows
  poster_path: string;
  release_date?: string;     // For movies
  first_air_date?: string;   // For TV shows
  vote_average: number;
  genre_ids: number[];
}

const MoviePage = () => {
  const [items, setItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";
  const BASE_URL = "https://api.themoviedb.org/3";
  const moviesURL = `${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(moviesURL);
        setItems(res.data.results);
      } catch (err) {
        setError("Failed to fetch trending items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [moviesURL]);

  if (loading)
    return <p className="text-center text-gray-900 mt-4 text-3xl">Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (items.length === 0) return <p>No items found</p>;

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-600 pt-5">
        Trending This Week
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7 lg:mx-24">
        {items.map((item) => (
          <Link
            key={item.id}
            href={
              item.media_type === "movie"
                ? `/movie-detail/${item.id}`
                : `/series-detail/${item.id}`
            }
          >
            <div className="h-full w-full p-2 rounded shadow-md hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer">
              <img
                src={`${IMAGE_BASE_URL}${POSTER_SIZE}${item.poster_path}`}
                alt={item.title || item.name || "Poster"}
                className="bg-cover rounded w-full"
              />
              <h2 className="mt-2 text-xl font-medium">
                {item.title || item.name}
              </h2>
              <p className="text-sm">
                {item.release_date || item.first_air_date || "Unknown date"}
              </p>
              <p className="text-xs text-amber-400 font-bold flex space-x-2 items-center">
                <FaStar />
                <span>{item.vote_average.toFixed(1)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
