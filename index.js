// const axios = require('axios');

import { rapid_api_key } from "./api-key.js";

const options = {
    method: 'GET',
    url: 'https://api-baseball.p.rapidapi.com/teams',
    params: {search: 'tigers'},
    headers: {
      'X-RapidAPI-Key': rapid_api_key,
      'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com'
    }
  };
  


function keys(object)
{
    return Object.keys(object)
}


function findWantedTeam(teams)
{

}

async function getData()
{
    try {
        const response = await axios.request(options);
        const data = response.data
        const teams = data.response
        console.log(data);
    } 
    catch (error) {
	    console.error(error);

    }

}

getData()
// console.log(rapid_api_key);