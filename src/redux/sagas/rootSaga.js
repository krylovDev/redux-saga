import { takeEvery, put, call, fork, all} from 'redux-saga/effects'
import { getLatestNews, getPopularNews } from "../../api/api"
import { GET_LATEST_NEWS, GET_NEWS } from "../News/constants"
import { setLatestNews, setPopularNews } from "../News/action"

/** Effects
 * @race - Запускает несколько запросов. Возвращает результат самого быстрого запроса.
 * @all - Аналог Promise.all
 * Но возвращает результат, когда выполнятся несколько запросов. Если один из запросов упадёт - call не вернёт ничего
 * @fork - Неблокирующий эффект. Позволяет кинуть сразу несколько независимых запросов на сервер
 * @call - Блокирующий эффект. Блокирует дальнейшее выполнение, пока Promise не вернёт resolve.
 * Выполняет переданную в него ф-ию. Можно передавать аргументы.
 * @put - Аналог dispatch
 * @take - Блокирующий эффект, который следит за экшеном и разблокирует остальные потоки, если этот экшен произойдет.
 * Можно делать цепочки
 * @takeEvery - Срабатывает каждый раз, когда срабатывает экшн. Принимает экшн и callback.
 * @takeLatest - Осуществляет вызов ТОЛЬКО последней переданной функции
 * @takeLeading - Вызывает лишь 1-ую сагу, отменив вызов последующих, если 1-ая ещё не выполнилась
 * @select - Помогает работать со Store. Принимат ф-ию в которую передаётся State
 * */

export function* handlePopularNews(){
	const { hits } = yield call(getPopularNews)
	yield put(setPopularNews(hits))
}

export function* handleLatestNews(){
	const { hits } = yield call(getLatestNews)
	yield put(setLatestNews(hits))
}

/** @Worker
 * Запускается в зависимости от выполненного экшена (Работа с асинхронным кодом, работа в АПИ) */
export function* handleNews() {
	// const { hits } = yield call(getLatestNews, 'react') // Передача аргументов
	// const { hits } = yield call(getLatestNews) // Блокируем поток, пока не получим resolve
	// const { hits } = yield getLatestNews() // Получаем новости
	
	// yield fork(handlePopularNews)
	// yield fork(handleLatestNews)
	
	yield all([
		call(handleLatestNews),
		call(handlePopularNews)
	])
	
	// yield put(setLatestNews(hits)) // Сохраняем в Store
}


/** @Watcher
 * Для слежения за экшенами */
export function* watchClickSaga() {
	yield takeEvery(GET_NEWS, handleNews)
}


/** Родитель для всех последующих Саг */
export default function* rootSaga() {
	yield watchClickSaga()
}
