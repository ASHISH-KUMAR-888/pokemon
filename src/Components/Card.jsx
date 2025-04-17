import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Card = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const scroll = useRef(null);
  const [pre, setPre] = useState("");
  const [nextt, setNextt] = useState("");
  const [uri, setUri] = useState("https://pokeapi.co/api/v2/pokemon");
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPokemons = async (pageNum) => {
    setLoading(true);
    try {
      const offset = (pageNum - 1) * 20;
      const res = await axios.get(uri);

      setNextt(res.data.next);
      setPre(res.data.previous);

      const pokemonData = await Promise.all(
        res.data.results.map(async (pokemon) => {
          const pokeDetails = await axios.get(pokemon.url);
          return {
            name: pokeDetails.data.name,
            image: pokeDetails.data.sprites.other.home.front_default,
            height: pokeDetails.data.height,
            weight: pokeDetails.data.weight,
            ability: pokeDetails.data.abilities.map((ab) => ab.ability.name),
          };
        })
      );
      setData(pokemonData);
    } catch (err) {
      console.error("Error fetching Pokemon:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page, uri]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPokemons = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  const aura = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const next = () => {
    if (nextt != null) {
      setUri(nextt);
      setCount(count + 1);

      scroll.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const prev = () => {
    if (pre != null) {
      setUri(pre);

      setCount(count - 1);

      scroll.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center" ref={scroll}>
        <input
          className="search-OPtion"
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="mt-[30px] mb-[50px] px-[20px] grid gap-y-[50px] md:mt-[60px]  md:grid-cols-2 gap-[30px] lg:grid-cols-3">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((item, ii) => {
            return (
              <div className="h-max" key={ii}>
                <div className="h-[65%] flex justify-center items-center tick">
                  <img
                    className={`h-full imu hover:drop-shadow-[1px_1px_5px_red]`}
                    style={{ filter: `drop-shadow(1px 1px 10px ${aura()})` }}
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="h-[35%] flex flex-col justify-between gap-y-[5px] relative h-max">
                  <div className="absolute h-full w-full bg-[#3C3E44] z-[-2]"></div>

                  <div className="stack pt-[10px] mt-[15px] md:mt-[20px]">
                    <p className="text-white font-black tracking-[1px] text-[7vw] md:text-[2vw]">
                      {item.name}
                    </p>
                    <p className="text-[#FBC02D] font-[600] fontu">
                      {/* {f()} */}
                    </p>
                  </div>

                  <div className="stack">
                    <p className="text-[#F5F5F5] font-[600] fontu">Height:</p>
                    <p className="text-[#FBC02D] font-[600] fontu">
                      {item.height}
                    </p>
                  </div>

                  <div className="stack">
                    <p className="text-[#F5F5F5] font-[600] fontu">Weight:</p>
                    <p className="text-[#FBC02D] font-[600] fontu">
                      {item.weight}
                    </p>
                  </div>

                  <div className="stack pb-[10px] mb-[15px] md:mb-[20px]">
                    <p className="text-[#F5F5F5] font-[600] fontu">
                      Abilities:
                    </p>
                    <p className="text-[#FBC02D] font-[600] fontu">
                      {item.ability.join(" | ")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="w-screen text-white text-[30px] font-black tracking-[2px] text-center">
            No Pokemon found.
          </p>
        )}
      </div>

      <div className="w-screen flex justify-center items-center gap-[20px] mb-[30px] md:mb-[50px] pagu">
        <button onClick={prev} style={{ opacity: count == 1 ? 0.3 : 1 }}>
          Previous
        </button>
        <p className="text-[28px] text-white font-bold">{count}</p>
        <button onClick={next} style={{ opacity: count == 194 ? 0.3 : 1 }}>
          Next
        </button>
      </div>
    </>
  );
};

export default Card;
