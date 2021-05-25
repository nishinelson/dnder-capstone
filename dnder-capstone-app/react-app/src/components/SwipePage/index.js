import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setLocalPCSwipes, setRemotePCSwipes, setLocalDMSwipes, setRemoteDMSwipes } from '../../store/swipe'
import { addSwipeRight } from '../../store/match'
import { getPC } from "../../store/pc"
import { getDM } from "../../store/dm"
import './SwipePage.css'


function SwipePage () {
  const cards = useSelector((state) => state?.swipe?.swipes);
  const userPC = useSelector((state) => state?.pc)
  const userDM = useSelector((state) => state?.dm)
  const dispatch = useDispatch();
  const [lastDirection, setLastDirection] = useState("")
  const [pcSwipe, setPCSwipe] = useState(false)
  const [dmSwipe, setDMSwipe] = useState(false)
  const { card, location } = useParams();


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
  },[])


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
        <h1>Search for players!</h1>
        <div className='cardContainer'>
          {cards?.map((card) =>
            <TinderCard className='swipe' key={card.id} onSwipe={(dir) => swiped(dir, card.id, dmSwipe, pcSwipe)}>
              <div id="cardId" className={`card ${card.pcClass} ${card.experience}`}>
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
