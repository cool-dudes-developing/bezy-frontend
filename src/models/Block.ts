import * as joint from 'jointjs'
import { Model } from 'pinia-orm'
import { Attr, HasMany, Num, Str, Uid } from 'pinia-orm/dist/decorators'
import Port from './Port'

export default class Block extends Model {
  static entity = 'blocks'

  @Uid() declare id: string
  @Uid() declare method_id?: string
  @Str('') declare name: string
  @Num(0) declare top: number
  @Num(0) declare left: number
  @HasMany(() => Port, 'block_id', 'id') declare ports: Port[]

  get connectedPorts() {
    return this.ports.filter((port: Port) => port.connected_to)
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

  get buildingShape() {
    const shape = new joint.shapes.standard.Rectangle({
      id: this.id,
      position: {
        x: this.left,
        y: this.top
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
      this.ports.map((port: Port, index) => ({
        id: port.id,
        group: port.direction,
        attrs: { label: { text: port.name } }
      }))
    )

    return shape
  }
}
