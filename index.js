const core = require("@actions/core");
const github = require("@actions/github");

function main() {
    try {
        const token = process.env["token"];
        const PAT = process.env["PAT"];
        
        const reviewers = core.getInput("reviewers");
        const reviewer_teams = core.getInput("reviewer-teams");
        const reviewerList = reviewers.split("|");
        const teamList = reviewer_teams.split("|");
        
        const octokit = new github.getOctokit(PAT == "" ? token : PAT); //prefer PAT

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