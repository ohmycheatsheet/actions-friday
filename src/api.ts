import * as github from '@actions/github'

export const readRepoInfo = async (owner: string, repo: string) => {
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN!)
  return octokit.rest.repos.get({
    owner,
    repo,
  })
}
