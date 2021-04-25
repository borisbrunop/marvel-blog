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
		height: "41px"
	},
	favDiv: {
		width: "385px",
		display: "flex",
		justifyContent: "space-between",
		[theme.breakpoints.down(custome.breakpoints.values.tablet)]: {
			width: "290px"
		}
	},
	nameFav: {
		margin: "10px",
		cursor: "pointer"
	},
	delete: {
		color: "#ea2323"
	},
	logo: {
		width: "100px"
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
				<img className={classes.logo} src="https://cdn.iconscout.com/icon/free/png-256/marvel-282124.png" />
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
					{store.favsExists ? (
						favs.map((name, id) => (
							<div key={id} className={classes.favDiv}>
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
						<div className="notFavs">
							<p className="mb-0">dont have any favorites characters</p>
						</div>
					)}
				</Popover>
			</div>
		</nav>
	);
};
