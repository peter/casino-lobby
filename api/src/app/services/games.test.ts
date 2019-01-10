import {getGames} from 'app/services/games'
import gamesSchema from 'app/services/games_schema'
import jsonSchema from 'app/json_schema'

test('getGames - gets all games by default. Games comply with the games JSON schema', async () => {
  const {games} = await getGames()
  expect(games).not.toBeNull()
  for (const game of games) {
    const schemaErrors = jsonSchema.validate(gamesSchema, game)
    expect(schemaErrors).toBeNull()
  }
})
