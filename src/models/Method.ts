import { Model } from 'pinia-orm'
import { HasMany, Str, Uid } from 'pinia-orm/dist/decorators'
import Block from './Block'

export default class Method extends Model {
  static entity = 'methods'

  @Uid() declare id: string
  @Uid() declare project_id: string
  @Str('') declare name: string
  @HasMany(() => Block, 'method_id', 'id') declare blocks: Block[]
}
