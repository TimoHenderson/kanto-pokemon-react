import FilterButtonsBox from "./FilterButtonsBox";
import PokemonList from "./PokemonList";
function Pokedex({ typeFilters, setTypeFilters, caughtFilters, setCaughtFilters, pokemonList, pokemonCaught }) {
    return (
        <div className="pokedex">
            <FilterButtonsBox typeFilters={typeFilters} setTypeFilters={setTypeFilters} caughtFilters={caughtFilters} setCaughtFilters={setCaughtFilters} />
            <PokemonList typeFilters={typeFilters} caughtFilters={caughtFilters} pokemonList={pokemonList} pokemonCaught={pokemonCaught} />
        </div>
    )
}

export default Pokedex;