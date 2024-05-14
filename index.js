// const axios = require('axios');

import { rapid_api_key } from "./api-key.js";

const teamSearcher      = document.getElementById('search')
const submitBtn         = document.getElementById('submit')
const teamSearchForm    = document.getElementById('team-form')
const teamSearchHeader  = document.getElementById('team-name')
const teamSearchImage   = document.querySelector('#response-buttons>img')
let teamArr   = []
let teamIndex = 0;


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


function getOridinal(num)
{
    if (num < 20)
    {
        switch (num) 
        {
            case 1:
                return num + 'st'

            case 2:
                return num + 'nd'

            case 3:
                return num + 'rd'
        
            default:
                return num + 'th';
        }
    }
    
    const focusNum = num % 10

    switch (focusNum) 
    {
        case 1:
            return num + 'st'

        case 2:
            return num + 'nd'

        case 3:
            return num + 'rd'
        default:
            return num + 'th';
    }
}


async function getTeamStats(id, name)
{
  options.url    = 'https://api-baseball.p.rapidapi.com/standings'
  options.params = {
    league: '1',
    team: id,
    season: '2024'
  }

  try 
  {
    const response = await axios.request(options);
    // The fetch request will return two team objects
    // The first has info relating to its league, 
    // The second has contains division data  
    const team = response.data.response[0]
    const leagueInfo = team[0]
    const divisionInfo = team[1]
    const leagueName = leagueInfo.group.name
    const divisionName = divisionInfo.group.name
    console.log(leagueInfo);
    console.log(divisionInfo);
  } 
  catch (error) 
  {
    console.error(error);
  }
}


function confirmTeam()
{
  const selectedTeam = teamArr[teamIndex]
  const teamID = selectedTeam.id
  const teamName = selectedTeam.name
  getTeamStats(teamID, teamName)
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


function createButtons()
{
  const responseButtons   = document.querySelector('#response-buttons')
  const responseConfirm   = document.getElementById('response-confirm')
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
  responseConfirm.appendChild(teamConfirmBtn)

  backButton.addEventListener('click', getBack)
  nextButton.addEventListener('click', getNext)
  teamConfirmBtn.addEventListener('click', confirmTeam)    
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
