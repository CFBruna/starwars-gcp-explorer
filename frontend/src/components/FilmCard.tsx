import type { Film } from '../types';

interface FilmCardProps {
    film: Film;
}

export default function FilmCard({ film }: FilmCardProps) {
    return (
        <div className="bg-gray-800 rounded-lg p-6 border-2 border-gray-700 hover:border-purple-500 transition-all shadow-lg">
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-purple-400">{film.title}</h3>
                <span className="text-yellow-500 font-bold text-lg">EP {film.episode_id}</span>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-3 italic">
                {film.opening_crawl}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-700 pt-4">
                <div>
                    <span className="text-gray-400">Director:</span>
                    <span className="ml-2 text-white">{film.director}</span>
                </div>

                <div>
                    <span className="text-gray-400">Producer:</span>
                    <span className="ml-2 text-white">{film.producer}</span>
                </div>

                <div className="col-span-2">
                    <span className="text-gray-400">Release Date:</span>
                    <span className="ml-2 text-white">{new Date(film.release_date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
