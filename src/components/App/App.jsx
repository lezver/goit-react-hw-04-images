import { useState } from 'react';
import './App.scss';
import { Searchbar, ImageGallery } from 'components';

export const App = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = searchText => {
    setSearchText(searchText);
  };

  return (
    <div className="app">
      <Searchbar search={handleSearch} />
      <ImageGallery searchText={searchText} />
    </div>
  );
};
