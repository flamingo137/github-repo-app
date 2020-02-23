const apiBaseUrl = "https://api.github.com";
const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export function getReposApiEndpoint(orgName) {
  return clientId && clientSecret
    ? `${apiBaseUrl}/orgs/${orgName}/repos?per_page=100&client_id=${clientId}&client_secret=${clientSecret}`
    : `${apiBaseUrl}/orgs/${orgName}/repos?per_page=100`;
}

export function getCommitsApiEndpoint(name) {
  return clientId && clientSecret
    ? `${apiBaseUrl}/repos/${name}/commits&client_id=${clientId}&client_secret=${clientSecret}`
    : `${apiBaseUrl}/repos/${name}/commits`;
}
