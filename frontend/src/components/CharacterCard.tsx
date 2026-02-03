import type { Character } from '../types';

interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    const getPercentage = (value: string, max: number) => {
        const num = parseFloat(value.replace(/,/g, ''));
        if (isNaN(num)) return 0;
        return Math.min((num / max) * 100, 100);
    };

    return (
        <div className="card-holographic rounded-lg p-6 group">
            <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold text-white tracking-wide uppercase group-hover:text-cyan-400 transition-colors">
                    {character.name}
                </h3>
                <span className="text-[10px] font-mono text-cyan-500/50 border border-cyan-500/20 px-1.5 rounded">
                    ID: {character.url.split('/').filter(Boolean).pop()}
                </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
                <div>
                    <div className="flex justify-between text-gray-400 mb-1">
                        <span>HEIGHT</span>
                        <span className="text-cyan-300">{character.height} cm</span>
                    </div>
                    <div className="data-bar-bg">
                        <div
                            className="data-bar-fill"
                            style={{ width: `${getPercentage(character.height, 250)}%` }}
                        ></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-gray-400 mb-1">
                        <span>MASS</span>
                        <span className="text-cyan-300">{character.mass} kg</span>
                    </div>
                    <div className="data-bar-bg">
                        <div
                            className="data-bar-fill bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${getPercentage(character.mass, 150)}%` }}
                        ></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5 text-gray-500">
                    <div>
                        <span className="block text-[10px] uppercase tracking-wider mb-0.5">Birth Year</span>
                        <span className="text-white">{character.birth_year}</span>
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase tracking-wider mb-0.5">Gender</span>
                        <span className="text-white capitalize">{character.gender}</span>
                    </div>
                </div>

                {character.films.length > 0 && (
                    <div className="mt-4 pt-2 border-t border-dashed border-white/10">
                        <span className="block text-[10px] text-gray-500 uppercase mb-2">Appearances</span>
                        <div className="flex flex-wrap gap-2">
                            {character.films.map((film, index) => (
                                <a
                                    key={index}
                                    href={film}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-1 bg-cyan-900/30 text-cyan-400 text-[10px] rounded hover:bg-cyan-500 hover:text-black transition-colors"
                                >
                                    EP {film.split('/').filter(Boolean).pop()}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
