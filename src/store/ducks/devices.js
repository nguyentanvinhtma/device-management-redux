import { createActions, createReducer } from "reduxsauce";
import axios from "axios";

// creating action types and creators
export const { Types, Creators } = createActions({
  addDevice: ["name", "price"],
  getDevices: [],
  updateDevice: ["id", "name", "price"],
  removeDevice: ["id"]
});

// creating reducer handlers
const INITIAL_STATE = [];

const headers = {
  headers: {
    'x-access-token': localStorage.getItem("token")
  }
}

const get = async (state = INITIAL_STATE, action) => {
  let resState = [];
  await axios.get(`http://localhost:8080/api/devices`, headers)
    .then(res => {
      const devices = res.data;
      resState = devices.map(device => {
        return {
          name: device.name,
          price: device.price,
          id: device.id
        }
      })
    })

  return resState;
};

const add = async (state = INITIAL_STATE, action) => {
  let resState = [];

  const postDevice = {
    name: action.name,
    price: action.price
  }

  await axios.post(
    `http://localhost:8080/api/devices`, postDevice,
    headers
  )
    .then(res => {
      const resDevice = res.data;

      resState = state.then((result) => {
        resState = [
          ...result,
          {
            name: resDevice.name,
            price: resDevice.price,
            id: resDevice.id
          },
        ];
      })
    });

  return resState;
};

const update = async (state = INITIAL_STATE, action) => {
  let resState = [];
  const postDevice = {
    name: action.name,
    price: action.price
  }

  await axios.put('http://localhost:8080/api/devices/' + action.id, postDevice, headers)
    .then(response => {
      if (response.status === 200)
        resState = state.then((result) => {
          return result
        });
    });

  return resState;
};

const remove = async (state = INITIAL_STATE, action) => {
  let resState = [];
  await axios.delete('http://localhost:8080/api/devices/' + action.id, headers)
    .then((result) => {
      if (result.status === 200) {
        state.then(result => {
          resState = result.filter((device) => device.id !== action.id);
        })
      }
    });

  return resState;
}

// creating reducer
export default createReducer(INITIAL_STATE, {
  [Types.ADD_DEVICE]: add,
  [Types.GET_DEVICES]: get,
  [Types.UPDATE_DEVICE]: update,
  [Types.REMOVE_DEVICE]: remove,
});
