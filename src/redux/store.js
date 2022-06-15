import { createStore, compose, applyMiddleware } from "redux"
import rootReducer from "./root.reducer"
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas/rootSaga"

/**
 * @context - дефолтное состояние Контекста, к которому в дальшейнем можно получить  доступ внутри саг и экшнов
 * @sagaMonior - помогает в логировании различных действий
 * @onError - глобальный обработчик ошибок
 * @effectMiddleware - вводит механизм, с помощью которого можно выполнять доп.обработку эффектов внутри саги
 * */

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		}) : compose;

/** @preloadedState - начальные данные дял store */
const configureStore = preloadedState => createStore(
	rootReducer, // корневой reducer
	preloadedState, // начальное состояние Store
	composeEnhancers(applyMiddleware(sagaMiddleware)) // middleware
)

const store = configureStore({}) // Вызов store

sagaMiddleware.run(rootSaga) // Запуск Саги

export default store
