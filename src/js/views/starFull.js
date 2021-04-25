import React, { useContext } from "react";
import { Context } from "../store/appContext";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

export default function StarFull(index) {
	const { store, actions } = useContext(Context);
	console.log(characterName);
	return (
		<>
			<IconButton
				key={index}
				onClick={e => actions.deleteFavCharacter(index)}
				aria-label="delete"
				color="secondary">
				<StarIcon />
			</IconButton>
			{/* <IconButton
				// key={index}
				onClick={e => actions.favCharacter(characterName)}
				aria-label="delete"
				color="secondary">
				<StarOutlineIcon />
			</IconButton> */}
		</>
	);
}

StarFull.propTypes = {
	index: PropTypes.number
};
