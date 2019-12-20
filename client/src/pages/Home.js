import React from 'react';

import Header from '../components/Header';
import Movies from '../components/Movies';
import { Consumer } from '../context';

export default function Home () {
  return (
    <Consumer>
      {value => {
        const { shows, heading, loading } = value

        return (
          <div className="App min-h-screen bg-gray-200">
            <Header hero />
            <div className="container mx-auto px-4">
              <h2 className="text-xl pt-6 pb-3 mb-4 border-b-2 border-gray-400 font-medium uppercase tracking-wide">{heading}</h2>
              <Movies shows={shows} loading={loading} />
            </div>
          </div>
        )
      }}
    </Consumer>
  );
}