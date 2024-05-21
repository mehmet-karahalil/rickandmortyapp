import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { apiRequest } from './core/request';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [characters, setCharacters] = useState<any[]>([]);

  const selectRef = useRef<any>();
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setCharacters([]);
      return;
    }
    const request = apiRequest(searchTerm, 1);
    request.then((data) => {
      setCharacters(data.results);
      setCharacters(data.results.map((character: any) => ({
        value: character.name,
        label: (
          <div className="d-flex align-items-center">
            <img src={character.image} alt={character.name} className="img-thumbnail w-45px h-45px mr-2"/>
            <div className='ms-2 d-flex flex-column'>
              <span className='fs-3' >{getHighlightedText(character.name, searchTerm)}</span>
              <span className="mb-0">Bölüm sayısı: {character.episode.length}</span>
            </div>
          </div>
        )
      })));
    }).catch((error) => {
      console.log(error);
    });
  }, [searchTerm]);

  const handleSearch = (inputValue: string) => {
    setSearchTerm(inputValue);
  };

  const handleSelect = (selected: any) => {
    setSelectedItems(selected || []);
  };

  const getHighlightedText = (text: string, highlight: string): JSX.Element => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? <b key={index}>{part}</b> : part
        )}
      </span>
    );
  };
  return (
    <div className="w-100">
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="w-100 d-flex flex-wrap border p-2">
          <Select
            ref={selectRef}
            isMulti
            options={characters}
            onInputChange={handleSearch}
            onChange={handleSelect}
            value={selectedItems}
            className="w-100"
            placeholder="Ara ve seç..."
            noOptionsMessage = {() => <div style={{ color: 'red', fontWeight: 'bold' }}>🔍 Henüz arama yapılmadı...</div>}/>
        </div>
      </div>
    </div>
  );
};

export default App;
