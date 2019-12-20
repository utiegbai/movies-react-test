import React, { useState, Fragment } from 'react';
import Fade from 'react-reveal/Fade';
import Movie from './Movie'
import Pagination from './Pagination'

export default function Movies ({ shows, loading  }) {
  shows = shows ? shows : []
  const [currentPage, setCurrentPage] = useState(1);
  const [ showsPerPage ] = useState(25);

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

  // Change page
  const changeCurrentPage = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <h1 className="text-center">Loading...</h1>
  }

  if (shows === undefined || shows.length === 0) {
    return <h1 className="text-center">No result found.</h1>
  }

  console.log(shows)

  return (
    <Fragment>
      <div>
        <Pagination
          showsPerPage={showsPerPage}
          totalShows={shows.length || 0}
          currentPage={currentPage}
          paginate={changeCurrentPage}
        />
      </div>
      <div className="flex flex-wrap -mx-4">
        {
          currentShows.map((show, i) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5">
              <Fade bottom>
                <Movie key={i} show={show} />
              </Fade>
            </div>
          ))
        }
      </div>
      <div>
        <Pagination
          showsPerPage={showsPerPage}
          totalShows={shows.length || 0}
          currentPage={currentPage}
          paginate={changeCurrentPage}
        />
      </div>
    </Fragment>
  )
}