This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

- prerequisite to intstall NodeJS [install NodeJS](https://nodejs.org/en/).
- Extract github-repo-app.zip
- Navigate to the folder
- Run “npm install”
- GitHub API has quota for 60 calls each day without provide clientID/clientSecreate, please update the your id/secret in .env file under root folder.
  If you don't have client id, it will also work for first 60 calls of the day.
- Run “npm start”

## Testing Secnarios

- Enter organization name, eg: Netflix and press Enter to trigger the search. The result is sorted by star count now.
- In the result list, click any tile to see the most recent 30 commits for this repository.
- Click back button to go back to previous search result
- If enter an organization that doesn't exist, it should return "No search organization"

## How I designed the project

- The app shoud support basic search-result-detail UI pattern.
- Basic functionality to search for an organization's repositories, drill dwon to detail of the selected repository and can go back to previous result list.
- UI should be responsive and usable.
- Should support matrics "most starred" and "most forks" as trending repositaries within an organization.
- GitHub API has 60 calls quota everyday for tenant without clientId/Secret, should support clientId/Secret in .env.
- Current GitHub API by defaul returns 30 result in one request and it doesn't provide a parameter to order by star count or fork count. So I send request for all repositories by sending multiple requests based on page count. Then I sort the result based on star count.

## libraries I used

material ui, axios

## Next Step and to do...

- Search box input fires onChange that makes second search not smooth, should wrap it with keyEnter event.
- Improve error handling, currently it only show "Organization doesn't exist" when organzation name is wrong. It should show different message based on different error return from GitHub API.
- Unit test
- support multiple metrics like most fork count, or combine most fork count+star count, or most activities.
- Add paginator for get repository list
- Add paginator to get more commits for select repository
- improve UX
