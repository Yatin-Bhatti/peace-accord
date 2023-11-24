import { createStore,applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(logger, sagaMiddleware);
const store= createStore(rootReducer,middleware);
sagaMiddleware.run(rootSaga);
export default store
