import * as github from '@actions/github'

export const octokit = github.getOctokit(process.env.GITHUB_TOKEN!)

export const readRepoInfo = async (owner: string, repo: string) => {
  return octokit.rest.repos.get({
    owner,
    repo,
  })
}
