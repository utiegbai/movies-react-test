import React, { useState, useEffect } from 'react'
import localForage from 'localforage'
import iziToast from 'izitoast'
import { Link } from 'react-router-dom'

export default function Movie({show}) {
  const [watchlist, setWatchlist] = useState([])
  const [showOnWatchlist, setShowOnWatchlist] = useState(false)

  const addShowToWatchList = async () => {
    const watchList = watchlist

    watchList.push(show)

    try {
      await localForage.setItem('watchlist', watchList)
      setWatchlist(watchList)

      iziToast.success({
        title: 'Success',
        message: 'New show has been added to watchlist'
      })
    } catch (err) {
      console.log(err)
    }
  }

  const removeShowFromWatchList = async () => {
    const newWatchlist = watchlist.filter(item => {
      return item.id !== show.id
    })

    try {
      await localForage.setItem('watchlist', newWatchlist)
      setWatchlist(newWatchlist)

      iziToast.success({
        title: 'Success',
        message: `Show #${show.id} has been removed from watchlist`
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getWatchList = async () => {
      const watchList = await localForage.getItem('watchlist') || []
      setWatchlist(watchList)
    }

    const checkShowExistOnWatchlist =  async () => {
      const match = watchlist.find(item => item.id === show.id)

      if (match) {
        setShowOnWatchlist(true)
      } else {
        setShowOnWatchlist(false)
      }
    }

    checkShowExistOnWatchlist(setShowOnWatchlist)
    getWatchList(setWatchlist)
  }, [show.id, watchlist])

  return (
    <div  className="block bg-white m-4 rounded shadow-md">
      <Link to={`/shows/${show.id}`}>
        <img className="h-64 w-full object-cover rounded-t" src={show.image ? show.image.original : 'https://via.placeholder.com/150'} alt={show.name} />
      </Link>
      <div className="p-4">
        <Link to={`/shows/${show.id}`}>
          <h3 className="text-sm">{show.name}</h3>
        </Link>
        <div className="text-xs text-gray-600">{show.premiered}</div>
        <div className="flex justify-between mt-4 items-center">
          <div className="bg-gray-100 px-2 py-1 rounded">
            <i className="far fa-star text-yellow-500"></i>
            <span className="ml-2 text-gray-600">{show.rating.average || 0}</span>
          </div>
          <div>
          { showOnWatchlist ? (
            <button onClick={() => removeShowFromWatchList()} className="px-2 text-red-500">
              <i className="fas fa-heart"></i>
            </button>
          ) : (
            <button onClick={() => addShowToWatchList()} className="px-2 text-red-500">
              <i className="far fa-heart"></i>
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}