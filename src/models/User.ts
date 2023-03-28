import { Model } from 'pinia-orm'
import { HasMany, Str, Uid } from 'pinia-orm/dist/decorators'
import Project from './Project'

export default class User extends Model {
  static entity = 'users'

  @Uid() declare id: string
  @Str('') declare name: string
  @Str('') declare email: string
  @HasMany(() => Project, 'user_id', 'id') declare projects: Project[]
}
