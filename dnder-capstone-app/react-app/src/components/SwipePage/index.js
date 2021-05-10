import React, { useState, useMemo } from 'react';
import TinderCard from 'react-tinder-card'
import './SwipePage.css'


// const SwipePage = () => {

//   const onSwipe = (direction) => {
//     console.log('You swiped: ' + direction)
//   }

//   const onCardLeftScreen = (myIdentifier) => {
//     console.log(myIdentifier + ' left the screen')
//   }

//   return (
//     <TinderCard
//     onSwipe={onSwipe}
//     onCardLeftScreen={() => onCardLeftScreen('fooBar')}
//     preventSwipe={['right', 'left']}
//     >Hello, World!</TinderCard>
//   )
// }

const db = [
  {
    name: 'Richard Hendricks',
    class: 'ranger',
    url: '../../images/ranger.png'
  },
  {
    name: 'Erlich Bachman',
    class: 'warlock',
    url: '../../images/warlock.png'
  },
  {
    name: 'Monica Hall',
    class: 'monk',
    url: '../../images/monk.png'
  },
  {
    name: 'Jared Dunn',
    class: 'wizard',
    url: '../../images/wizard.png'
  },
  {
    name: 'Dinesh Chugtai',
    class: 'bard',
    description: 'wild magic sorcerer who has trouble not exploding',
    url: '../../images/bard.png'
  }
]

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function SwipePage () {
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  return (
    <div className='pageRoot'>
      <div className='swipeSection'>
        {/* <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' /> */}
        {/* <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' /> */}
        <h1>Search for players!</h1>
        <div className='cardContainer'>
          {characters.map((character, index) =>
            <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
              <div className={`card ${character.class}`}>
                <div className='cardInfo'>
                  <h3>{character.name}</h3>
                  <div>{character.class}</div>
                  <div>{character.description}</div>
                </div>
              </div>
            </TinderCard>
          )}
        </div>
        <div className='buttons'>
          <button onClick={() => swipe('left')}>Swipe left!</button>
          <button onClick={() => swipe('right')}>Swipe right!</button>
        </div>
        {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
      </div>
    </div>
  )
}

export default SwipePage
