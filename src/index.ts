import * as core from '@actions/core'
import * as github from '@actions/github'

import lib from './lib'

async function run() {
  try {
    const eventName = github.context.eventName
    switch (eventName) {
      case 'schedule':
        await lib.someday()
        break
      case 'issues':
        await lib.closeOthers()
        break
      default:
        break
    }
  } catch (error) {
    core.setFailed((error as any).message)
  }
}

run()
