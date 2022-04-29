import React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box: {
		zIndex: theme.zIndex.drawer + 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "50vh",
	},
}));

function Loading() {
	const classes = useStyles();
	return (
		<div>
			<Box className={classes.box}>
				<CircularProgress />
			</Box>
		</div>
	);
}

export default Loading;
