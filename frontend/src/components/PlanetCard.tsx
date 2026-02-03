import type { Planet } from '../types';

interface PlanetCardProps {
    planet: Planet;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
    const getPopulationPercentage = (pop: string) => {
        const num = parseInt(pop);
        if (isNaN(num)) return 0;
        return Math.min((Math.log10(num) / 12) * 100, 100);
    };

    return (
        <div className="card-holographic rounded-lg p-6 group">
            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold text-white tracking-wide uppercase group-hover:text-cyan-400 transition-colors">
                    {planet.name}
                </h3>
                <div className="text-right">
                    <span className="block text-[10px] text-gray-500 uppercase">Terrain</span>
                    <span className="text-xs text-cyan-300 truncate max-w-[100px] block">{planet.terrain}</span>
                </div>
            </div>

            <div className="space-y-5 font-mono text-xs">
                {/* Population Bar */}
                <div>
                    <div className="flex justify-between text-gray-400 mb-1">
                        <span>POPULATION</span>
                        <span className="text-white">{planet.population}</span>
                    </div>
                    <div className="data-bar-bg">
                        <div
                            className="data-bar-fill bg-gradient-to-r from-green-400 to-emerald-600"
                            style={{ width: `${getPopulationPercentage(planet.population)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Climate & Gravity Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-2 rounded">
                        <span className="block text-[10px] text-gray-500 mb-1">CLIMATE</span>
                        <span className="text-cyan-300">{planet.climate}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <span className="block text-[10px] text-gray-500 mb-1">GRAVITY</span>
                        <span className="text-cyan-300">{planet.gravity}</span>
                    </div>
                </div>

                {/* Diameter */}
                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-gray-500">DIAMETER</span>
                    <span className="text-white font-bold">{planet.diameter} km</span>
                </div>
            </div>
        </div>
    );
}
