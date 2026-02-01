import type { Character } from '../types';

interface CharacterCardProps {
    character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
    return (
        <div className="card-glow bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 shadow-xl">
            <h3 className="text-2xl font-bold text-[#FFE81F] mb-4">{character.name}</h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <span className="text-gray-400">Height:</span>
                    <span className="ml-2 text-white">{character.height} cm</span>
                </div>

                <div>
                    <span className="text-gray-400">Mass:</span>
                    <span className="ml-2 text-white">{character.mass} kg</span>
                </div>

                <div>
                    <span className="text-gray-400">Birth Year:</span>
                    <span className="ml-2 text-white">{character.birth_year}</span>
                </div>

                <div>
                    <span className="text-gray-400">Gender:</span>
                    <span className="ml-2 text-white capitalize">{character.gender}</span>
                </div>

                <div className="col-span-2">
                    <span className="text-gray-400">Hair:</span>
                    <span className="ml-2 text-white">{character.hair_color}</span>
                    <span className="mx-2 text-gray-600">|</span>
                    <span className="text-gray-400">Eyes:</span>
                    <span className="ml-2 text-white">{character.eye_color}</span>
                </div>
            </div>
        </div>
    );
}
