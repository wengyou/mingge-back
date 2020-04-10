import * as constants from "../../constants/actionType";

export const fetchAllTest = args => ({
    type: constants.FETCH_ALL_TEST,
    args
});
export const fetchTestDetail = args => ({
    type: constants.FETCH_TEST_DETAIL,
    args
});
export const deleteTest = args => ({
    type: constants.DELETE_TEST,
    args
});
export const addTest = args => ({
    type: constants.ADD_TEST,
    args
});
export const saveTest = args => ({
    type: constants.SAVE_TEST,
    args
});
export const modifyTest = args => ({
    type: constants.MODIFY_TEST,
    args
});
export const modifyQuestion = args => ({
    type: constants.MODIFY_QUESTION,
    args
});
export const releaseTest = args => ({
    type: constants.RELEASED_TEST,
    args
});
export const addNewTest = args => ({
    type: constants.ADD_NEW_TEST,
    args,
});
