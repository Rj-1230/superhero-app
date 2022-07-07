// https://superheroapi.com/api/access-token/character-id

const SUPERHERO_TOKEN = '10223569763528853'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const newHeroButton = document.getElementById('newHeroButton')

const heroImageDiv = document.getElementById('heroImage')

  const searchButton = document.getElementById('searchButton')
  
  const searchInput = document.getElementById('searchInput')

const getSuperHero = (id, name) => {
  // name 👉 base_url/search/batman
  // json.results[0].image.url
  // id: 👉 base_url/id
  // json.image.url
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
    //   console.log(json.powerstats)
      const superHero = json
    //   console.log(json)
      showHeroInfo(superHero) 
    })
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}

const showHeroInfo = (character) => {
  const name = `<h2>${character.name}</h2>`
//   console.log(name)

  const img = `<img src="${character.image.url}" height=200 width=200/>`
  
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
  }).join('')

  const biog = Object.keys(character.biography).map(bio=>{
    return `<p> ${bio.toUpperCase()} : ${character.biography[bio]}</p>`
  }).join('')

  const appe = Object.keys(character.appearance).map(element=>{
    return `<p> ${element.toUpperCase()} : ${character.appearance[element]}</p>`
  }).join('')

  const work = Object.keys(character.work).map(element=>{
    return `<p> ${element.toUpperCase()} : ${character.work[element]}</p>`
  }).join('')

  const conn = Object.keys(character.connections).map(element=>{
    return `<p> ${element.toUpperCase()} : ${character.connections[element]}</p>`
  }).join('')

//   console.log(`<p>${character.biography}</p>`)
  
  heroImageDiv.innerHTML = `<hr>${name}${img}<hr> 
                            <h3> Biography of Superhero </h3> ${biog}<hr>
                            <h3> Appearance of Superhero </h3> ${appe}<hr>
                            <h3>Power Stats of superhero </h3> ${stats}<hr>
                            <h3> Works of Superhero </h3> ${work}<hr>
                            <h3> Connections of Superhero </h3> ${conn}`
}

// <p>💪 Strength: ${json.powerstats.strength}</p><p>🧠 Intelligence: ${json.powerstats.intelligence}</p><p>🧠 Combat: ${json.powerstats.intelligence}</p><p>🧠 Speed: ${json.powerstats.intelligence}</p><p>🧠 Durability: ${json.powerstats.intelligence}</p>

const getSearchSuperHero = (name) => {
  console.log(searchInput.value)
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      showHeroInfo(hero) 
    })
}

const randomHero = () => {
  const numberOfHeroes = 731
  return Math.floor(Math.random() * numberOfHeroes) + 1
}

newHeroButton.onclick = () => getSuperHero(randomHero())

searchButton.onclick = () => getSearchSuperHero(searchInput.value)
