import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box: {
		zIndex: theme.zIndex.drawer + 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		backgroundColor: "rgb(0,0,0,0.25)",
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
