import type { Planet } from '../types';

interface PlanetCardProps {
    planet: Planet;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
    return (
        <div className="card-glow bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl">
            <h3 className="text-2xl font-bold text-[#4A9EFF] mb-4">{planet.name}</h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <span className="text-gray-400">Climate:</span>
                    <span className="ml-2 text-white capitalize">{planet.climate}</span>
                </div>

                <div>
                    <span className="text-gray-400">Terrain:</span>
                    <span className="ml-2 text-white capitalize">{planet.terrain}</span>
                </div>

                <div>
                    <span className="text-gray-400">Population:</span>
                    <span className="ml-2 text-white">{planet.population}</span>
                </div>

                <div>
                    <span className="text-gray-400">Diameter:</span>
                    <span className="ml-2 text-white">{planet.diameter} km</span>
                </div>

                <div className="col-span-2">
                    <span className="text-gray-400">Gravity:</span>
                    <span className="ml-2 text-white">{planet.gravity}</span>
                    <span className="mx-2 text-gray-600">|</span>
                    <span className="text-gray-400">Rotation:</span>
                    <span className="ml-2 text-white">{planet.rotation_period}h</span>
                </div>
            </div>
        </div>
    );
}
