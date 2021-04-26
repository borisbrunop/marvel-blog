import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme } from "@material-ui/core/styles";
import Star from "../component/star";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";

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
		height: "255px",
		width: "100%",
		flexDirection: "column",
		display: "flex",
		[theme.breakpoints.up(custome.breakpoints.values.tablet)]: {
			height: "425px"
		}
	},
	container: {
		height: "100%",
		padding: "0px",
		marginInline: "auto"
	},
	nameDiv: {
		width: "100%",
		display: "flex",
		justifyContent: "center"
	},
	name: {
		marginBottom: "0px",
		marginTop: "auto",
		backgroundImage: "linear-gradient(transparent, black)",
		fontSize: "15px",
		height: "63px",
		width: "100%",
		paddingLeft: "10px",
		alignItems: "flex-end",
		display: "flex",
		color: "#ededed"
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
	progress: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	cardDiv: {
		height: "150px",
		[theme.breakpoints.up(custome.breakpoints.values.md)]: {
			height: "280px"
		},
		[theme.breakpoints.up(custome.breakpoints.values.lg)]: {
			height: "250px"
		},
		[theme.breakpoints.up(custome.breakpoints.values.xl)]: {
			height: "220px"
		}
	},
	titleComics: {
		textAlign: "center"
	}
}));

export default function Details() {
	const { store, actions } = useContext(Context);
	const { name } = useParams();
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		actions.loadFavs();
		actions.detailsModule(name);
	}, []);

	return (
		<>
			{store.errorCharacter ? (
				<div>
					<h1>{store.errorCharacter}</h1>
				</div>
			) : (
				<div className="h-100">
					{store.loadingComics ? (
						<>
							<div className="d-flex align-items-center">
								<p className="ml-3 mb-0">Add to favorites:</p>
								<Star characterName={store.details.name} />
							</div>
							<div className={classes.nameDiv}>
								<h1 className="m-3">{store.details.name}</h1>
							</div>
							<div className={classes.imgDiv}>
								<img className={classes.img} src={store.details.imgUrl} />
							</div>
							<h1 className={"m-3 " + classes.titleComics}>Comics</h1>
							{store.comics ? (
								<div
									className={
										classes.container + " container-fluid d-flex justify-content-center row"
									}>
									{store.comics &&
										store.comics.map((comic, id) => (
											<div key={id} className=" col-6 p-0 col-sm-4 col-md-3  col-lg-2">
												<Card className={classes.root + " m-2 m-xl-1"}>
													<CardActionArea
														onClick={e => history.push(`/details/comic/${comic.id}`)}>
														<CardMedia
															className={classes.media}
															image={comic.imgUrl1}
															title={comic.name}>
															<Typography
																className={classes.name + " pb-1 pt-0 pt-lg-1 pt-xl-2"}
																gutterBottom
																variant="h5"
																component="h5">
																{comic.name}
															</Typography>
														</CardMedia>
													</CardActionArea>
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
				</div>
			)}
		</>
	);
}
