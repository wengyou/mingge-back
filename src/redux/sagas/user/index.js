import { all } from "redux-saga/effects";
import rootUserSagas from "./user";

export default function *rootUser() {
    yield all([
        rootUserSagas(),
    ])
}
