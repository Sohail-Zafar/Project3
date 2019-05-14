import axios from 'axios';

const KEY = 'AIzaSyCsbautSHF6sJi5YqBiEH-pl1Pc8FmolBA';


export default axios.create ({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 15,
    key: KEY
  }
})