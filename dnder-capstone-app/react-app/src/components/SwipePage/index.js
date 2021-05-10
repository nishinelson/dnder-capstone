import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import './SwipePage.css'

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
    description: 'wizzy the wizard is iliterate, but doesnt let that stop him from casting spells',
    url: '../../images/wizard.png'
  },
  {
    name: 'Dinesh Chugtai',
    class: 'bard',
    description: 'wild magic sorcerer who has trouble not exploding',
    url: '../../images/bard.png'
  }
]

function SwipePage () {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className='pageRoot'>
      <div className='swipeSection'>
        <h1>Search for players!</h1>
        <div className='cardContainer'>
          {characters.map((character) =>
            <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
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
        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
      </div>
    </div>
  )
}

export default SwipePage
