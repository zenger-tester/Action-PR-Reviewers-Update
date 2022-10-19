const core = require("@actions/core");
const github = require("@actions/github");

function main() {
    try {
        const token = process.env["token"];
        console.log(token);
        const PAT = process.env["PAT"];
        console.log(PAT);
        
        const reviewers = core.getInput("reviewers");
        console.log(reviewers);
        const reviewer_teams = core.getInput("reviewer-teams");
        console.log(reviewer_teams);
        const reviewerList = reviewers.split("|");
        const teamList = reviewer_teams.split("|");
        
        const addsTeams = teamList.length > 0;
        const octokit = new github.getOctokit(addsTeams ? PAT : token);

        const context = github.context;
        const prNumber = context.payload.pull_request.number;

        const params = {
            ...context.repo,
            pull_number: prNumber,
            reviewers: reviewerList,
            team_reviewers: teamList,
        };
        
        octokit.rest.pulls.requestReviewers(params);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();