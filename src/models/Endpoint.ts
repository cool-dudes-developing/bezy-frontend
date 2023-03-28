import { Model } from 'pinia-orm'
import { Str, Uid } from 'pinia-orm/dist/decorators'

export default class Endpoint extends Model {
  static entity = 'endpoints'

  @Uid() declare id: string
  @Uid() declare project_id: string
  @Str('') declare name: string
  @Str('') declare uri: string
  @Str('') declare method: string
}
