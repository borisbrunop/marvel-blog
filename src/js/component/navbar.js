import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../img/Marvel_logo_red.png";
import StarIcon from "@material-ui/icons/Star";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { Context } from "../store/appContext";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Cookies from "universal-cookie";

const useStyles = makeStyles(theme => ({
	typographyPopover: {
		padding: "10px"
	},
	popover: {
		display: "flex",
		justifyContent: "flex-end",
		margin: "20px",
		marginRight: "-8px"
	},
	popoverButton: {
		border: "none",
		color: "#ea2323"
	},
	notfavDiv: {
		width: "100px",
		height: "40px"
	},
	favDiv: {
		width: "100px"
	},
	nameFav: {
		margin: "10px",
		cursor: "pointer"
	},
	delete: {
		color: "#ea2323"
	}
}));

export const Navbar = () => {
	const classes = useStyles();
	const { store, actions } = useContext(Context);
	const [anchorPopover, setAnchorPopover] = useState(null);
	const open = Boolean(anchorPopover);
	const id = open ? "simple-popover" : undefined;
	const cookies = new Cookies();
	const favs = cookies.get("favs");
	const history = useHistory();

	return (
		<nav className="navbar navbar-light bg-light">
			<Link to="/">
				<img src={logo} />
			</Link>
			<div className={classes.popover}>
				<Button
					className={classes.popoverButton}
					aria-describedby={id}
					variant="outlined"
					color="primary"
					onClick={e => setAnchorPopover(e.currentTarget)}>
					<StarIcon />
				</Button>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorPopover}
					onClose={e => setAnchorPopover(null)}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "left"
					}}>
					{favs ? (
						favs.map((name, id) => (
							<div key={id} className="favs">
								<p onClick={e => history.push(`/details/${name}`)} className={classes.nameFav}>
									{name}
								</p>
								<IconButton
									onClick={e => actions.deleteFavCharacter(id)}
									className={classes.delete}
									aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</div>
						))
					) : (
						<div className="notFavs" />
					)}
				</Popover>
			</div>
		</nav>
	);
};
