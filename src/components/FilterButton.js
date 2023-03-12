import React from "react";
import "./FilterButton.css"

function FilterButton({ state, filterKey, toggleFilter }) {
    return (
        <button className={`filterButton ${state ? "off" : ""}`} onClick={() => toggleFilter(filterKey)}>{filterKey}</button>
    )
}
export default FilterButton;