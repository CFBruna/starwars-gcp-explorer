import type { Starship } from '../types';

interface StarshipCardProps {
    starship: Starship;
}

export default function StarshipCard({ starship }: StarshipCardProps) {
    return (
        <div className="card-holographic rounded-lg p-6 group">
            <div className="mb-4 border-b border-white/5 pb-4">
                <h3 className="text-lg font-bold text-white tracking-wide uppercase group-hover:text-cyan-400 transition-colors truncate">
                    {starship.name}
                </h3>
                <span className="text-[10px] font-mono text-gray-500 uppercase block mt-1 truncate">
                    {starship.model}
                </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
                {/* Class Badge */}
                <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-cyan-900/30 text-cyan-300 rounded text-[10px] border border-cyan-500/20">
                        {starship.starship_class}
                    </span>
                    <span className="text-gray-500">{starship.cost_in_credits === 'unknown' ? 'N/A' : `${starship.cost_in_credits} CR`}</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-white/5 p-2 rounded border-l-2 border-cyan-500">
                        <span className="block text-[9px] text-gray-500 mb-0.5">HYPERDRIVE</span>
                        <span className="text-white font-bold">{starship.hyperdrive_rating}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded border-l-2 border-orange-500">
                        <span className="block text-[9px] text-gray-500 mb-0.5">MGLT</span>
                        <span className="text-white font-bold">{starship.MGLT}</span>
                    </div>
                </div>

                {/* Capacity */}
                <div className="grid grid-cols-2 gap-4 text-[10px] text-gray-400 border-t border-white/5 pt-3">
                    <div>
                        <span>CREW: </span>
                        <span className="text-white">{starship.crew}</span>
                    </div>
                    <div>
                        <span>PASSENGERS: </span>
                        <span className="text-white">{starship.passengers}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
