import { Story } from '../../models/story.js'

export class SqliteStoryRepository {
  constructor(database) {
    this.insertStatement = database.prepare(`
      INSERT INTO stories (
        id,
        title,
        situation,
        task,
        action,
        result,
        tags
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    this.findByIdStatement = database.prepare(`
      SELECT id, title, situation, task, action, result, tags
      FROM stories
      WHERE id = ?
    `)
  }

  async save(story) {
    this.insertStatement.run(
      story.id,
      story.title,
      story.situation,
      story.task,
      story.action,
      story.result,
      JSON.stringify(story.tags),
    )
  }

  async findById(id) {
    const row = this.findByIdStatement.get(id)

    if (!row) {
      return undefined
    }

    return new Story({
      id: row.id,
      title: row.title,
      situation: row.situation,
      task: row.task,
      action: row.action,
      result: row.result,
      tags: JSON.parse(row.tags),
    })
  }
}