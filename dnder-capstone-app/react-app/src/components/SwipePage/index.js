import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setLocalPCSwipes, setRemotePCSwipes, setLocalDMSwipes, setRemoteDMSwipes } from '../../store/swipe'
import './SwipePage.css'


function SwipePage () {
  const cards = useSelector((state) => state?.swipe?.swipes);
  const dispatch = useDispatch();
  const [lastDirection, setLastDirection] = useState()
  const { card, location } = useParams();

  useEffect(()=> {
    if(card === 'pc' && location === 'local'){
      dispatch(setLocalPCSwipes())
    }
    if(card === 'pc' && location === 'remote'){
      dispatch(setRemotePCSwipes())
    }
    if(card === 'dm' && location === 'local'){
      dispatch(setLocalDMSwipes())
    }
    if(card === 'dm' && location === 'remote'){
      dispatch(setRemoteDMSwipes())
    }
  }, [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  if(cards){
    console.log(cards[0])
  }

  return (
    <div className='pageRoot'>
      <div className='swipeSection'>
        <h1>Search for players!</h1>
        <div className='cardContainer'>
          {cards?.map((card) =>
            <TinderCard className='swipe' key={card.id} onSwipe={(dir) => swiped(dir, card.user.firstName)} onCardLeftScreen={() => outOfFrame(card.user.firstName)}>
              <div id="cardId" className={`card ${card.pcClass}`}>
                <div className='cardInfo'>
                  <h3>{card.user.firstName}</h3>
                  <div>{card.pcClass}</div>
                  <div>{card.description}</div>
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
