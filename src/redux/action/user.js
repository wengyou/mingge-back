import * as constants from "../../constants/actionType";

export const login = args => ({
    type: constants.LOGIN,
    args,
});
