import React, { createContext, useContext, useState } from 'react';
const StateContext = createContext();
const baseUrl = 'https://google-search74.p.rapidapi.com';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'google-search74.p.rapidapi.com',
    },
  };

  const getResults = async (url) => {
    console.log('url ', url);
    setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, options);

    const data = await res.json();
    console.log('data', data);
    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, loading }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
