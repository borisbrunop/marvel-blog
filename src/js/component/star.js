import React, { useContext } from "react";
import { Context } from "../store/appContext";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	favButton: {
		marginLeft: "auto",
		marginBottom: "240px",
		color: "#ededed"
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
	let repeated = favsCookies.find(Name => Name == characterName.characterName);
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
