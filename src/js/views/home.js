import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import Star from "../component/star";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import RefreshIcon from "@material-ui/icons/Refresh";
import BackspaceIcon from "@material-ui/icons/Backspace";

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
	mediaSearch: {
		height: "350px",
		width: "100%",
		flexDirection: "column",
		display: "flex",
		[theme.breakpoints.down(custome.breakpoints.values.lg)]: {
			height: "230px"
		},
		[theme.breakpoints.down(custome.breakpoints.values.tablet)]: {
			height: "190px"
		}
	},
	container: {
		height: "100%",
		padding: "0px",
		marginInline: "auto"
	},
	name: {
		margin: "0px",
		backgroundImage: "linear-gradient(transparent, black)",
		fontSize: "15px",
		height: "63px",
		width: "100%",
		paddingLeft: "10px",
		alignItems: "flex-end",
		paddingBottom: "5px",
		display: "flex",
		color: "#ededed",
		cursor: "pointer"
	},
	margin: {
		margin: theme.spacing(1)
	},
	textField: {
		width: "100%",
		border: "1px solid #ea2323",
		borderRadius: "5px"
	},
	refresh: {
		color: "#ea2323"
	},
	progress: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	SearchIcon: {
		color: "#ea2323",
		cursor: "pointer"
	},
	snackbar: {
		background: "#ea2323"
	}
}));

export const Home = () => {
	const { store, actions } = useContext(Context);
	const classes = useStyles();
	const history = useHistory();
	// const [open, setOpen] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		actions.handleCokkiesAlert(false);
	};

	const handleOpen = () => {
		if (store.cookiesAlert === null) {
			actions.handleCokkiesAlert(true);
		}
	};

	useEffect(() => {
		actions.loadFavs();
		handleOpen();
		actions.loadSomeData();
	}, []);

	useEffect(() => {}, []);

	const handleRefresh = async () => {
		await actions.changeSearch("");
	};

	const handleSearch = event => {
		if (event.keyCode === 13) {
			return actions.loadSomeData();
		}
	};

	const handleSearchButton = () => {
		if (store.search != "") {
			return actions.loadSomeData();
		}
	};

	return (
		<>
			<div className="mx-md-5 my-5 mx-2 d-flex">
				<IconButton className={classes.SearchIcon} onClick={handleSearchButton} aria-label="search">
					<SearchIcon />
				</IconButton>
				<TextField
					value={store.search}
					onChange={e => actions.changeSearch(e.target.value)}
					onKeyDown={e => handleSearch(e)}
					id="outlined-start-adornment"
					className={clsx(classes.margin, classes.textField)}
					variant="outlined"
				/>
				<IconButton className={classes.refresh} onClick={e => handleRefresh()} aria-label="refesh">
					<BackspaceIcon />
				</IconButton>
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left"
				}}
				open={store.cookiesAlert}
				autoHideDuration={7000}
				onClose={handleClose}
				className={classes.snackbar}
				message="This site is currently using Cookies"
				action={
					<>
						<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</>
				}
			/>
			{store.loadingSearch ? (
				<>
					{store.prueba ? (
						<div className={classes.container + " container-fluid d-flex justify-content-center row"}>
							{store.prueba &&
								store.prueba.map((character, id) => (
									<div key={id} className=" m-auto col-6 p-0 col-sm-6 col-md-4 col-lg-3 col-xl-2">
										<Card className={classes.root + " m-2 m-xl-1"}>
											<CardMedia
												className={classes.mediaSearch}
												image={character.path}
												title={character.name}>
												<Star characterName={character.name} />
												<Typography
													onClick={e => history.push(`/details/${character.name}`)}
													className={classes.name + " pt-0 pt-lg-1 pt-xl-2"}
													gutterBottom
													variant="h5"
													component="h5">
													{character.name}
												</Typography>
											</CardMedia>
										</Card>
									</div>
								))}
						</div>
					) : (
						<div className={classes.progress}>
							<h3>Not Found</h3>
						</div>
					)}
				</>
			) : (
				<div className={classes.progress}>
					<CircularProgress />
				</div>
			)}
		</>
	);
};
