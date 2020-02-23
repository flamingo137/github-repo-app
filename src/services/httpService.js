import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

/**
 * API to get commits for specific repo, return most recent 30 commits
 */
export async function getCommits(url) {
  const result = await axios.get(url);
  //flat and only return data needed
  const sortedData = result.data.map(item => {
    return {
      sha: item.sha,
      message: item.commit ? item.commit.message || "" : "",
      name: item.commit
        ? item.commit.author
          ? item.commit.author.name || ""
          : ""
        : "",
      avatar_url: item.author ? item.author.avatar_url || "" : "",
      date: item.commit
        ? item.commit.author
          ? item.commit.author.date || ""
          : ""
        : ""
    };
  });

  return { data: sortedData };
}

/**
 * API to get all repositories, first request check if results have more than 1 page, if so asyn call to get repository for all pages.
 */
export async function getRepos(url) {
  let sortedData;
  try {
    const result = await axios.get(url);
    const link = result.headers.link;
    if (link) {
      const numOfPages = parseInt(
        link
          .split(",")[1]
          .split(">")[0]
          .split("&page=")[1]
      );
      const allRepos = [];

      for (let i = 1; i < numOfPages + 1; i++) {
        allRepos.push(`${url}&page=${i}`);
      }
      sortedData = await getAllRepos(allRepos);
    } else {
      sortedData = result.data.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
    }
  } catch (error) {
    throw error;
  }

  //flat and only return data needed
  sortedData = sortedData.map(item => {
    return {
      id: item.id,
      name: item.name,
      created_at: item.created_at,
      login: item.owner ? item.owner.login || "" : "",
      avatar_url: item.owner ? item.owner.avatar_url || "" : "",
      description: item.description,
      stargazers_count: item.stargazers_count,
      forks_count: item.forks_count
    };
  });

  return { data: sortedData };
}
/**
 * async call to get repository list for all pages, sort based on star count for each page, then merge sort for all pages.
 */
async function getAllRepos(list) {
  const promises = list.map(function(item) {
    return axios.get(item).then(res => {
      const sortedData = res.data.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      return sortedData;
    });
  });

  let repo = await Promise.all(promises);
  repo = [].concat.apply([], repo);
  let sortedData = repo.sort((a, b) => b.stargazers_count - a.stargazers_count);
  return sortedData;
}
