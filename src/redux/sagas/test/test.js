import { takeEvery, call, put } from "redux-saga/effects";
import { message} from 'antd';
import Service from "../../../request/Service";
import ServiceForm from "../../../request/ServiceForm";
import * as constants from "../../../constants/actionType";

//获取所有测试题
function *fetchAllTest(args) {
    try {
        const res = yield call(Service.post, 'fortune_admin/test/queryTestInfo', args.args);
        const data = res.data.data.items;
        data.map((item, index) => {
            return(
                item.key = index + 1
            )
        });
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: constants.FETCH_ALL_TEST_SUCCESS,
                    payload: res.data.data,
                    dataKey: data
                });
                break;
            case -1:
                return message.error(res.data.message);
            case 1:
                return message.error(res.data.message);
            case 2:
                return message.error(res.data.message);
            default:
                return message.error('获取所有测试题失败');
        }
    } catch (e) {
        console.log(e);
    }
}

//获取套题详情
function *fetchTestDetail(args) {
    const res = yield call(Service.get, `fortune_admin/test/queryTestDetailedInfo?tid=${args.args.tid}`);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: constants.FETCH_TEST_DETAIL_SUCCESS,
                payload: res.data.data
            });
            break;
        case -1:
            return message.error(res.data.message);
        case 1:
            return message.error(res.data.message);
        case 2:
            return message.error(res.data.message);
        default:
            return message.error('获取测试题详情失败');
    }
}
//删除套题
function *deleteTest(args) {
    const formData = new FormData();
    formData.append("tids", args.args.tids);
    const res = yield call(ServiceForm.post, 'fortune_admin/test/deletedTest', formData);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: constants.DELETE_TEST_SUCCESS,
            });
            message.success(`删除tid为${args.args.tids}的套题成功`);
            break;
        case -1:
            return message.error(res.data.message);
        case 1:
            return message.error(res.data.message);
        case 2:
            return message.error(res.data.message);
        default:
            return message.error("删除失败");
    }
}

//添加套题
function *addTest(args) {
    // const testData = args.args.testData;
    // const questions = args.args.questions;
    // const answers = args.args.answers;
    // const questionAnswers = args.args.questionAnswers;
    // questions.answer = questionAnswers;
    // testData.questions = questions;
    // testData.answers = answers;
    const res = yield call(Service.post, 'fortune_admin/test/addTest', args.args);
    switch (res.data.error_code) {
        case 0:
            return message.success('提交套题成功');
        case -1:
            return message.error(res.data.message);
        case 1:
            return message.error(res.data.message);
        case 2:
            return message.error(res.data.message);
        default:
            return message.error('提交套题失败');
    }
}

//添加套题 新版本
function *addNewTest(args) {
    const res = yield call(Service.post, 'fortune_admin/test/addTest', args.args);
    switch (res.data.error_code) {
        case 0:
            return message.success('提交套题成功');
        case -1:
            return message.error(res.data.message);
        case 1:
            return message.error(res.data.message);
        case 2:
            return message.error(res.data.message);
        default:
            return message.error('提交套题失败');
    }
}

//保存套题
function *saveTest(args) {
    const res = yield call(Service.post, 'fortune_admin/answer/saveTest', args.args);
    switch (res.data.error_code) {
        case 0:
            return message.success('保存套题成功');
        case -1:
            return message.error(res.data.message);
        case 1:
            return message.error(res.data.message);
        case 2:
            return message.error(res.data.message);
        default:
            return message.error('保存套题失败');
    }
}

//修改套题属性
function *modifyTest(args) {
    let testData = {};
    testData.test = args.args.test;
    testData.questions = args.args.questions;
    testData.answers = args.args.answers;
    const res = yield call(Service.post, 'fortune_admin/test/updateTest', testData);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: constants.MODIFY_TEST_SUCCESS
            });
            return message.success(res.data.message);
        case -1:
            return message.error(res.data.message);
        case 1:
            return message.error(res.data.message);
        case 2:
            return message.error(res.data.message);
        default:
            return message.error('修改套题属性失败');
    }
}
//修改问题属性
function *modifyQuestion(args) {
    let testData = {};
    testData.test = args.args.test;
    testData.questions = args.args.questions;
    testData.answers = args.args.answers;
    const res = yield call(Service.post, 'fortune_admin/test/updateTest', testData);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: constants.MODIFY_QUESTION_SUCCESS
            });
            return message.success(res.data.message);
        case -1:
            return message.error(res.data.message);
        case 1:
            return message.error(res.data.message);
        case 2:
            return message.error(res.data.message);
        default:
            return message.error('修改问题属性失败');
    }
}
//发布
function *releasedTest(args) {
    const formData = new FormData();
    formData.append("tids", args.args.tids);
    const res = yield call(ServiceForm.post, 'fortune_admin/test/releaseTest', args.args);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: constants.RELEASED_TEST_success
            });
            return message.success(res.data.message);
        case -1:
            return message.error(res.data.message);
        case 1:
            return message.error(res.data.message);
        case 2:
            return message.error(res.data.message);
        default:
            return message.error('发布失败');
    }
}

export default function *rootTestSagas() {
    yield takeEvery(constants.FETCH_ALL_TEST, fetchAllTest);
    yield takeEvery(constants.FETCH_TEST_DETAIL, fetchTestDetail);
    yield takeEvery(constants.DELETE_TEST, deleteTest);
    // yield takeEvery(constants.ADD_TEST, addTest);
    yield takeEvery(constants.SAVE_TEST, saveTest);
    yield takeEvery(constants.MODIFY_TEST, modifyTest);
    yield takeEvery(constants.MODIFY_QUESTION, modifyQuestion);
    yield takeEvery(constants.RELEASED_TEST, releasedTest);
    yield takeEvery(constants.ADD_NEW_TEST, addNewTest);
}
