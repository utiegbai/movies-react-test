import React, { useEffect, useState, Fragment } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { Consumer } from '../context';

export default function Show ({ match }) {
  const [ step, setStep ] = useState(1)
  const [ cast, setCast ] = useState([]);
  const [ crew, setCrew ] = useState([]);

  useEffect(() => {
    const fetchShowDetail = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/shows/${match.params.id}/detail`)
      const data = await res.json()

      setCast(data.cast)
      setCrew(data.crew)
    }

    fetchShowDetail()
  }, [match.params.id]);

  return (
    <Consumer>
      { value => {
        const show = value.shows.find(show => {
          return Number(show.id) === Number(match.params.id)
        });

        return (
          <div className="bg-gray-200 min-h-screen">
            <Header />
            <div className="container mx-auto">
              { show ? (
                <div>
                  <h1 className="mt-4 mx-4 sm:mx-0 text-3xl font-semibold">{ show.name }</h1>
                  <Tabs>
                    <TabList>
                      <Tab>Genaral</Tab>
                      <Tab>Casts</Tab>
                      <Tab>Crew</Tab>
                    </TabList>
                
                    <TabPanel>
                    <div className="flex flex-wrap sm:flex-no-wrap mx-4">
                         <div className="w-full sm:w-auto flex-shrink-0">
                            <img className="w-40 object-cover" src={show.image.original} />
                          </div>
                          <div className="mt-4 sm:mt-0 sm:ml-6">
                            <div className="text-lg" dangerouslySetInnerHTML={{ __html: show.summary }} />
                            <div className="mt-4">
                              <strong className="mr-2">Genres:</strong> <span className="text-indigo-500">{show.genres.toString()}</span>
                            </div>
                            <div className="mt-2">
                              <strong className="mr-2">Show Type:</strong> <span className="text-indigo-500">{show.type}</span>
                            </div>
                            <div className="mt-2">
                              <strong className="mr-2">Schedule:</strong> <span className="text-indigo-500">{show.schedule.days.toString()} at ({show.schedule.time})</span>
                            </div>
                            <div className="mt-2">
                              <strong className="mr-2">Network:</strong> <span className="text-indigo-500">{show.network.name}</span>
                            </div>
                            <div className="mt-2">
                              <strong className="mr-2">Premiered:</strong> <span className="text-indigo-500">{show.premiered}</span>
                            </div>
                            <div className="mt-2">
                              <strong className="mr-2">Language:</strong> <span className="text-indigo-500">{show.language}</span>
                            </div>
                            <div className="mt-2">
                              <strong className="mr-2">Official Site:</strong> <a href={show.officialSite} className="text-indigo-500">{show.officialSite}</a>
                            </div>
                          </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="flex flex-wrap">
                        {cast.map(item => {
                          return (
                            <div key={item.person.id} className="w-full sm:w-auto flex my-3 bg-white rounded p-4 shadow-md m-4">
                              <div>
                                <img className="h-24 w-24 object-cover" src={item.person.image.original} />
                              </div>
                              <div className="ml-4">
                                <h5 className="text-lg">{item.person.name}</h5>
                                <div><span className="text-indigo-500">as</span> {item.character.name}</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="flex flex-wrap">
                        {crew.map(item => {
                          return (
                            <div key={item.person.id} className="w-full sm:w-auto flex my-3 bg-white rounded p-4 shadow-md m-4">
                              <div>
                                <img className="h-24 w-24 object-cover" src={item.person.image ? item.person.image.original : 'https://via.placeholder.com/150'} />
                              </div>
                              <div className="ml-4">
                                <h5 className="text-lg">{item.person.name}</h5>
                                <div className="text-gray-600"><span className="text-indigo-500">as</span> {item.type}</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </TabPanel>
                  </Tabs>
                  {/* <div className="mt-3 flex items-baseline border-b-2 border-gray-400">
                    <Link onClick={() => setStep(1)} to="#" className={`block py-4 px-3 focus:outline-none ${ step === 1 ? '-mb-2 border-b-2 border-indigo-500' : ''}`}>Genaral</Link>
                    <Link onClick={() => setStep(2)} to="#" className={`block py-4 px-3 focus:outline-none ${ step === 2 ? '-mb-2 border-b-2 border-indigo-500' : ''}`}>Casts <span className="text-gray-600">({ cast.length || 0})</span></Link>
                    <Link onClick={() => setStep(3)} to="#" className={`block py-4 px-3 focus:outline-none ${ step === 3 ? '-mb-2 border-b-2 border-indigo-500' : ''}`}>Crew <span className="text-gray-600">({ crew.length || 0})</span></Link>
                  </div> */}
                  {/* <div className="py-4">
                    {step === 1 ? (
                      
                    ) : step === 2 ? (
                      
                    ): step === 3 ? (
                      
                    ) : null}
                  </div> */}
                </div>
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>
        )
      }}
    </Consumer>
  )
}
