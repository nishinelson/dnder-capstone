const SET_PC = "pc/SET_PC";

const setPC = (pc) => {
  return {
    type: SET_PC,
    payload: pc
  };
};

export const getPC = () => async (dispatch) => {
  let pcData = await fetch("/api/PC");
  let pc = await pcData.json();
  console.log(pc, "THIS IS IN THE GETPC THUNK")
  if(pc){
    dispatch(setPC(pc));
    return;
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

const initialState = {};

export default function pc(state = initialState, action) {
  switch(action.type) {
    case SET_PC:
      return { ...state, ...action.pc };
    default:
      return state;
  }
}
