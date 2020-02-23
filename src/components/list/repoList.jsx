import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import RepoCard from "../card/repoCard";
import Grid from "@material-ui/core/Grid";
import { getRepos } from "../../services/httpService";
import { getReposApiEndpoint } from "../../config";
import DataContext from "../../context/dataContext";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
/**
 * component for repository item in the repository list
 */
const useStyles = makeStyles(theme => ({
  searchForm: {
    display: "flex",
    alignItems: "center",
    width: "75%",
    margin: "auto"
  },
  inputSearch: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  loadProgress: {
    display: "flex",
    alignItems: "center",
    margin: "auto"
  },
  title: {
    ...theme.typography.body2,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
  },
  gridContainer: {
    marginTop: 20
  },
  gridItem: {
    textDecoration: "none"
  }
}));

export default function RepoList() {
  const classes = useStyles();
  const dataContext = useContext(DataContext);
  const orgName = dataContext.currentOrg || "";
  const [data, setData] = useState(dataContext.currentData);
  const [query, setQuery] = useState(orgName);
  const [url, setUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (url) {
        setIsError(false);
        setIsLoading(true);

        try {
          const result = await getRepos(url);
          setData(result.data);
          dataContext.onUpdateData({ orgName: query, orgData: result.data });
        } catch (error) {
          setData([]);
          setIsError(true);
        }

        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return (
    <div>
      <Paper
        component="form"
        className={classes.searchForm}
        onSubmit={event => {
          setUrl(getReposApiEndpoint(query));
          event.preventDefault();
        }}
      >
        <InputBase
          className={classes.inputSearch}
          placeholder="Enter Organization"
          inputProps={{ "aria-label": "enter organization" }}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <IconButton
          type="submit"
          className={classes.iconSearchButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {isError && <div>No such organization ...</div>}
      {isLoading ? (
        <div className={classes.loadProgress}>
          <CircularProgress />
          Loading ...
        </div>
      ) : (
        <Grid container className={classes.gridContainer} spacing={2}>
          {data.length > 1 && (
            <Grid item xs={12}>
              <div className={classes.title}>
                {`${data.length}   repositories found for  ${query}`}
              </div>
            </Grid>
          )}
          {data.map(repo => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                className={classes.gridItem}
                key={repo.id}
                component={Link}
                to={`/detail/${query}/${repo.name}`}
              >
                <RepoCard key={repo.id} value={repo} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}
