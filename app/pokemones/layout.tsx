import Link from "next/link";

// Lista de pokémones para el menú lateral
const pokemonIds = [
  "bulbasaur", "charmander", "squirtle", "pikachu", 
  "eevee", "mewtwo", "snorlax", "lucario", "gengar"
];

export default function PokemonesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <div className="flex flex-1 flex-row">   
        
        {/* Menu Lateral */}
        <nav className="w-48 bg-slate-800/50 p-4 border-r border-slate-700 overflow-y-auto max-h-screen sticky top-0">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Selecciona uno</h3>
            {pokemonIds.map((name) => (
              <Link
                key={name}
                href={`/pokemones/${name}`}
                className="bg-slate-700 border border-slate-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 hover:border-blue-400 transition-all capitalize"
              >
                {name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Contenido Principal */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>

      <footer className="bg-slate-800 border-t border-slate-700">
        <div className="w-full mx-auto px-6 py-4 text-sm text-slate-400 text-center">
          {new Date().getFullYear()} Pokédex Next.js - <Link href="https://pokeapi.co/" className="hover:text-blue-400 underline">PokeAPI</Link>
        </div>
      </footer>
    </div>
  );
}