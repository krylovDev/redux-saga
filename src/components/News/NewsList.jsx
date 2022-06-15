import './news.css';
import NewsItem from "./NewsItem"

const NewsList = (props) => {
	if (!props.newsList || props.newsList.length === 0) {
		return null;
	}
	
	return (
		<div>
			<h2>{ `${ props.title }:` }</h2>
			<ul className="news-list">
				{ props.newsList.map((newsItem) => <NewsItem {...newsItem}/>) }
			</ul>
		</div>
	);
};


export default NewsList
