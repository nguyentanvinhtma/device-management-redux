import { createActions, createReducer } from "reduxsauce";

// creating action types and creators
export const { Types, Creators } = createActions({
  addDevice: ["name", "price"],
  updateDevice: ["id", "name", "price"],
  removeDevice: ["id"],
  // chooseDevice: ["id"]
});

// creating reducer handlers
const INITIAL_STATE = [];

const add = (state = INITIAL_STATE, action) => [
  ...state,
  {
    id: Math.random(),
    name: action.name,
    price: action.price
  },
];

// const toogle = (state = INITIAL_STATE, action) =>
//   state.map((todo) =>
//     todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
//   );
// const choose = (state = INITIAL_STATE, action) => {
//   // console.log(state.filter((device) => device.id === action.id)[0]);
//   CHOSEN_DEVICE = state.filter((device) => device.id === action.id)[0];
//   // return state.filter((device) => device.id === action.id);
//   return state;
// }

const update = (state = INITIAL_STATE, action) => {
  const resState = state.map(device => {
    if (device.id === action.id) {
      return {
        id: action.id,
        name: action.name,
        price: action.price
      };
    }
    return device;
  });

  return resState;
};

const remove = (state = INITIAL_STATE, action) =>
  state.filter((device) => device.id !== action.id);

// creating reducer
export default createReducer(INITIAL_STATE, {
  [Types.ADD_DEVICE]: add,
  [Types.UPDATE_DEVICE]: update,
  [Types.REMOVE_DEVICE]: remove,
  // [Types.CHOOSE_DEVICE]: choose,
});
