import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import ShareIcon from "@material-ui/icons/Share";
/**
 * component for repository item in the repository list
 */
const useStyles = makeStyles(theme => ({
  root: {},
  cardContent: {
    height: 60,
    overflow: "hidden"
  },
  title: {
    fontSize: 20
  }
}));

export default function RepoCard(props) {
  const classes = useStyles();
  const repo = props.value;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="owner" alt={repo.login} src={repo.avatar_url} />
        }
        title={<Typography className={classes.title}>{repo.name}</Typography>}
        subheader={repo.created_at}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="body2" color="textSecondary">
          {repo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Chip icon={<StarIcon />} label={repo.stargazers_count} />
        <Chip icon={<ShareIcon />} label={repo.forks_count} />
      </CardActions>
    </Card>
  );
}
