const SET_PC = "pc/SET_PC";
const REMOVE_PC = "pc/REMOVE_PC"

const setPC = (pc) => {
  return {
    type: SET_PC,
    payload: pc
  };
};

const removePC = () => {
  return {
    type: REMOVE_PC
  }
}

export const clearPC = () => async (dispatch) => {
  dispatch(removePC())
}

export const deletePC = () => async (dispatch) => {
  fetch("/api/PC/delete")
  dispatch(removePC())
}

export const getPC = () => async (dispatch) => {
  let pcData = await fetch("/api/PC");
  let pc = await pcData.json();
  console.log(pc, "THIS IS IN THE GETPC THUNK")
  if(pc){
    dispatch(setPC(pc));
    return;
  } else {
    dispatch(setPC({}))
    return
  }

}

export const addPC = (pc) => async (dispatch) => {
  const response = await fetch("/api/PC/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pc)
  })
  let newPC = await response.json()
  console.log(newPC, "THIS IS IN THE ADDPC THUNK")
  if(newPC){
    dispatch(setPC(newPC))
    return
  }
}

export const editPC = (pc) => async (dispatch) => {
  const response = await fetch("/api/PC/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pc)
  })
  let newPC = await response.json()
  console.log(newPC, "THIS IS IN THE EDITPC THUNK")
  if(newPC){
    dispatch(setPC(newPC))
    return
  }
}

const initialState = {};

export default function pc(state = initialState, action) {
  switch(action.type) {
    case SET_PC:
      return { ...state, ...action.payload };
    case REMOVE_PC:
      return {};
    default:
      return state;
  }
}
