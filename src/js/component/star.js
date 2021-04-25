import React, { useContext } from "react";
import { Context } from "../store/appContext";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";

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
	favButton: {
		marginLeft: "auto",
		marginBottom: "auto",
		color: "#ededed"
		// [theme.breakpoints.down(custome.breakpoints.values.lg)]: {
		// 	marginBottom: "95px"
		// }
	},
	favButtonDetails: {
		color: "#ea2323"
	}
}));

export default function Star(characterName) {
	const { name } = useParams();
	const classes = useStyles();
	const { store, actions } = useContext(Context);
	const cookies = new Cookies();
	const favsCookies = cookies.get("favs");
	let repeated = store.favs.find(Name => Name == characterName.characterName);
	if (repeated) {
		const id = favsCookies.findIndex(Name => Name === characterName.characterName);
		return (
			<>
				<IconButton
					className={name ? classes.favButtonDetails : classes.favButton}
					onClick={e => actions.deleteFavCharacter(id)}
					aria-label="delete"
					color="secondary">
					<StarIcon />
				</IconButton>
			</>
		);
	} else {
		return (
			<>
				<IconButton
					className={name ? classes.favButtonDetails : classes.favButton}
					onClick={e => actions.favCharacter(characterName.characterName)}
					aria-label="delete"
					color="secondary">
					<StarOutlineIcon />
				</IconButton>
			</>
		);
	}
}

Star.propTypes = {
	characterName: PropTypes.string
};
