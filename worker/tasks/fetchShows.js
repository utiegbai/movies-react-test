const fetch = require('node-fetch');
const redis = require('redis');
const { promisify } = require('util');
const redisClient = redis.createClient();
const setAsync = promisify(redisClient.set).bind(redisClient);

const  fetchShows = async () => {
  let resultCount = 1, onPage = 0;
  const allShows = []; 

  while(resultCount > 0) {
    const res = await fetch(`${process.env.BASE_URL}?page=${onPage}`);
    const shows = await res.json();

    allShows.push(...shows);

    resultCount = shows.length;

    console.log(`got ${shows.length} shows - page number ${onPage}`)

    onPage++;
  }


  await setAsync('shows', JSON.stringify(allShows))
  console.log('woker ran successfully')
};

module.exports = fetchShows;