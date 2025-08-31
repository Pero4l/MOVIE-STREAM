'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useTheme } from 'next-themes';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[];
}

const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";

const MovieDetails = () => {
  const { theme } = useTheme();
  const params = useParams();
  const id = params?.id;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
        setMovie(res.data);
      } catch (err) {
        setError("Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-900 mt-4 text-3xl">Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!movie) return <p>No movie found</p>;

  return (
    <div className="p-1 flex items-center justify-center">
      <div className={theme === "dark" ? "bg-black lg:rounded-2xl shadow-lg p-6 lg:flex gap-20 w-full" : "bg-white text-black lg:rounded-2xl shadow-lg p-6 lg:flex gap-20 w-full"}>
        <img
          src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl mb-4 w-[500px] object-cover"
        />
        <div className="pt-10">
          <h1 className="text-3xl lg:text-5xl pb-5 font-bold  mb-2 text-center">
            {movie.title}
          </h1>

          <h2 className='text-center lg:pb-0 pb-3  text-sm mb-2'>Average Vote: {movie.vote_average}</h2>
          <p className="text-center lg:pb-0 pb-3  text-sm mb-2">
            Release Date: {movie.release_date}
          </p>
          <p className=" text-sm leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
