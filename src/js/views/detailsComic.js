import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const custome = createMuiTheme({
	breakpoints: {
		values: {
			smCellphone: 0,
			lgCellphone: 375,
			tablet: 575,
			md: 768,
			lg: 992,
			pc: 800,
			lgPc: 1100,
			xl: 1200,
			xlPc: 1920
		}
	}
});

const useStyles = makeStyles(theme => ({
	nameDiv: {
		width: "100%",
		display: "flex",
		justifyContent: "center"
	},
	imgDiv: {
		width: "100%",
		overflow: "hidden",
		display: "flex",
		justifyContent: "center"
	},
	img: {
		width: "300px",
		height: "450px",
		margin: "30px",
		marginTop: "0px !important"
	},
	infoComic: {
		width: "100%",
		display: "flex",
		flexDirection: "column"
	},
	characterP: {
		cursor: "pointer",
		width: "100%",
		textAlign: "center",
		[theme.breakpoints.up(custome.breakpoints.values.tablet)]: {
			textAlign: "inherit",
			marginLeft: "3rem !important"
		}
	},
	moreInfoDiv: {
		display: "flex",
		justifyContent: "center"
	},
	divider: {}
}));

export default function DetailsComic() {
	const { store, actions } = useContext(Context);
	const { id } = useParams();
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		actions.loadFavs();
		actions.comicDetails(id);
	}, []);
	return (
		<>
			{store.errorComic ? (
				<div>
					<h1>{store.errorComic}</h1>
				</div>
			) : (
				<div>
					<div className={classes.nameDiv}>
						<h1 className="m-5">{store.comicDetails.name}</h1>
					</div>
					<div className={classes.imgDiv}>
						<img className={classes.img} src={store.comicDetails.imgUrl1} />
					</div>
					<div className={classes.infoComic}>
						<div className="d-flex align-items-center mb-2 mt-4">
							<h4 className="mx-4">Date of sale:</h4>
							<p className="mb-2">{store.comicDetails.dates}</p>
						</div>
						<h4 className="ml-4 my-4">Characters:</h4>
						{store.comicDetails &&
							store.comicDetails.characters.map((character, id) => (
								<p
									className={classes.characterP}
									onClick={e => history.push(`/details/${character.name}`)}
									key={id}>
									{character.name}
								</p>
							))}
						<h4 className="ml-4 my-4">Prices:</h4>
						{store.comicDetails &&
							store.comicDetails.price.map((value, id) => {
								let priceType = "";
								if (value.type === "printPrice") {
									priceType = "Print price";
								}
								if (value.type === "digitalPurchasePrice") {
									priceType = "Digital purchase price";
								}
								return <p className="ml-5 mb-4" key={id}>{`${priceType}: ${value.price}$`}</p>;
							})}
						<Divider className={classes.divider} />
						<div className={classes.moreInfoDiv}>
							{store.comicDetails &&
								store.comicDetails.urls.map((value, id) => {
									if (value.type === "detail") {
										return (
											<Button
												onClick={e => window.open(value.url)}
												key={id}
												className="mx-4 my-3"
												color="secondary">
												Details on marvel
											</Button>
										);
									}
									if (value.type === "inAppLink") {
										return (
											<Button
												onClick={e => window.open(value.url)}
												key={id}
												className="mx-4 my-3"
												color="secondary">
												App link
											</Button>
										);
									}
									return "";
								})}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
