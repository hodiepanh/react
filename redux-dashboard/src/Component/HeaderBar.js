import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	toolbar: {
		backgroundColor: "beige",
	},
	title: {
		flexGrow: 1,
		marginLeft: 25,
		color: "black",
	},
}));

function HeaderBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static" elevation={0}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" className={classes.title}>
						React with Redux
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default HeaderBar;
