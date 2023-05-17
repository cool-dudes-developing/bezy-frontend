import * as joint from 'jointjs'
import { Model, useRepo } from 'pinia-orm'
import { Attr, HasMany, HasManyBy, Num, Str, Uid } from 'pinia-orm/dist/decorators'
import Port from './Port'
import Connection from './Connection'
import * as api from '@/utils/api'

export default class Block extends Model {
  static entity = 'blocks'

  @Uid() declare id: string
  @Attr(null) declare method_id?: string
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
      useRepo(Block).save(response.data.data)
    })
  }

  static destroy(id: string) {
    return api.del('/methods/' + useRepo(Block).find(id)?.method_id + '/blocks/' + id).then(() => {
      useRepo(Block).destroy(id)
    })
  }

  get inPort() {
    return {
      position: {
        name: 'left'
      },
      attrs: {
        portBody: {
          magnet: true,
          r: 10,
          fill: '#023047',
          stroke: '#023047'
        }
      },
      label: {
        position: {
          name: 'left',
          args: { y: 6 }
        },
        markup: [
          {
            tagName: 'text',
            selector: 'label',
            className: 'label-text'
          }
        ]
      },
      markup: [
        {
          tagName: 'circle',
          selector: 'portBody'
        }
      ]
    }
  }

  get outPort() {
    return {
      position: {
        name: 'right'
      },
      attrs: {
        portBody: {
          magnet: true,
          r: 10,
          fill: '#E6A502',
          stroke: '#023047'
        }
      },
      label: {
        position: {
          name: 'right',
          args: { y: 6 }
        },
        markup: [
          {
            tagName: 'text',
            selector: 'label',
            className: 'label-text'
          }
        ]
      },
      markup: [
        {
          tagName: 'circle',
          selector: 'portBody'
        }
      ]
    }
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

    const shape = new joint.shapes.standard.Rectangle({
      id: this.id,
      position: {
        x: this.x,
        y: this.y
      },
      size: {
        width: 100,
        height: 100
      },
      attrs: {
        root: {
          magnet: false
        },
        body: {
          fill: '#8ECAE6'
        },
        label: {
          text: this.name,
          fontSize: 16,
          y: -10
        }
      },
      ports: {
        groups: {
          in: this.inPort,
          out: this.outPort
        }
      }
    })

    shape.addPorts(
      this.outPorts.sort(Block.portSort).map((port: Port) => ({
        id: port.id,
        group: 'out',
        attrs: { label: { text: port.type === 'flow' ? 'Out' : port.name } }
      }))
    )

    shape.addPorts(
      this.inPorts.sort(Block.portSort).map((port: Port) => ({
        id: port.id,
        group: 'in',
        attrs: { label: { text: port.type === 'flow' ? 'In' : port.name } }
      }))
    )

    return shape
  }
}
