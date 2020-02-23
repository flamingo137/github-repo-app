import React, { useState } from "react";
import dotenv from "dotenv";
import { Route, Redirect, Switch } from "react-router-dom";
import DataContext from "./context/dataContext";
import RepoList from "./components/list/repoList";
import CommitsList from "./components/detail/commitsList/commitsList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    padding: 20
  }
}));

function App() {
  const classes = useStyles();
  const handleUpdateData = result => {
    setData({ orgName: result.orgName, orgData: result.orgData || [] });
  };

  const [data, setData] = useState({ orgName: "", orgData: [] });

  return (
    <DataContext.Provider
      value={{
        currentOrg: data.orgName,
        currentData: data.orgData,
        onUpdateData: handleUpdateData
      }}
    >
      <div>
        <main className={classes.container}>
          <Switch>
            <Route path="/detail/:org/:name" component={CommitsList} />
            <Route path="/list" component={RepoList} />
            <Redirect from="/" to="/list" />
          </Switch>
        </main>
      </div>
    </DataContext.Provider>
  );
}

export default App;
