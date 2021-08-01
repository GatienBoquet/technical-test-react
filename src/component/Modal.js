import React, { useState, useEffect } from "react";
import "../../src/App.css";

const Modal = ({ addItem, item }) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [colors, setColors] = useState("black");
	const [image, setImage] = useState("http://localhost:3000/logo192.png");

	const [isCorrect, setisCorrect] = useState(false);

	const [_id, setID] = useState();

	const handleSubmit = (evt) => {
		evt.preventDefault();
		let item = { image, name, price, quantity, colors, _id };
		addItem(item);
	};

	const onFileChange = (event) => {
		const item = event.target.files[0];
		setImage(URL.createObjectURL(item));
	};

	const isSequence = (numbers) => {
		if (numbers[0] === numbers[1] && numbers[0] === numbers[2]) {
			return true;
		}
		return false;
	};

	const isNameCorrect = (name) => {
		/*
		-On vérifie si il y a bien un espace
		-On split le string sur chaque espace 
		-Si string[1] existe && l'array de string est infèrieur à 3 && le string [1] est égale à 6 && le string comporte uniquement des nombres
		-On vérifie ensuite si c'est une séquence
		*/
		const nameReceived = name;
		let arrayofstring = [];
		if (/\s/.test(nameReceived)) {
			arrayofstring = nameReceived.split(" ");
			if (
				arrayofstring[1] &&
				arrayofstring.length < 3 &&
				arrayofstring[1].length == 6 &&
				/^\d+$/.test(arrayofstring[1]) &&
				isSequence(arrayofstring[1].toString().slice(3, 6))
			) {
				return true;
			}
			return false;
		}
		return false;
	};

	const setCorrectName = (name) => {
		const isCorrect = isNameCorrect(name);
		setisCorrect(isCorrect);
		setName(name);
	};

	useEffect(() => {
		if (item) {
			setImage(item.image);
			setQuantity(item.quantity);
			setName(item.name);
			setCorrectName(item.name);
			setPrice(item.price);
			setID(item._id);
		}
	}, []);

	return (
		<div className="modal-container">
			<form onSubmit={handleSubmit}>
				<label htmlFor="input">Image of product :</label>
				<br></br>
				<img src={image} className="image-input" alt="alt" />
				<br></br>
				<input
					type="file"
					id="input"
					onChange={onFileChange}
					files={image}
					accept="image/png, image/gif, image/jpeg"
				/>
				<br></br>
				<label htmlFor="name">
					Name should be : Product XYZXXX where XXX is a sequence
				</label>
				<br></br>
				<input
					id="name"
					type="text"
					value={name}
					style={
						isCorrect
							? { backgroundColor: "lightgreen" }
							: { backgroundColor: "LightCoral" }
					}
					onFocus={(e) => setCorrectName(e.target.value)}
					onInput={(e) => setCorrectName(e.target.value)}
				/>
				<br></br>
				<label htmlFor="price">Price</label>
				<br></br>
				<input
					id="price"
					type="number"
					value={price}
					min={0}
					onChange={(e) => setPrice(e.target.value)}
				></input>
				<br></br>
				<label htmlFor="quantity">Quantity</label>
				<br></br>
				<input
					id="quantity"
					type="number"
					value={quantity}
					min={0}
					onChange={(e) => setQuantity(e.target.value)}
				></input>
				<br></br>
				<label htmlFor="colors">Colors</label>
				<br></br>
				<select
					id="colors"
					name="colors"
					value={colors}
					onChange={(e) => setColors(e.target.value)}
				>
					<option value="black">black</option>
					<option value="blue">blue</option>
					<option value="red">red</option>
					<option value="white">white</option>
				</select>
				<br></br>
				<input type="submit" value="Submit" disabled={!isCorrect} />
			</form>
		</div>
	);
};

export default Modal;
