import type { Film } from '../types';

interface FilmCardProps {
    film: Film;
}

export default function FilmCard({ film }: FilmCardProps) {
    return (
        <div className="card-holographic rounded-lg p-6 group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold text-white tracking-wide uppercase group-hover:text-cyan-400 transition-colors flex-1 pr-4">
                    {film.title}
                </h3>
                <span className="text-[10px] font-mono text-cyan-500/50 border border-cyan-500/20 px-2 py-1 rounded whitespace-nowrap">
                    EPISODE {film.episode_id}
                </span>
            </div>

            <div className="flex-1">
                <p className="text-gray-400 text-xs leading-relaxed font-mono line-clamp-3 mb-4 opacity-80">
                    "{film.opening_crawl}"
                </p>
            </div>

            <div className="space-y-2 font-mono text-[10px] text-gray-500 border-t border-white/5 pt-4 mt-auto">
                <div className="flex justify-between">
                    <span>DIRECTOR</span>
                    <span className="text-cyan-300 text-right truncate max-w-[150px]">{film.director}</span>
                </div>
                <div className="flex justify-between">
                    <span>RELEASE DATE</span>
                    <span className="text-white">{new Date(film.release_date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
