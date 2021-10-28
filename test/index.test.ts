import { readRepoInfo } from '../src/api'

it('read deploy info should work', async () => {
  const results = await readRepoInfo('JiangWeixian', 'cheatsheets')
  expect(results.data.homepage).toBeDefined()
})
