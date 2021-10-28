import * as core from '@actions/core'
import * as github from '@actions/github'
import fetch from 'node-fetch'
import dayjs from 'dayjs'
import { IncomingWebhook } from '@slack/webhook'

import { readRepoInfo } from './api'

/**
 * @todo improve typo define
 */
async function run() {
  try {
    const info = await readRepoInfo(github.context.repo.owner, github.context.repo.repo)
    const host = info.data.homepage?.replace('https://', '') || core.getInput('CHEATSHEET_HOST')
    if (!host) {
      throw new Error('Please define cheatsheet homepage host')
    }
    core.info(`Fetch cheatsheet from https://${host}/api/someday`)
    const response: any = await fetch(`https://${host}/api/someday`, { method: 'GET' }).then(res =>
      res.json(),
    )
    const debug = core.getInput('debug') || false
    debug && core.info(JSON.stringify(response))
    const channel = core.getInput('SLACK_CHANNEL')
    const url = process.env.SLACK_WEBHOOK
    if (!channel || !url) {
      core.info('Please defined Slack channel and url')
      return
    }
    debug && core.info(JSON.stringify(channel))
    const webhook = new IncomingWebhook(url)
    if (response && response[0]) {
      const { body, created_at, labels, title } = response[0]
      await webhook.send({
        username: 'Cheatsheet Someday',
        channel,
        icon_url:
          'https://a.slack-edge.com/production-standard-emoji-assets/13.0/apple-large/1f9d1-1f3fb-200d-1f4bb@2x.png',
        attachments: [
          {
            fallback: body,
            pretext: title,
            text: body,
            fields: [
              {
                title: 'Learned At',
                value: dayjs(created_at).format('YYYY-MM-DD HH:mm:ss'),
                short: false,
              },
              {
                title: 'Labels',
                value: labels.map((label: any) => label.name).join(','),
                short: false,
              },
            ],
          },
        ],
      })
    }
  } catch (error) {
    core.setFailed((error as any).message)
  }
}

run()
