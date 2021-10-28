import { readRepoInfo } from '../src/api'

it('read deploy info should work', async () => {
  const results = await readRepoInfo('JiangWeixian', 'cheatsheets')
  console.log(results.data.homepage)
  expect(results.data.homepage).toBeDefined()
})
