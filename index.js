// const axios = require('axios');

import { rapid_api_key } from "./api-key.js";

const teamSearcher  = document.getElementById('search')
const submitBtn     = document.getElementById('submit')
const teamSearchForm   = document.getElementById('team-form')
const teamSearchHeader = document.getElementById('team-name')
const teamSearchImage  = document.querySelector('#response-buttons>img')
let teamArr = []
let teamIndex       = 0;


const options = {
  method: 'GET',
  url: 'https://api-baseball.p.rapidapi.com/teams',
  params: {search: ''},
  headers: {
      'X-RapidAPI-Key': rapid_api_key,
      'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com'
    }
};
  
// const teamArr = [
//   {
//       "id": 12,
//       "name": "Detroit Tigers",
//       "logo": "https://media.api-sports.io/baseball/teams/12.png",
//       "national": false,
//       "country": {
//           "id": 1,
//           "name": "USA",
//           "code": "US",
//           "flag": "https://media.api-sports.io/flags/us.svg"
//       }
//   },
//   {
//       "id": 40,
//       "name": "Detroit Tigers Futures",
//       "logo": "https://media.api-sports.io/baseball/teams/40.png",
//       "national": false,
//       "country": {
//           "id": 1,
//           "name": "USA",
//           "code": "US",
//           "flag": "https://media.api-sports.io/flags/us.svg"
//       }
//   },
//   {
//       "id": 58,
//       "name": "Hanshin Tigers",
//       "logo": "https://media.api-sports.io/baseball/teams/58.png",
//       "national": false,
//       "country": {
//           "id": 2,
//           "name": "Japan",
//           "code": "JP",
//           "flag": "https://media.api-sports.io/flags/jp.svg"
//       }
//   },
//   {
//       "id": 682,
//       "name": "Hanshin Tigers 2",
//       "logo": "https://media.api-sports.io/baseball/teams/682.png",
//       "national": false,
//       "country": {
//           "id": 2,
//           "name": "Japan",
//           "code": "JP",
//           "flag": "https://media.api-sports.io/flags/jp.svg"
//       }
//   },
//   {
//       "id": 90,
//       "name": "KIA Tigers",
//       "logo": "https://media.api-sports.io/baseball/teams/90.png",
//       "national": false,
//       "country": {
//           "id": 3,
//           "name": "South-Korea",
//           "code": "KR",
//           "flag": "https://media.api-sports.io/flags/kr.svg"
//       }
//   },
//   {
//       "id": 718,
//       "name": "KIA Tigers 2",
//       "logo": "https://media.api-sports.io/baseball/teams/718.png",
//       "national": false,
//       "country": {
//           "id": 3,
//           "name": "South-Korea",
//           "code": "KR",
//           "flag": "https://media.api-sports.io/flags/kr.svg"
//       }
//   },
//   {
//       "id": 158,
//       "name": "Tigers",
//       "logo": "https://media.api-sports.io/baseball/teams/158.png",
//       "national": false,
//       "country": {
//           "id": 10,
//           "name": "Finland",
//           "code": "FI",
//           "flag": "https://media.api-sports.io/flags/fi.svg"
//       }
//   }
// ]



function keys(object) { return Object.keys(object) }


function createButtons()
{
    const responseButtons   = document.querySelector('#response-buttons')
    const backButton        = document.createElement('button')
    const nextButton        = document.createElement('button')
    const teamConfirmBtn    = document.createElement('button')

    backButton.id           = "back"
    nextButton.id           = "next"
    teamConfirmBtn.id       = 'confirm-team'

    backButton.textContent  = "◀︎"
    nextButton.textContent  = "▶︎"
    teamConfirmBtn.textContent  = "Confirm"

    backButton.classList.add('iterator-button')
    nextButton.classList.add('iterator-button')
    
    responseButtons.prepend(backButton)
    responseButtons.appendChild(nextButton)
    // responseButtons.appendChild(teamConfirmBtn)

    backButton.addEventListener('click', getBack)
    nextButton.addEventListener('click', getNext)
    // teamConfirmBtn.addEventListener('click', )
    
}

function getBack()
{
  teamIndex = teamIndex > 0 ? (teamIndex - 1) : (teamArr.length - 1)
  showCurrentTeam()

}

function getNext()
{
  teamIndex = teamIndex < (teamArr.length - 1) ? (teamIndex + 1) : 0
  showCurrentTeam()
}

function showCurrentTeam()
{
  const currentTeam = teamArr[teamIndex]
  const teamName    = currentTeam.name 
  teamSearchHeader.innerHTML = teamName
  const alt = `Logo of baseball team, The ${teamName}`
  teamSearchImage.setAttribute('src', currentTeam.logo)
  teamSearchImage.setAttribute('alt', alt)
}

function pickTeam()
{
  showCurrentTeam()
  createButtons()
  
}

async function getTeams(searchValue)
{
  options.params.search = searchValue
  try 
  {
    const response = await axios.request(options);
    const data     = response.data
    teamArr        = data.response
    pickTeam()
  } 
  catch (error) {
    console.error(error);

  }

}


function showTeams()
{
  const searchValue           = teamSearcher.value
  getTeams(searchValue)

  teamSearchForm.style.opacity = 0

  setTimeout(() => {
    teamSearchForm.innerHTML = ''
    
  }, 800)
}


submitBtn.addEventListener('click', showTeams)
