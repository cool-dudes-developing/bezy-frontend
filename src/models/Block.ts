import * as joint from 'jointjs'
import { Model, useRepo } from 'pinia-orm'
import { Attr, HasMany, HasManyBy, Num, Str, Uid } from 'pinia-orm/dist/decorators'
import Port from './Port'
import Connection from './Connection'
import * as api from '@/utils/api'
import { dia } from 'jointjs'
import { Shape } from './Shapes'
import MarketplaceAsset from '@/models/MarketplaceAsset'

export default class Block extends Model {
  static entity = 'blocks'

  @Uid() declare id: string
  @Attr(null) declare method_id?: string
  @Attr(null) declare block_id?: string
  @Str('') declare name: string
  @Str('') declare description: string
  @Num(0) declare x: number
  @Num(0) declare y: number
  @Attr([]) declare outPortIds: string[]
  @Attr([]) declare inPortIds: string[]
  @HasMany(() => Port, 'block_id', 'id') declare ports: Port[]
  @HasManyBy(() => Port, 'outPortIds') declare outPorts: Port[]
  @HasManyBy(() => Port, 'inPortIds') declare inPorts: Port[]

  static fetchAllTemplates() {
    return api.get('/blocks/templates').then((response) => {
      useRepo(Block).save(response.data.data.blocks)
      useRepo(MarketplaceAsset).save(response.data.data.assets)
    })
  }

  static save(block: Block) {
    return api.put(
      '/methods/' + useRepo(Block).find(block.id)?.method_id + '/blocks/' + block.id,
      block
    )
  }

  static destroy(id: string) {
    return api.del('/methods/' + useRepo(Block).find(id)?.method_id + '/blocks/' + id).then(() => {
      useRepo(Block).destroy(id)
    })
  }

  static portSort(a: Port, b: Port) {
    if (a.type === 'flow' && b.type === 'flow') {
      return a.created_at - b.created_at
    } else if (a.type === 'flow') {
      return -1
    } else if (b.type === 'flow') {
      return 1
    } else {
      return a.created_at - b.created_at
    }
  }

  get buildingShape() {
    console.log(this.x, this.y)

    return new Shape({
      id: this.id,
      position: {
        x: this.x,
        y: this.y
      },
      attrs: {
        label: {
          text: this.name
        }
      },
      ports: {
        items: [
          ...this.outPorts.sort(Block.portSort).map((port: Port) => ({
            id: port.id,
            group: 'out',
            attrs: { portLabel: { text: port.type === 'flow' ? 'Out' : port.name } }
          })),
          ...this.inPorts.sort(Block.portSort).map((port: Port) => ({
            id: port.id,
            group: 'in',
            attrs: { portLabel: { text: port.type === 'flow' ? 'In' : port.name } }
          }))
        ]
      }
    })
  }
}
