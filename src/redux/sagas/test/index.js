import { all } from "redux-saga/effects";
import rootTestSagas from './test'

export default function *rootTest() {
    yield all([
        rootTestSagas(),
    ])
}
