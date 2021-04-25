import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme } from "@material-ui/core/styles";
import Star from "./star";

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
	media: {
		height: "350px",
		width: "100%",
		display: "flex",
		alignItems: "flex-end"
	},
	container: {
		height: "100%",
		overflowY: "scroll",
		padding: "0px",
		marginInline: "auto"
	},
	nameDiv: {
		width: "100%",
		display: "flex",
		justifyContent: "center"
	},
	name: {
		margin: "0px",
		backgroundImage: "linear-gradient(transparent, black)",
		fontSize: "15px",
		height: "63px",
		width: "100%",
		paddingLeft: "10px",
		alignItems: "center",
		display: "flex",
		color: "#ededed",
		cursor: "pointer"
	},
	imgDiv: {
		width: "100%",
		height: "400px",
		overflow: "hidden"
	},
	img: {
		width: "100%",
		position: "relative",
		[theme.breakpoints.up(custome.breakpoints.values.pc)]: {
			top: "-50%"
		},
		[theme.breakpoints.up(custome.breakpoints.values.lgPc)]: {
			top: "-100%"
		}
	},
	margin: {
		margin: theme.spacing(1)
	},
	textField: {
		width: "100%"
	},
	favButton: {
		marginLeft: "auto",
		marginBottom: "240px",
		color: "#ededed"
	},
	progress: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	cardDiv: {
		display: "inline-grid",
		alignItems: "center",
		height: "335px",
		[theme.breakpoints.up(custome.breakpoints.values.tablet)]: {
			height: "310px"
		},
		[theme.breakpoints.up(custome.breakpoints.values.md)]: {
			height: "280px"
		},
		[theme.breakpoints.up(custome.breakpoints.values.lg)]: {
			height: "250px"
		},
		[theme.breakpoints.up(custome.breakpoints.values.xl)]: {
			height: "220px"
		}
	}
}));

export default function Details() {
	const { store, actions } = useContext(Context);
	const { name } = useParams();
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		actions.detailsModule(name);
	}, []);

	return (
		<>
			{store.errorCharacter ? (
				<div>
					<h1>{store.errorCharacter}</h1>
				</div>
			) : (
				<div>
					<div className="d-flex align-items-center">
						<p className="mx-3 mb-0">Add to favorites:</p>
						<Star characterName={store.details.name} />
					</div>
					<div className={classes.nameDiv}>
						<h1 className="m-3">{store.details.name}</h1>
					</div>
					<div className={classes.imgDiv}>
						<img className={classes.img} src={store.details.imgUrl} />
					</div>
					<h1 className="m-3">Comics</h1>
					<>
						{store.loadingComics ? (
							<>
								{store.comics ? (
									<div
										className={
											classes.container + " container-fluid d-flex justify-content-center row"
										}>
										{store.comics &&
											store.comics.map((comic, id) => (
												<div
													key={id}
													className={
														classes.cardDiv +
														" col-12 p-0 col-sm-6 col-md-4 col-lg-3 col-xl-2"
													}>
													<Card className={classes.root + " m-2 m-xl-1"}>
														<CardMedia
															className={classes.media}
															image={comic.imgUrl1}
															title={comic.name}>
															<Typography
																onClick={e =>
																	history.push(`/details/comic/${comic.id}`)
																}
																className={classes.name + " pt-0 pt-lg-1 pt-xl-2"}
																gutterBottom
																variant="h5"
																component="h5">
																{comic.name}
															</Typography>
														</CardMedia>
													</Card>
												</div>
											))}
									</div>
								) : (
									<div className={classes.progress}>
										<CircularProgress />
									</div>
								)}
							</>
						) : (
							<div className={classes.progress}>
								<CircularProgress />
							</div>
						)}
					</>
				</div>
			)}
		</>
	);
}
