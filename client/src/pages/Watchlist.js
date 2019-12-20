import React, { useState, useEffect } from 'react';
import localForage from 'localforage';

import Header from '../components/Header';
import Movies from '../components/Movies';

export default function Watchlist () {

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);

      const shows = await localForage.getItem('watchlist');
    
      setShows(shows);
      setLoading(false)
    }

    fetchShows(setShows)
  }, [])

  return (
    <div className="App min-h-screen bg-gray-200">
      <Header />
      <div className="container mx-auto">
        <h2 className="text-xl pt-6 pb-3 mb-4 border-b-2 border-gray-400 font-medium uppercase tracking-wide">Watchlist</h2>
        <Movies shows={shows} loading={loading} />
      </div>
    </div>
  );
}