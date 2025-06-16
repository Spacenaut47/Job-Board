import './SearchBar.css';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
  <input
    type="text"
    className="search-bar"
    placeholder="Search by title, company, tech, type..."
    onChange={(e) => onSearch(e.target.value)}
  />
);

export default SearchBar;
