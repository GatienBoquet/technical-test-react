import React from "react";
import Card from "./Card";

export const ArticleList = ({ articles, deleteArticle, editItem }) => {
	return (
		<div className="article-list">
			{articles.map((item) => (
				<Card item={item} deleteItem={deleteArticle} editItem={editItem} />
			))}
		</div>
	);
}
