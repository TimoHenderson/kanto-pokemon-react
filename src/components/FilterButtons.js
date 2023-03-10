import React from "react";
import "./FilterButtons.css"
import FilterButton from "./FilterButton";

function FilterButtons({ filters, toggleFilter }) {

    const filterButtons = Object.keys(filters).map((filterKey) => {
        return <FilterButton key={filterKey} filterKey={filterKey} state={filters[filterKey]} toggleFilter={toggleFilter} />
    });
    return (
        <div className="filterButtons">
            {filterButtons}
        </div>
    );
}

export default FilterButtons;