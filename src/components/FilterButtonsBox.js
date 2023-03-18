import React, { useState } from "react";

import FilterButtons from "./FilterButtons";


function FilterButtonsBox({ typeFilters, caughtFilters, setCaughtFilters, setTypeFilters }) {
    const [showFilters, setShowFilters] = useState(false);
    function setAllTypeFilters(value) {
        setAllFilters(typeFilters, setTypeFilters, value);
    }
    function setAllCaughtFilters(value) {
        setAllFilters(caughtFilters, setCaughtFilters, value);
    }

    function toggleCaughtFilter(filterKey) {
        toggleFilters(caughtFilters, setCaughtFilters, filterKey);
    }
    function toggleTypeFilter(filterKey) {
        toggleFilters(typeFilters, setTypeFilters, filterKey);
    }

    function toggleFilters(filter, filterFunc, filterKey) {
        const newFilters = { ...filter };
        newFilters[filterKey] = !newFilters[filterKey];
        filterFunc(newFilters);
    }
    function setAllFilters(filter, filterFunc, value) {
        const newFilters = { ...filter };
        for (const filter in newFilters) {
            newFilters[filter] = value;
        }
        filterFunc(newFilters)
    }
    return (
        <div className="filterButtonsBox">
            <h1>Pokedex</h1>
            <div style={{ paddingBottom: "1rem" }}>
                <button onClick={() => setShowFilters(!showFilters)}>{showFilters ? "Hide Filters" : "ShowFilters"}</button>
            </div>
            {showFilters && <div >
                <FilterButtons filters={typeFilters} toggleFilter={toggleTypeFilter} />
                <FilterButtons filters={caughtFilters} toggleFilter={toggleCaughtFilter} />
                <div className="filterButtons">
                    <button onClick={() => setAllTypeFilters(false)}>No Types</button>
                    <button onClick={() => setAllTypeFilters(true)} >All Types</button>
                    <button onClick={() => setAllCaughtFilters(true)}>Caught and Uncaught</button>
                    <button onClick={() => setAllCaughtFilters(false)}>Caught and Uncaught Off</button>
                </div>
            </div>}
        </div >
    )
}
export default FilterButtonsBox;