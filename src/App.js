import "./App.css";
import { useState, useEffect } from "react";
import Modal from "./component/Modal";
import { ArticleList } from "./component/ArticleList";
import NewWindow from "react-new-window";

//Json generated with https://www.json-generator.com/
function App() {
	const [articles, setArticles] = useState([]);
	const [searchValue, setsearchValue] = useState("");

	const [selectedItem, setSelectedItem] = useState("");

	const [showWindowPortal, setShowWindowsPortal] = useState(false);

	const getData = () => {
		fetch("generated_18.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setArticles(myJson);
			});
	};

	const changeSearchValue = (e) => {
		setsearchValue(e.target.value);
	};

	const deleteItem = (id) => {
		var newArray = [...articles];
		var index = newArray.findIndex((x) => x._id === id);
		newArray.splice(index, 1);
		setArticles(newArray);
	};

	//generate a random_id - this is not secure.
	const random_id = (index) => {
		let n = (Math.random() * 0xfffff * 10000000000).toString(16);
		return n.slice(0, index);
	};

	const addItem = ({ name, price, quantity, image, colors, _id }) => {
		if (_id) {
			var newArray = [...articles];
			var index = newArray.findIndex((x) => x._id === _id);
			newArray[index].name = name;
			newArray[index].price = price;
			newArray[index].quantity = quantity;
			newArray[index].image = image;
			newArray[index].colors = colors;
			setArticles(newArray);
			toggleWindowPortal();
		} else {
			var item = {
				_id: "60fdcd" + random_id(34),
				guid: "e01011e3-a291-42a6-a2ed-ca98ab7dcc" + random_id(2),
				name: name || "Pas de nom",
				image: image || "./logo192.png",
				price: price || 1,
				quantity: quantity || 1,
				colors: colors || "white",
			};
			var newArray = [...articles];
			newArray.push(item);
			setArticles(newArray);
			toggleWindowPortal();
		}
	};

	const editItem = (id) => {
		var newArray = [...articles];
		var index = newArray.findIndex((x) => x._id === id);
		if (newArray[index].length != 0) {
			setSelectedItem(newArray[index]);
			toggleWindowPortal();
		}
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		//console.log("nouveau articles de useffect", articles);
	}, [articles]);

	const filteredArticles = articles.filter((article) => {
		return article.name.includes(searchValue);
	});

	function allowDrop(e) {
		e.preventDefault();
		e.stopPropagation();
	}
	function drop(e) {
		e.preventDefault();
		e.stopPropagation();
		let dropppedimg = URL.createObjectURL(e.dataTransfer.files[0]);
		if (dropppedimg) {
			let newItem = { image: dropppedimg };
			setSelectedItem(newItem);
			toggleWindowPortal();
		}
		return;
	}

	const toggleWindowPortal = () => {
		setShowWindowsPortal(!showWindowPortal);
	};

	//unloading window - clearing selected item
	const unLoadWindow = () => {
		setSelectedItem();
	};

	return (
		<div className="App">
			{showWindowPortal ? (
				<NewWindow onUnload={unLoadWindow} copyStyles title={"Add Product"}>
					<Modal
						addItem={addItem}
						item={selectedItem}
						editItem={editItem}
					></Modal>
					<button onClick={() => toggleWindowPortal()}>Close portal</button>
				</NewWindow>
			) : null}
			<header className="App-header">
				<label htmlFor="searchbar">Search :</label>
				<input
					id="searchbar"
					onChange={(e) => changeSearchValue(e)}
					type="text"
				></input>
				<div className="Header-action">
					<button className="button-action" onClick={() => toggleWindowPortal()}>Ajouter un item</button>
					<div
						className="drop-div"
						onDrop={(e) => drop(e)}
						onDragOver={(e) => allowDrop(e)}
					>
						Drop your product here
					</div>
				</div>
			</header>
			<content className="App-Content">
				<table className="table-style">
					<tbody>
						{articles && articles.length > 0 ? (
							<ArticleList
								articles={filteredArticles}
								deleteArticle={deleteItem}
								editItem={editItem}
							/>
						) : (
							"Loading"
						)}
					</tbody>
				</table>
			</content>
		</div>
	);
}

export default App;
