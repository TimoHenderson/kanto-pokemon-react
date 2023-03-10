import React from "react";
import FilterButton from "./FilterButton";
import FilterButtons from "./FilterButtons";

function FilterButtonsBox({ typeFilters, caughtFilters, setCaughtFilters, setTypeFilters }) {

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
        <div className="filterButtonBox">
            <FilterButtons filters={typeFilters} toggleFilter={toggleTypeFilter} />
            <FilterButtons filters={caughtFilters} toggleFilter={toggleCaughtFilter} />
            <div>
                <button onClick={() => setAllTypeFilters(false)}>No Types</button>
                <button onClick={() => setAllTypeFilters(true)} >All Types</button>
                <button onClick={() => setAllCaughtFilters(true)}>Caught and Uncaught</button>
                <button onClick={() => setAllCaughtFilters(false)}>Caught and Uncaught Off</button>
            </div>
        </div>
    )
}
export default FilterButtonsBox;