import { mkdirSync, readFileSync } from 'node:fs'
import { DatabaseSync } from 'node:sqlite'

const dataDirectory = new URL('../../../data/', import.meta.url)

mkdirSync(dataDirectory, { recursive: true })

export const database = new DatabaseSync(
  new URL('star-stories.db', dataDirectory),
)

try {
  const { user_version: version } = database
    .prepare('PRAGMA user_version')
    .get()

  if (version === 0) {
    const migration = readFileSync(
      new URL('./migrations/001-create-stories.sql', import.meta.url),
      'utf8',
    )

    database.exec('BEGIN')

    try {
      database.exec(migration)
      database.exec('PRAGMA user_version = 1')
      database.exec('COMMIT')
    } catch (error) {
      database.exec('ROLLBACK')
      throw error
    }
  } else if (version !== 1) {
    throw new Error(`Versão de banco não suportada: ${version}`)
  }
} catch (error) {
  database.close()
  throw error
}