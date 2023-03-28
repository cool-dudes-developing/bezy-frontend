import { Model } from 'pinia-orm'
import { HasMany, Str, Uid } from 'pinia-orm/dist/decorators'
import Endpoint from './Endpoint'
import Method from './Method'

export default class Project extends Model {
  static entity = 'projects'

  @Uid() declare id: string
  @Uid() declare user_id: string
  @Str('') declare name: string
  @Str('') declare description: string
  @HasMany(() => Endpoint, 'project_id', 'id') declare endpoints: Endpoint[]
  @HasMany(() => Method, 'project_id', 'id') declare methods: Method[]
}
