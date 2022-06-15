import { GET_LATEST_NEWS, GET_NEWS, SET_LATEST_NEWS, SET_POPULAR_NEWS } from "./constants"

export const getLatestNews = () => ({
	type: GET_LATEST_NEWS
})

export const setLatestNews = (payload) => ({
	type: SET_LATEST_NEWS,
	payload
})

export const setPopularNews = (payload) => ({
	type: SET_POPULAR_NEWS,
	payload
})

export const getNews = (payload) => ({
	type: GET_NEWS,
	payload
})

