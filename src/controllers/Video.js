import axios from 'axios';
import Video from '../models/Video.js'

export const createURL = () => { };

export const getVideoDataFromYoutube = async (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  const videoId = (match && match[7].length == 11) ? match[7] : false;

  try {
    if (!videoId) return Error('Enter a valid Youtube URL!!')
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const title = response.data.items[0].snippet.title
    const image = response.data.items[0].snippet.thumbnails.high.url

    return { title, image };
  } catch (error) {
    return { error }
  }
};

export const getVideoInfo = async (req, res) => {
  let data = await getVideoDataFromYoutube(req.body.url);
  res.send(data).end();
}

export const createVideoModel = async (req, res) => {
  const { title, image } = req.body
  if (!title || !image) res.status(400).send({ error: 'Invalid request body!!' })

  const newVideo = await Video.create({ title, image })
  res.send(newVideo).end()
}

export const getRandomVideo = (req, res) => {
  Video.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)
    Video.findOne().skip(random).exec(
      function (err, result) {
        res.send(result || err)
      })
  })
}

export const getTopVideos = async (req, res) => {
  try {
    let response = await Video.find({ score: { $gte: 0 } }).limit(9).sort({ score: 'desc' }).exec()
    res.send(response).end()
  } catch (error) {
    res.send({ error }).end()
  }
}

export const incrementVideoScore = async (req, res) => {
  const id = req.params.id
  try {
    const updatedVideo = await Video.findByIdAndUpdate(id, { $inc: { score: 100 } })
    res.send(updatedVideo)
  } catch (error) {
    res.end({ error })
  }
}
