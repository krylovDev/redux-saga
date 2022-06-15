import React from 'react';

const NewsItem = (newsItem) => {
	return (
		<li key={newsItem.objectID} className="news">
			<div className="description">
				<a href={newsItem.url} className="news-title">{newsItem.title || 'No title'}</a>
				<span className="text">{`${newsItem.points || 0} points`}</span>
				<span className="comments">{`${newsItem.num_comments || 0} comments`}</span>
				<span className="date">{new Date(newsItem.created_at).toLocaleDateString()}</span>
				<span className="author">{newsItem.author || 'no author'}</span>
			</div>
		</li>
	);
};

export default NewsItem;
