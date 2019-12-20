const express = require('express');
const redis = require('redis');
const fetch = require('node-fetch')
const { promisify } = require('util');
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const router = express.Router();

const BASE_URL= 'http://api.tvmaze.com/shows';

router.get('/shows', async (_, res) => {
  try {
    const shows = await getAsync('shows');

    res.status(200).json(JSON.parse(shows));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'An unknown error occured'
    });
  }
})

router.get('/shows/:id/detail', async (req, res) => {
  const showId = req.params.id || ''

  try {
    const response = await Promise.all([
      fetch(`${BASE_URL}/${showId}/cast`),
      fetch(`${BASE_URL}/${showId}/crew`)
    ]);

    const cast = await response[0].json()
    const crew = await response[1].json()

    res.status(200).json({ cast, crew });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'An unknown error occured'
    });
  }
})

router.get('/search', async (req, res) => {
  const title = req.query.title || ''

  try {
    const shows = await getAsync('shows')
    const formattedShows = JSON.parse(shows)
    
    const searchShows = formattedShows.filter(show => {
      const showName = show.name.toLowerCase();

      return showName.includes(title.toLowerCase())
    })

    res.status(200).json(searchShows)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'An unknown error occured'
    })
  }
})

module.exports = router