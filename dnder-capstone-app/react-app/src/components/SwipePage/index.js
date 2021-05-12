import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setLocalPCSwipes, setRemotePCSwipes, setLocalDMSwipes, setRemoteDMSwipes } from '../../store/swipe'
import { addSwipeRight } from '../../store/match'
import { getPC, deletePC } from "../../store/pc"
import { getDM, deleteDM } from "../../store/dm"
import './SwipePage.css'
import pc from '../../store/pc';


function SwipePage () {
  const cards = useSelector((state) => state?.swipe?.swipes);
  const userPC = useSelector((state) => state?.pc)
  const userDM = useSelector((state) => state?.dm)
  const dispatch = useDispatch();
  const [lastDirection, setLastDirection] = useState("")
  const [pcSwipe, setPCSwipe] = useState(false)
  const [dmSwipe, setDMSwipe] = useState(false)
  const { card, location } = useParams();

  // let cards;
  // if(cardsArr) {
  //   cards = cardsArr.filter(card => card.dmId !== userDM.id && card.dm)
  // }

  useEffect(()=> {
    dispatch(getPC());
    dispatch(getDM());
    if(card === 'pc' && location === 'local'){
      setDMSwipe(true);
      dispatch(setLocalPCSwipes());
    }
    if(card === 'pc' && location === 'remote'){
      setDMSwipe(true);
      dispatch(setRemotePCSwipes());
    }
    if(card === 'dm' && location === 'local'){
      setPCSwipe(true);
      dispatch(setLocalDMSwipes());
    }
    if(card === 'dm' && location === 'remote'){
      setPCSwipe(true);
      dispatch(setRemoteDMSwipes());
    }
  }, [])

  console.log(pcSwipe, dmSwipe, "TTTTTTTTTTTTTTTTTTTTTTTTTT")

  const swiped = (direction, cardId) => {
    // console.log('removing: ' + nameToDelete)
    console.log(direction, "==========================")
    setLastDirection(direction)

    if(direction === 'right'){
      if(pcSwipe){
        const data = {
          pcId: userPC.id,
          dmId: cardId,
          dmBool: dmSwipe,
          pcBool: pcSwipe
        }
        dispatch(addSwipeRight(data))
      }

      if(dmSwipe){
        console.log("made it here!!!!!!!!!!!!")
        const data = {
          pcId: cardId,
          dmId: userDM.id,
          dmBool: dmSwipe,
          pcBool: pcSwipe
        }
        dispatch(addSwipeRight(data))
      }
    }

  }

  // const outOfFrame = (name) => {
  //   console.log(name + ' left the screen!')
  // }onCardLeftScreen={() => outOfFrame(card.user.firstName)}

  return (
    <div className='pageRoot'>
      <div className='swipeSection'>
        <h1>Search for players!</h1>
        <div className='cardContainer'>
          {cards?.map((card) =>
            <TinderCard className='swipe' key={card.id} onSwipe={(dir) => swiped(dir, card.id)}>
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
