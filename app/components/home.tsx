'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w200";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

const MovieSeries = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";
  const BASE_URL = "https://api.themoviedb.org/3";
  const moviesURL = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(moviesURL);
        setMovies(res.data.results);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [moviesURL]);

  if (loading)
    return <p className="text-center text-gray-900 mt-4 text-3xl">Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (movies.length === 0) return <p>No movies found</p>;

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-600 pt-5">
        Popular Movies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:mx-24">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="h-full w-full p-2 rounded shadow-md hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            <img
              src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
              alt={movie.title}
              className="bg-cover rounded w-full"
            />
            <h2 className="mt-2 text-xl font-medium">{movie.title}</h2>
            <p className="text-sm">{movie.release_date}</p>
            <p className="text-xs text-amber-400 font-bold flex space-x-2 items-center">
              <FaStar />
              <span>{movie.vote_average.toFixed(1)}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSeries;
