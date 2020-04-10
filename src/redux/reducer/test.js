import { fromJS,  } from "immutable";
import * as constants from "../../constants/actionType";
const defaultState = fromJS({
    "allTestData": {},
    "dataKey": [],
    "testDetailData": {},
    "allTestDataFlag": '',
    "updateFlag": false,
    "update": ''
});
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.FETCH_ALL_TEST_SUCCESS:
            return state.merge({
                allTestData: action.payload,
                dataKey: action.dataKey
            });
        case constants.FETCH_TEST_DETAIL_SUCCESS:
            return state.merge({
                testDetailData: action.payload
            });
        case constants.DELETE_TEST_SUCCESS:
            return state.merge({
                allTestDataFlag: new Date()
            });
        case constants.MODIFY_QUESTION_SUCCESS:
            return state.merge({
                updateFlag: false,
                update: new Date()
            });
        case constants.MODIFY_TEST_SUCCESS:
            return state.merge({
                updateFlag: false,
                update: new Date()
            });
        case constants.RELEASED_TEST_success:
            return state.merge({
                allTestDataFlag: new Date()
            });
        default:
            return state
    }
}
