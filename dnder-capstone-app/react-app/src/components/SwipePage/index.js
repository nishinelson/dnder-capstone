import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setLocalPCSwipes, setRemotePCSwipes, setLocalDMSwipes, setRemoteDMSwipes } from '../../store/swipe'
import { addSwipeRight, clearMatch } from '../../store/match'
import { getPC } from "../../store/pc"
import { getDM } from "../../store/dm"
import './SwipePage.css'


function SwipePage () {
  const cards = useSelector((state) => state?.swipe?.swipes);
  const userPC = useSelector((state) => state?.pc)
  const userDM = useSelector((state) => state?.dm)
  const match = useSelector((state) => state?.match)
  const dispatch = useDispatch();
  const [lastDirection, setLastDirection] = useState("")
  const [pcSwipe, setPCSwipe] = useState(false)
  const [dmSwipe, setDMSwipe] = useState(false)
  const { card, location } = useParams();

  let swipeHeader;
  let matchHeader;

  useEffect(()=> {
    dispatch(getPC());
    dispatch(getDM());
    if(card === 'pc' && location === 'local'){
      setDMSwipe(true);
      dispatch(setLocalPCSwipes());
      swipeHeader = <h1>Search for Players!</h1>
    }
    if(card === 'pc' && location === 'remote'){
      setDMSwipe(true);
      dispatch(setRemotePCSwipes());
      swipeHeader = <h1>Search for Players!</h1>
    }
    if(card === 'dm' && location === 'local'){
      setPCSwipe(true);
      dispatch(setLocalDMSwipes());
      swipeHeader = <h1>Search for Dungeon Masters!</h1>
    }
    if(card === 'dm' && location === 'remote'){
      setPCSwipe(true);
      dispatch(setRemoteDMSwipes());
      swipeHeader = <h1>Search for Dungeon Masters!</h1>
    }
  },[])

  if(card === 'pc') {
    swipeHeader = <h1>Search for Players!</h1>
  } else {
    swipeHeader = <h1>Search for Dungeon Masters!</h1>
  }

  if(match.dmSwipeBool === true && match.pcSwipeBool === true){
    matchHeader = <h1>You got a Match!</h1>
  }


  const swiped = async(direction, cardId) => {
    setLastDirection(direction)
    let dm;
    let pc;

    if(card === 'dm' && location === 'local'){
      pc = true;
    }
    if(card === 'dm' && location === 'remote'){
      pc = true;
    }
    if(card === 'pc' && location === 'local'){
      dm = true;
    }
    if(card === 'pc' && location === 'remote'){
      dm = true;
    }

    if(direction !== 'right'){
     dispatch(clearMatch())
    }


    if(direction === 'right'){
      if(pc){
        const data = {
          pcId: userPC.id,
          dmId: cardId,
          dmBool: false,
          pcBool: true
        };
        await dispatch(addSwipeRight(data));
        if(card === 'dm' && location === 'local'){
          await dispatch(setLocalDMSwipes());
        }
        if(card === 'dm' && location === 'remote'){
          await dispatch(setRemoteDMSwipes());
        }
      }

      if(dm){
        const data = {
          pcId: cardId,
          dmId: userDM.id,
          dmBool: true,
          pcBool: false
        };
        await dispatch(addSwipeRight(data));
        if(card === 'pc' && location === 'local'){
          await dispatch(setLocalPCSwipes());
        }
        if(card === 'pc' && location === 'remote'){
          await dispatch(setRemotePCSwipes());
        }
      }
    }

  }

  return (
    <div className='pageRoot'>
      <div className='swipeSection'>
        {swipeHeader}
        {matchHeader}
        <div className='cardContainer'>
          {cards?.map((card) =>
            <TinderCard className='swipe' key={card.id} preventSwipe={["up", "down"]} onSwipe={(dir) => swiped(dir, card.id, dmSwipe, pcSwipe)}>
              <div id="cardId" className={`card ${card.pcClass} ${card.experience}`}>
                <div className='cardInfo'>
                  <h3>{card.user.firstName}</h3>
                  {card.campaign ? (
                  <div id="card-swipe-text">
                    <div><b>Campaign:</b> {card.campaign}</div>
                    <div><b>Resources</b> {card.resources}</div>
                    <div><b>Experience:</b> {card.experience}</div>
                    <div><b>Party Size:</b> {card.partySize}</div>
                    <div><b>Description:</b> {card.description}</div>
                  </div>
                  ) : (
                  <div id="card-swipe-text">
                    <div><b>Class:</b> {card.pcClass}</div>
                    <div><b>Experience:</b> {card.experience}</div>
                    <div><b>Description:</b> {card.description}</div>
                  </div>
                  )}
                </div>
              </div>
            </TinderCard>
          )}
        </div>
        {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Click and drag card to swipe!</h2>}
      </div>
    </div>
  )
}

export default SwipePage
