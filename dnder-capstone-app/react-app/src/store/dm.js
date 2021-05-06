const SET_DM = "dm/SET_DM";

const setDM = (dm) => {
  return {
    type: SET_DM,
    payload: dm
  };
};

export const getDM = () => async (dispatch) => {
  let dmData = await fetch("/api/DM");
  let dm = await dmData.json();
  console.log(dm, "THIS IS IN THE GETDM THUNK")
  if(dm){
    dispatch(setDM(dm));
    return;
  } else {
    dispatch(setDM({}))
    return
  }

}

export const addDM = (dm) => async (dispatch) => {
  const response = await fetch("/api/DM/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dm)
  })
  let newDM = await response.json()
  console.log(newDM, "THIS IS IN THE ADDDM THUNK")
  if(newDM){
    dispatch(setDM(newDM))
    return
  }
}

const initialState = {};

export default function dm(state = initialState, action) {
  switch(action.type) {
    case SET_DM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
