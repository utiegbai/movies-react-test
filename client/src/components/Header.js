import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../context';

export default function Header({ hero = false }) {
  const [ query, setQuery ] = useState('');

  return (
    <Consumer>
      {value => {
        return (
          <section className="bg-gray-900 px-6">
            <div className="container mx-auto">
              <header className="py-4">
                <nav>
                  <ul className="flex justify-end items-center">
                    <li><Link to="/" className="text-white">Home</Link></li>
                    <li><Link to="/watchlist" className="text-white ml-4">Watchlist</Link></li>
                  </ul>
                </nav>
              </header>
              { hero ? (
                <div className="h-64 flex flex-col items-center justify-center border-t-2 border-gray-800">
                  <h1 className="text-3xl text-white">Movie Bank</h1>
                  <p className="text-xl text-gray-400">Search for your favourite movies</p>
                  <div className="mt-6 flex">
                    <form onSubmit={(e) => {
                      e.preventDefault();

                      const { dispatch } = value

                      fetch(`${process.env.REACT_APP_API_URL}/search?title=${query}`)
                        .then(res => res.json())
                        .then(searchShows => {
                          console.log(searchShows)

                          setQuery('')

                          dispatch({
                            type: 'SEARCH_SHOWS',
                            payload: searchShows
                          })
                        })
                      
                    }}>
                      <input
                        type="text"
                        className="w-auto px-3 py-2 shadow rounded-l"
                        placeholder="Search for a movie"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} />
                      <button type="submit" className="bg-indigo-500 px-3 py-2 text-white rounded-r">Search</button>
                    </form>
                  </div>
                </div>
              ) : null }
            </div>
          </section>
        )
      }}
    </Consumer>
  )
}