import React from "react";

const Card = ({ item, deleteItem, editItem }) => {
	const handleClick = (index) => {
		deleteItem(index);
	};

	const handleEdit = (index) => {
		editItem(index);
	};

	return (
		<tr className="card-Style">
			<th>{item.name}</th>
			<th>
				<img src={item.image} className="card-image" alt="product" />
			</th>
			<th>{item.price != "0" ? item.price + " $" : "Out of order"}</th>
			<th>{item.quantity}</th>
			<th>{item.colors}</th>
			<th>
				<button
					onClick={() => {
						handleClick(item._id);
					}}
				>
					delete
				</button>
				<button
					onClick={() => {
						handleEdit(item._id);
					}}
				>
					edit
				</button>
			</th>
		</tr>
	);
};

export default Card;
