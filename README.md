# @omcs/actions-friday
*work with [cheatsheet app based on github](https://github.com/ohmycheatsheet/cheatsheets)*

## Usage

1. Create a `.github/workflows/friday.yml` file in your GitHub repo.
2. Add the following code to the `friday.yml` file.

```yaml
name: friday
on:
  schedule:
    - cron: "0 11 * * *"
name: friday
jobs:
  someday:
    name: Someday
    runs-on: ubuntu-latest
    steps:
    - uses: JiangWeixian/cheatsheets-sdil-actions@v1
      with:
          SLACK_CHANNEL: '#general'
      env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

3. Create `SLACK_WEBHOOK` secret using [GitHub Action's Secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository). You can generate a Slack incoming webhook token from [here](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks).


### Variables

|name|description|required|type|
|:---:|:---:|:---:|:---|
|GITHUB_TOKEN|your cheatsheet website url|true|string|
|SLACK_CHANNEL|slack channel|true|string|
|SLACK_WEBHOOK|slack webhook url|true|string|
|debug|log flag|false|boolean|


## Develop

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
pnpm run prepare
ga .
gpsup
```

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md), the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.


