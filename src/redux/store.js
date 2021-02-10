import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import RootReducer from "./rootReducer";

const middlewares = [logger];

const store = createStore(RootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);
export { store, persistor };
