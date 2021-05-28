const ADD_MATCH  = "match/ADD_MATCH";
const GET_MATCHES = "match/GET_MATCHES"
const RESET_MATCH = "match/RESET_MATCH"

const getMatches = (matches) => {
  return {
    type: GET_MATCHES,
    payload: matches
  }
}

const addMatch = (match) => {
  return {
    type: ADD_MATCH,
    payload: match
  }
}

const resetMatch = () => {
  return {
    type: RESET_MATCH
  }
}


export const clearMatch = () => async(dispatch) => {
  dispatch(resetMatch())
}

export const getDMmatches = () => async (dispatch) => {
  let response = await fetch("/api/match/dmMatches")
  if(!response.ok){
    dispatch(getMatches({}))
    throw response
  }
  let matches = await response.json();
  dispatch(getMatches(matches));
  return matches;
}

export const getPCmatches = () => async (dispatch) => {
  let response = await fetch("/api/match/pcMatches")
  if(!response.ok){
    dispatch(getMatches({}))
    throw response;
  }
  let matches = await response.json();
  dispatch(getMatches(matches));
  return matches;
}

export const addSwipeRight = (data) => async (dispatch) => {
  let response = await fetch("/api/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if(!response.ok){
    throw response;
  }
  let matchData = await response.json();
  dispatch(addMatch(matchData));
  return matchData
}

const initialState = {};

export default function match(state = initialState, action) {
  switch(action.type) {
    case GET_MATCHES:
      return {...state, ...action.payload}
    case ADD_MATCH:
      return { ...state, ...action.payload};
      case RESET_MATCH:
        return {}
    default:
      return state;
  }
}
