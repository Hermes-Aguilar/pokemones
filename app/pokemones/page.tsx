import Link from "next/link";

async function getPokeData(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function PokemonesPage() {
  // Genera automáticamente los primeros 50 pokémones (puedes cambiar el número)
  const totalPokemones = 50;
  
  const pokemonList = await Promise.all(
    Array.from({ length: totalPokemones }, (_, i) => i + 1).map(async (id) => {
      const data = await getPokeData(id);
      return {
        name: data?.name || `pokemon-${id}`,
        image: data?.sprites.other["official-artwork"].front_default
      };
    })
  );

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold border-b border-slate-700 pb-2">
        Catálogo Pokémon
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemonList.map(({ name, image }) => (
          <Link
            key={name}
            href={`/pokemones/${name}`}
            className="group">
            <div className="bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-700 group-hover:border-blue-500 transition-all">
              {image ? (
                <img src={image} alt={name} className="h-40 w-full object-contain group-hover:scale-110 transition-transform" />
              ) : (
                <div className="h-40 flex items-center justify-center">Cargando...</div>
              )}
              <div className="mt-4 text-center">
                <span className="capitalize font-bold text-lg">{name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}