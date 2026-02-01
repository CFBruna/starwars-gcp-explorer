import type { Starship } from '../types';

interface StarshipCardProps {
    starship: Starship;
}

export default function StarshipCard({ starship }: StarshipCardProps) {
    return (
        <div className="card-glow bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl">
            <h3 className="text-2xl font-bold text-[#4A9EFF] mb-2">{starship.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{starship.model}</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <span className="text-gray-400">Class:</span>
                    <span className="ml-2 text-white capitalize">{starship.starship_class}</span>
                </div>

                <div>
                    <span className="text-gray-400">Manufacturer:</span>
                    <span className="ml-2 text-white">{starship.manufacturer}</span>
                </div>

                <div>
                    <span className="text-gray-400">Crew:</span>
                    <span className="ml-2 text-white">{starship.crew}</span>
                </div>

                <div>
                    <span className="text-gray-400">Passengers:</span>
                    <span className="ml-2 text-white">{starship.passengers}</span>
                </div>

                <div>
                    <span className="text-gray-400">Hyperdrive:</span>
                    <span className="ml-2 text-white">{starship.hyperdrive_rating}</span>
                </div>

                <div>
                    <span className="text-gray-400">Length:</span>
                    <span className="ml-2 text-white">{starship.length} m</span>
                </div>
            </div>
        </div>
    );
}
