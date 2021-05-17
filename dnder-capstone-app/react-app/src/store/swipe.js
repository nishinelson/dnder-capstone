const SET_SWIPE_PCS = "swipe/SET_SWIPE_PCS"

const setSwipes = (swipes) => {
  return {
    type: SET_SWIPE_PCS,
    payload: swipes
  }
}

export const setLocalPCSwipes = () => async (dispatch) => {
  let response = await fetch("/api/swipe/pc/local")
  if(!response.ok){
    throw response
  }
  let pcArr = await response.json()
  dispatch(setSwipes(pcArr))
}

export const setRemotePCSwipes = () => async (dispatch) => {
  let response = await fetch("/api/swipe/pc/remote")
  if(!response.ok){
    throw response
  }
  let pcArr = await response.json()
  dispatch(setSwipes(pcArr))
}

export const setLocalDMSwipes = () => async (dispatch) => {
  let response = await fetch("/api/swipe/dm/local")
  if(!response.ok){
    throw response
  }
  let dmArr = await response.json()
  dispatch(setSwipes(dmArr))
}

export const setRemoteDMSwipes = () => async (dispatch) => {
  let response = await fetch("/api/swipe/dm/remote")
  if(!response.ok){
    throw response
  }
  let dmArr = await response.json()
  dispatch(setSwipes(dmArr))
}

const initialState = {};

export default function swipe(state = initialState, action) {
  switch(action.type) {
    case SET_SWIPE_PCS:
      return { ...state, ...action.payload}
    default:
      return state;
  }
}
