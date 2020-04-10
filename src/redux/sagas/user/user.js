import { takeEvery, call, put } from "redux-saga/effects";
import { message} from 'antd';
import ServiceForm from "../../../request/ServiceForm";
import Service from "../../../request/Service";
import * as constants from '../../../constants/actionType';

//登录
function *login(args) {
    try {
        const res = yield call(ServiceForm.post, 'fortune_admin/auth/login', args.args);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: constants.LOGIN_SUCCESS,
                    payload: res.data.data
                });
                message.success('登录成功');
                break;
            case -1:
                return message.error(res.data.message);
            case 1:
                return message.error(res.data.message);
            case 2:
                return message.error(res.data.message);
            default:
                return false
        }
    }catch (e) {
        console.log(e)
    }
}

export default function *rootUserSagas() {
    yield takeEvery(constants.LOGIN, login);
}
