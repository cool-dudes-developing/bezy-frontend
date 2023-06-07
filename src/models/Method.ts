import { Model, useRepo } from 'pinia-orm'
import { Attr, HasMany, Str, Uid } from 'pinia-orm/dist/decorators'
import Block from './Block'
import * as api from '@/utils/api'
import Connection from './Connection'

export default class Method extends Model {
  static entity = 'methods'

  @Uid() declare id: string
  @Attr('') declare project_id: string
  @Str('') declare name: string
  @Str('') declare title: string
  @Str('') declare description: string
  @Str('') declare type: string
  @HasMany(() => Block, 'method_id', 'id') declare blocks: Block[]
  @HasMany(() => Connection, 'method_id', 'id') declare connections: Connection[]

  static fetchAll(project_id: string) {
    return api.get('/projects/' + project_id + '/methods/').then((response) => {
      useRepo(Method).save(response.data.data)
    })
  }

  static fetch(project_id: string, id: string) {
    return api.get('/projects/' + project_id + '/methods/' + id).then((response) => {
      useRepo(Method).save(response.data.data)
    })
  }

  static store(project_id: string, data: any) {
    return api.post('/projects/' + project_id + '/methods/', data).then((response) => {
      console.log(response)
      useRepo(Method).save(response.data.data)
    })
  }

  static destroy(project_id: string, id: string) {
    return api.del('/projects/' + project_id + '/methods/' + id).then((response) => {
      useRepo(Method).destroy(id)
    })
  }

  static addBlock(method_id: string, block_id: string) {
    return api
      .post('/methods/' + method_id + '/blocks', {
        block_id: block_id,
        x: 0,
        y: 0
      })
      .then((response) => {
        return useRepo(Block).save(response.data.data) as unknown as Block
      })
  }
}
