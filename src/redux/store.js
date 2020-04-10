import { createStore, applyMiddleware} from "redux";
import reducers from "./reducer";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import sagas from "./sagas";
//创建redux中间件，将sagas与redux store 链接起来
const sagaMiddleware = createSagaMiddleware();
const dev = process.env.NODE_ENV !== "production";
const store = createStore(
    reducers,
    //将sagaMiddleware中间件传入到applyMiddleware函数中
    dev ?
        composeWithDevTools(applyMiddleware(sagaMiddleware))
        :
        applyMiddleware(sagaMiddleware)
);
//动态执行saga，run函数只能在store创建好后调用
sagas.map(item => sagaMiddleware.run(item));
export default store;
