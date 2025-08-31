'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w200";

interface TVSeries {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

const MoviePage = () => {
  const [series, setSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";
  const BASE_URL = "https://api.themoviedb.org/3";
  const seriesURL = `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await axios.get(seriesURL);
        setSeries(res.data.results);
      } catch (err) {
        setError("Failed to fetch series");
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [seriesURL]);

  if (loading)
    return <p className="text-center text-gray-900 mt-4 text-3xl">Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (series.length === 0) return <p>No series found</p>;

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-600 pt-5">
        Series List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7 lg:mx-24">
        {series.map((tv) => (
          <Link href={`/series-detail/${tv.id}`} key={tv.id}>
            <div
              className="h-full w-full p-2 rounded shadow-md hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <img
                src={`${IMAGE_BASE_URL}${POSTER_SIZE}${tv.poster_path}`}
                alt={tv.name}
                className="bg-cover rounded w-full"
              />
              <h2 className="mt-2 text-xl font-medium">{tv.name}</h2>
              <p className="text-sm">{tv.first_air_date}</p>
              <p className="text-xs text-amber-400 font-bold flex space-x-2 items-center">
                <FaStar />
                <span>{tv.vote_average.toFixed(1)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
