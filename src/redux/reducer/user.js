import { fromJS,  } from "immutable";
import * as constants from "../../constants/actionType";
const defaultState = fromJS({
    "id": '',
    "username": '',
    "password": '',
    "phone": '',
    "loginFlag": false
});
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return state.merge({
                "id": action.payload.id,
                "username": action.payload.username,
                "password": action.payload.password,
                "phone": action.payload.phone,
                "loginFlag": true
            });
        default:
            return state
    }
}
