const ADD_MATCH  = "match/ADD_MATCH";
const GET_MATCHES = "match/GET_MATCHES"

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

// add rest of thunk

export const getDMmatches = () => async (dispatch) => {
  let response = await fetch("/api/match/dmMatches")
  if(!response.ok){
    throw response;
  }
  let matches = await response.json();
  dispatch(getMatches(matches));
  return matches;
}

export const getPCmatches = () => async (dispatch) => {
  let response = await fetch("/api/match/pcMatches")
  if(!response.ok){
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
    default:
      return state;
  }
}
