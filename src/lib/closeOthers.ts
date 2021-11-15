import * as github from '@actions/github'
import { octokit } from '../api'

const WHITE_LIST = ['ohmycheatsheet']

export const closeOthers = async () => {
  const { owner, repo } = github.context.repo
  const issueCreator = github.context.payload.issue?.user?.login
  if (![issueCreator].concat(WHITE_LIST).includes(owner)) {
    console.log(`${issueCreator} is not repo owner, will close this issue`)
    await octokit.rest.issues.update({ state: "closed", issue_number: github.context.payload.issue?.number!, owner, repo })
  }
}
