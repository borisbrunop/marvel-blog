import Axios from "axios";
import Cookies from "universal-cookie";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			prueba: "",
			favs: "",
			search: "",
			loadingSearch: false,
			loadingComics: false,
			details: "",
			comics: "",
			comicDetails: "",
			errorCharacter: ""
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				const store = getStore();
				let md5 = require("md5");
				let ts = new Date().getTime();
				let privKey = process.env.MARVEL_PRIVATE_KEY;
				let publicKey = "56073926faf85360cfaddcda6c15057f";
				let hash = md5(ts + privKey + publicKey);
				setStore({
					prueba: "",
					loadingSearch: false,
					comics: "",
					details: "",
					comicDetails: ""
				});
				if (store.search != "") {
					Axios.get("https://gateway.marvel.com/v1/public/characters", {
						params: {
							apikey: publicKey,
							ts,
							hash,
							limit: "20",
							nameStartsWith: store.search
						}
					})
						.then(function(response) {
							const store = getStore();
							for (let character of response.data.data.results) {
								let arrayCharacters = character.thumbnail.path.split("/");
								const found = arrayCharacters.find(el => el === "image_not_available");
								if (!found) {
									let oneCharacter = {
										path:
											character.thumbnail.path +
											"/portrait_uncanny." +
											character.thumbnail.extension,
										name: character.name,
										id: character.id
									};
									setStore({
										prueba: [...store.prueba, oneCharacter]
									});
								}
							}
							setStore({
								loadingSearch: true
							});
						})
						.catch(function(error) {
							console.log(error);
						});
				} else {
					Axios.get("https://gateway.marvel.com/v1/public/characters", {
						params: {
							apikey: publicKey,
							ts,
							hash,
							limit: "20"
						}
					})
						.then(function(response) {
							const store = getStore();
							for (let character of response.data.data.results) {
								let arrayCharacters = character.thumbnail.path.split("/");
								const found = arrayCharacters.find(el => el === "image_not_available");
								if (!found) {
									let oneCharacter = {
										path:
											character.thumbnail.path +
											"/portrait_uncanny." +
											character.thumbnail.extension,
										name: character.name,
										id: character.id
									};
									setStore({
										prueba: [...store.prueba, oneCharacter]
									});
								}
							}
							setStore({
								loadingSearch: true
							});
						})
						.catch(function(error) {
							console.log(error);
						});
				}
			},
			detailsModule: name => {
				let md5 = require("md5");
				const store = getStore();
				const actions = getActions();
				let ts = new Date().getTime();
				let privKey = process.env.MARVEL_PRIVATE_KEY;
				let publicKey = "56073926faf85360cfaddcda6c15057f";
				let hash = md5(ts + privKey + publicKey);
				setStore({
					details: "",
					comicDetails: "",
					prueba: "",
					errorCharacter: ""
				});
				Axios.get("https://gateway.marvel.com/v1/public/characters", {
					params: {
						apikey: publicKey,
						ts,
						hash,
						name
					}
				})
					.then(function(response) {
						let det = response.data.data.results[0];
						if (!det) {
							setStore({
								errorCharacter: "Character not found"
							});
						}
						let oneCharacter = {
							imgUrl: det.thumbnail.path + "/standard_fantastic." + det.thumbnail.extension,
							name: det.name,
							id: det.id
						};
						setStore({
							details: oneCharacter
						});
						actions.loadComics(det.comics.items);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			loadComics: async comicsUrls => {
				let md5 = require("md5");
				const store = getStore();
				let ts = new Date().getTime();
				let privKey = process.env.MARVEL_PRIVATE_KEY;
				let publicKey = "56073926faf85360cfaddcda6c15057f";
				let hash = md5(ts + privKey + publicKey);
				setStore({
					comics: "",
					loadComics: false,
					errorComic: ""
				});
				for await (let comic of comicsUrls) {
					Axios.get(comic.resourceURI, {
						params: {
							apikey: publicKey,
							ts,
							hash
						}
					})
						.then(function(response) {
							let det = response.data.data.results[0];
							let arrayComics = det.thumbnail.path.split("/");
							const found = arrayComics.find(el => el === "image_not_available");
							if (!found) {
								let oneCharacter = {
									imgUrl1: det.thumbnail.path + "/portrait_fantastic." + det.thumbnail.extension,
									name: det.title,
									id: det.id
								};
								setStore({
									comics: [...store.comics, oneCharacter]
								});
							}
						})
						.catch(function(error) {
							console.log(error);
						});
				}
				setStore({
					loadingComics: true
				});
			},
			comicDetails: id => {
				let md5 = require("md5");
				const store = getStore();
				let ts = new Date().getTime();
				let privKey = process.env.MARVEL_PRIVATE_KEY;
				let publicKey = "56073926faf85360cfaddcda6c15057f";
				let hash = md5(ts + privKey + publicKey);
				setStore({
					comics: "",
					loadComics: false
				});
				Axios.get("https://gateway.marvel.com/v1/public/comics/" + id, {
					params: {
						apikey: publicKey,
						ts,
						hash
					}
				})
					.then(function(response) {
						let det = response.data.data.results[0];
						let dateOnSale = "";
						det.dates.map(date => {
							if (date.type === "onsaleDate") {
								let prueba = new Date(date.date);
								var months = [
									"January",
									"February",
									"March",
									"April",
									"May",
									"June",
									"July",
									"August",
									"September",
									"October",
									"November",
									"December"
								];
								let year = prueba.getFullYear();
								let month = prueba.getMonth();
								let day = prueba.getDate();
								dateOnSale = `${months[month]} ${day} ${year}`;
							}
						});
						let oneCharacter = {
							imgUrl1: det.thumbnail.path + "/portrait_uncanny." + det.thumbnail.extension,
							name: det.title,
							characters: det.characters.items,
							dates: dateOnSale,
							price: det.prices,
							urls: det.urls
						};
						setStore({
							comicDetails: oneCharacter
						});
					})
					.catch(function(error) {
						// console.log(error.response.status);
						if (error.response.status === 404) {
							setStore({
								errorComic: "Comic not found"
							});
						}
					});
			},
			changeSearch: value => {
				setStore({
					search: value
				});
			},
			loadFavs: () => {
				const cookies = new Cookies();
				const favsCookies = cookies.get("favs");
				setStore({
					favs: [...favsCookies]
				});
			},
			favCharacter: character => {
				const cookies = new Cookies();
				const store = getStore();
				const favsCookies = cookies.get("favs");
				let repeated = favsCookies.find(Name => Name == character);
				if (repeated === undefined) {
					cookies.set("favs", [...favsCookies, character]);
					setStore({
						favs: [...favsCookies, character]
					});
				} else {
					console.log("esta reperito");
					alert(`${character} is already in favs list`);
				}
			},
			deleteFavCharacter: id => {
				const cookies = new Cookies();
				const favsCookies = cookies.get("favs");
				const store = getStore();
				let finishFavsCookies = favsCookies.filter((fav, i) => i != id);
				setStore({
					favs: [...finishFavsCookies]
				});
				cookies.set("favs", [...finishFavsCookies]);
			}
		}
	};
};

export default getState;
