import { useState, useEffect } from 'react';
import apiClient from './services/api';
import type { Character, Planet, Film, Starship, ApiResponse } from './types';
import SearchBar from './components/SearchBar';
import CharacterCard from './components/CharacterCard';
import PlanetCard from './components/PlanetCard';
import FilmCard from './components/FilmCard';
import StarshipCard from './components/StarshipCard';
import Loader from './components/Loader';

type Tab = 'people' | 'planets' | 'films' | 'starships';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('people');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);

  useEffect(() => {
    fetchData();
  }, [activeTab, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = searchQuery ? { search: searchQuery } : {};

      switch (activeTab) {
        case 'people': {
          const response = await apiClient.get<ApiResponse<Character>>('/people', { params });
          setCharacters(response.data.results);
          break;
        }
        case 'planets': {
          const response = await apiClient.get<ApiResponse<Planet>>('/planets', { params });
          setPlanets(response.data.results);
          break;
        }
        case 'films': {
          const response = await apiClient.get<ApiResponse<Film>>('/films');
          setFilms(response.data.results);
          break;
        }
        case 'starships': {
          const response = await apiClient.get<ApiResponse<Starship>>('/starships', { params });
          setStarships(response.data.results);
          break;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'people' as Tab, label: 'Characters', count: characters.length },
    { id: 'planets' as Tab, label: 'Planets', count: planets.length },
    { id: 'films' as Tab, label: 'Films', count: films.length },
    { id: 'starships' as Tab, label: 'Starships', count: starships.length },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E27] text-white relative overflow-hidden">
      {/* Star field background */}
      <div className="star-field"></div>

      {/* Content wrapper with z-index */}
      <div className="relative z-10">
        {/* Header with gradient */}
        <header className="bg-gradient-to-b from-gray-900/95 to-gray-800/95 border-b border-gray-700/50 shadow-2xl backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold text-center mb-2">
              <span className="text-[#FFE81F] text-glow-sm">Star Wars</span>
              <span className="text-white ml-3">Explorer</span>
            </h1>
            <p className="text-center text-gray-300 text-sm tracking-wider">
              EXPLORE THE GALAXY FAR, FAR AWAY
            </p>
            <div className="crawl-divider mt-4 mx-auto max-w-md"></div>
          </div>
        </header>

        {/* Tabs with improved styling */}
        <nav className="bg-gray-900/90 border-b border-gray-700/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                  }}
                  className={`px-8 py-4 font-semibold transition-all duration-300 whitespace-nowrap relative ${activeTab === tab.id
                      ? 'bg-gray-800/80 text-[#FFE81F]'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${activeTab === tab.id
                        ? 'bg-[#FFE81F]/20 text-[#FFE81F]'
                        : 'bg-gray-700/50 text-gray-400'
                      }`}>
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFE81F] to-transparent"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Search Bar (hidden for films) */}
          {activeTab !== 'films' && (
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
            />
          )}

          {/* Loading State */}
          {loading && <Loader />}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="inline-block p-8 bg-red-900/20 border-2 border-red-500/50 rounded-lg">
                <p className="text-red-400 text-lg mb-4">⚠️ {error}</p>
                <button
                  onClick={fetchData}
                  className="px-6 py-3 bg-[#FFE81F] text-gray-900 font-bold rounded-lg hover:bg-[#FFE81F]/90 transition-all duration-300 shadow-lg hover:shadow-[#FFE81F]/50"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Content Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {activeTab === 'people' && characters.map((character) => (
                <CharacterCard key={character.url} character={character} />
              ))}
              {activeTab === 'planets' && planets.map((planet) => (
                <PlanetCard key={planet.url} planet={planet} />
              ))}
              {activeTab === 'films' && films.map((film) => (
                <FilmCard key={film.url} film={film} />
              ))}
              {activeTab === 'starships' && starships.map((starship) => (
                <StarshipCard key={starship.url} starship={starship} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && (
            <>
              {activeTab === 'people' && characters.length === 0 && (
                <div className="text-center text-gray-400 py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-lg">No characters found</p>
                </div>
              )}
              {activeTab === 'planets' && planets.length === 0 && (
                <div className="text-center text-gray-400 py-16">
                  <div className="text-6xl mb-4">🪐</div>
                  <p className="text-lg">No planets found</p>
                </div>
              )}
              {activeTab === 'films' && films.length === 0 && (
                <div className="text-center text-gray-400 py-16">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg">No films found</p>
                </div>
              )}
              {activeTab === 'starships' && starships.length === 0 && (
                <div className="text-center text-gray-400 py-16">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-lg">No starships found</p>
                </div>
              )}
            </>
          )}
        </main>

        {/* Footer with improved styling */}
        <footer className="bg-gray-900/90 border-t border-gray-700/50 mt-16 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8 text-center">
            <div className="crawl-divider mb-4 mx-auto max-w-xs"></div>
            <p className="text-gray-400 text-sm mb-2">
              Data from <a href="https://swapi.dev" target="_blank" rel="noopener noreferrer" className="text-[#FFE81F] hover:text-[#FFE81F]/80 transition-colors">SWAPI</a>
            </p>
            <p className="text-gray-500 text-xs">
              Built with React + Vite + Tailwind CSS • May the Force be with you
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
