import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { decreaseCount, increaseCount } from "./redux/Counter/action"
import { getLatestNews, getNews } from "./redux/News/action"
import NewsList from "./components/News/NewsList"

const App = () => {
	const count = useSelector((state) => state?.counter?.count)
	const latestNews = useSelector((state) => state?.news?.latestNews || [])
	const popularNews = useSelector((state) => state?.news?.popularNews || [])
	
	const dispatch = useDispatch()
	
	const handleIncrease = () => {
		dispatch(increaseCount())
	}
	
	const handleDecrease = () => {
		dispatch(decreaseCount())
	}
	
	const handleGetNews = () => {
		dispatch(getNews())
		// dispatch(getLatestNews())
	}
	
	return (
		<>
			<button onClick={handleIncrease}> + </button>
			<button onClick={handleDecrease}> - </button>
			<button onClick={handleGetNews}> Get News </button>
			<h1>{count}</h1>
			
			<NewsList newsList={latestNews} title={'Latest News'}/>
			<NewsList newsList={popularNews} title={'Popular News'}/>
			
		</>
	);
};

export default App;
