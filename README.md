# @omcs/actions-friday

[![omcs-bot-banner](https://user-images.githubusercontent.com/6839576/139284715-023030ba-fc1e-4bd7-b526-2537836e2b31.png)](https://github.com/ohmycheatsheet/cheatsheets)
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
    - uses: ohmycheatsheet/actions-friday@v1
      env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

3. Create `SLACK_WEBHOOK` secret using [GitHub Action's Secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository). You can generate a Slack incoming webhook token from [here](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks).


### Variables

|name|description|required|type|
|:---:|:---:|:---:|:---|
|GITHUB_TOKEN|(env)repo token|true|string|
|SLACK_WEBHOOK|(env)slack webhook url|true|string|
|CHEATSHEET_HOST|(input)cheatsheet website homepage, in default come from repo homepage|false|string|
|SLACK_CHANNEL|(input)slack channel|false|string|
|debug|(input)log flag|false|boolean|


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


