import { useState, useEffect, useCallback } from 'react';
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
  const [ordering, setOrdering] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: Record<string, string> = {};
      if (searchQuery) params.search = searchQuery;
      if (ordering) params.ordering = ordering;

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
  }, [activeTab, searchQuery, ordering]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tabs = [
    { id: 'people' as Tab, label: 'Characters', count: characters.length },
    { id: 'planets' as Tab, label: 'Planets', count: planets.length },
    { id: 'films' as Tab, label: 'Films', count: films.length },
    { id: 'starships' as Tab, label: 'Starships', count: starships.length },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0 transition-all duration-1000 ease-in-out">
        <div className="absolute inset-0 bg-[#0A0E17]"></div>
        <div className="star-field opacity-60"></div>

        <div
          key={activeTab} // Key forces re-render for fade effect
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-25 mix-blend-screen scale-105"
          style={{
            backgroundImage: `url('/assets/images/category-${activeTab === 'people' ? 'characters' : activeTab}.webp')`
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-[#0A0E17]/60"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/assets/images/grid-pattern.png')" }}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="relative border-b border-white/5 pb-8 pt-12">
          <div className="container mx-auto px-4 relative z-20 text-center">
            <h1 className="text-3xl md:text-8xl font-black tracking-tighter uppercase mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-blue-600 filter drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                {activeTab === 'people' ? 'CHARACTERS' : activeTab}
              </span>
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-cyan-500/40 text-[10px] md:text-xs tracking-widest md:tracking-[0.5em] font-mono">
              <span>SECURE_CONNECTION</span>
              <span className="animate-pulse">●</span>
              <span>DATABASE_V2.0</span>
            </div>
          </div>
        </header>

        <nav className="sticky top-4 z-40 my-8">
          <div className="container mx-auto px-4">
            {/* Mobile: Grid Layout | Desktop: Flex Centered */}
            <div className="grid grid-cols-4 md:flex md:justify-center items-stretch md:items-center bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-full p-1 md:min-w-0 max-w-full md:max-w-fit mx-auto shadow-2xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                    setOrdering('name');
                  }}
                  className={`
                    relative flex flex-col md:flex-row justify-center items-center
                    py-2 md:py-2 md:px-6 rounded-lg md:rounded-full 
                    font-mono text-[9px] md:text-xs uppercase tracking-tight md:tracking-widest 
                    transition-all duration-300
                    ${activeTab === tab.id
                      ? 'md:bg-cyan-500/20 text-cyan-300 md:shadow-[0_0_20px_rgba(0,240,255,0.3)] bg-transparent' // Mobile: Text only, Desktop: Pill
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span className="relative z-10 flex flex-col md:flex-row items-center gap-1 md:gap-2">
                    {tab.label}
                    {/* Active Indicator Line for Mobile */}
                    {activeTab === tab.id && (
                      <span className="md:hidden absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(0,240,255,0.8)] rounded-full"></span>
                    )}
                    {tab.count > 0 && (
                      <span className={`text-[9px] px-1.5 rounded-sm hidden md:inline-flex ${activeTab === tab.id ? 'bg-cyan-500 text-black' : 'bg-gray-800/80'}`}>
                        {tab.count}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8 flex-grow">
          {activeTab !== 'films' && (
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="flex gap-4 items-stretch">
                <div className="flex-1">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                  />
                </div>

                <div className="relative">
                  {/* Sort Button Toggle */}
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className={`h-full px-6 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm border rounded-lg shadow-lg transition-all ${isSortOpen ? 'border-[#FFE81F] text-[#FFE81F]' : 'border-gray-700/50 text-gray-400 hover:border-[#FFE81F]/50 hover:text-[#FFE81F]'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  </button>

                  {isSortOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                      <div className="py-1">
                        <button
                          onClick={() => { setOrdering(''); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === '' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                          Default
                        </button>
                        <button
                          onClick={() => { setOrdering('name'); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === 'name' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                          Name A-Z
                        </button>
                        <button
                          onClick={() => { setOrdering('-name'); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === '-name' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                          Name Z-A
                        </button>

                        {activeTab === 'people' && (
                          <>
                            <div className="h-px bg-gray-700/50 my-1" />
                            <button
                              onClick={() => { setOrdering('height'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === 'height' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Height: Low
                            </button>
                            <button
                              onClick={() => { setOrdering('-height'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === '-height' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Height: High
                            </button>
                            <button
                              onClick={() => { setOrdering('mass'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === 'mass' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Mass: Low
                            </button>
                            <button
                              onClick={() => { setOrdering('-mass'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === '-mass' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Mass: High
                            </button>
                          </>
                        )}

                        {activeTab === 'planets' && (
                          <>
                            <div className="h-px bg-gray-700/50 my-1" />
                            <button
                              onClick={() => { setOrdering('population'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === 'population' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Pop: Low
                            </button>
                            <button
                              onClick={() => { setOrdering('-population'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === '-population' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Pop: High
                            </button>
                            <button
                              onClick={() => { setOrdering('diameter'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === 'diameter' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Size: Small
                            </button>
                            <button
                              onClick={() => { setOrdering('-diameter'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === '-diameter' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Size: Large
                            </button>
                          </>
                        )}

                        {activeTab === 'starships' && (
                          <>
                            <div className="h-px bg-gray-700/50 my-1" />
                            <button
                              onClick={() => { setOrdering('passengers'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === 'passengers' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Passengers: Low
                            </button>
                            <button
                              onClick={() => { setOrdering('-passengers'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === '-passengers' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Passengers: High
                            </button>
                            <button
                              onClick={() => { setOrdering('crew'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === 'crew' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Crew: Low
                            </button>
                            <button
                              onClick={() => { setOrdering('-crew'); setIsSortOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${ordering === '-crew' ? 'bg-[#FFE81F]/10 text-[#FFE81F]' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                              Crew: High
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {loading && <Loader />}
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
      </div >
    </div >
  );
}

export default App;
