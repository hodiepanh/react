import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box: {
		zIndex: theme.zIndex.drawer + 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		top: 0,
		width: "100vw",
		height: "100vh",
		backgroundColor: "rgb(0,0,0,0.25)",
		position: "fixed",
	},
}));

function Loading() {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.box}>
				<CircularProgress />
			</div>
		</div>
	);
}

export default Loading;
