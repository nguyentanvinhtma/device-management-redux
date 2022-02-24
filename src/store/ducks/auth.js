import { createActions, createReducer } from "reduxsauce";
import axios from "axios";

// creating action types and creators
export const { Types, Creators } = createActions({
    login: ["username", "password"],
    logout: []
});

// creating reducer handlers
const INITIAL_STATE = {};

const login = async (state = INITIAL_STATE, action) => {
    let resState = {};
    const postData = {
        username: action.username,
        password: action.password
    }
    await axios.post(`http://localhost:8080/api/login`, postData)
        .then(res => {
            const responseData = res.data;
            if (responseData.token) {
                resState = {
                    isAuthenticated: true,
                    token: responseData.token,
                    username: responseData.username,
                    userId: responseData._id
                }

                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("token", responseData.token);
                localStorage.setItem("username", responseData.username);
                localStorage.setItem("userId", responseData._id);
            }
        })

    return resState;
};

const logout = async (state = INITIAL_STATE, action) => {
    const resState = {
        isAuthenticated: false
    };

    localStorage.setItem("isAuthenticated", false);
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")

    return resState;
};

// creating reducer
export default createReducer(INITIAL_STATE, {
    [Types.LOGIN]: login,
    [Types.LOGOUT]: logout,
});
