const core = require("@actions/core");
const github = require("@actions/github");

function main() {
    try {
        const reviewers = core.getInput("reviewers");
        const reviewerList = reviewers.split("|");
        const token = process.env["GITHUB_TOKEN"];
        const octokit = new github.getOctokit(token);
        const context = github.context;
        const prNumber = context.payload.pull_request.number;

        const params = {
            ...context.repo,
            pull_number: prNumber,
            team_reviewers: reviewerList,
        };
        
        octokit.rest.pulls.requestReviewers(params);
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();