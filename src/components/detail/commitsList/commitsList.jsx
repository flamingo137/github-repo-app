import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { getCommits } from "../../../services/httpService";
import { getCommitsApiEndpoint } from "../../../config";

/**
 * component for commit list
 */
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: 20,
    backgroundColor: theme.palette.background.paper
  },
  header: {
    display: "flex"
  },
  title: {
    marginLeft: 20,
    ...theme.typography.body2,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
  },
  inline: {
    display: "inline"
  }
}));

export default function CommitsList({ match, history }) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCommits(
        getCommitsApiEndpoint(`${match.params.org}/${match.params.name}`)
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className={classes.header}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/list")}
        >
          Back
        </Button>
        <div className={classes.title}>
          {`Recent 30 commits for project  ${match.params.name}`}
        </div>
      </div>
      <List className={classes.root}>
        {data.map(item => {
          return (
            <ListItem key={item.sha} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={item.avatar_url} />
              </ListItemAvatar>
              <ListItemText
                primary={item.message}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.name}
                    </Typography>
                    {`    committed on:  ${item.date}`}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
