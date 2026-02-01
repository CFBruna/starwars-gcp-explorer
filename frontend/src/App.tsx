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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-yellow-500">Star Wars</span>
            <span className="text-white"> Explorer</span>
          </h1>
          <p className="text-center text-gray-400 mt-2">Explore the Galaxy Far, Far Away</p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery('');
                }}
                className={`px-6 py-4 font-semibold transition-all ${activeTab === tab.id
                    ? 'bg-gray-900 text-yellow-500 border-b-2 border-yellow-500'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
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
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">❌ {error}</p>
            <button
              onClick={fetchData}
              className="mt-4 px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="text-center text-gray-400 py-12">No characters found</p>
            )}
            {activeTab === 'planets' && planets.length === 0 && (
              <p className="text-center text-gray-400 py-12">No planets found</p>
            )}
            {activeTab === 'films' && films.length === 0 && (
              <p className="text-center text-gray-400 py-12">No films found</p>
            )}
            {activeTab === 'starships' && starships.length === 0 && (
              <p className="text-center text-gray-400 py-12">No starships found</p>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          <p>Data from <a href="https://swapi.dev" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:underline">SWAPI</a></p>
          <p className="mt-1">Built with React + Vite + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
