interface PokemonProps {
  params: { nombre: string };
}

export default async function DetallePokemonPage({ params }: PokemonProps) {
  const { nombre } = await params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);

  if (!res.ok) {
    return <div className="text-red-500">Pokémon no encontrado.</div>;
  }

  const data = await res.json();

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-500">
      <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700 shadow-2xl text-center max-w-md w-full">
        <span className="text-blue-400 font-mono text-xl font-bold">#{data.id}</span>
        <h2 className="text-5xl font-black capitalize mb-6">{data.name}</h2>
        
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt={data.name}
          className="w-64 h-64 mx-auto drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        />

        <div className="flex justify-center gap-3 mt-8">
          {data.types.map((t: any) => (
            <span key={t.type.name} className="px-6 py-2 bg-blue-600 rounded-full text-sm font-bold uppercase tracking-widest">
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}