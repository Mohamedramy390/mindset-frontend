import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search..." }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
