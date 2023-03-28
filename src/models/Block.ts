import * as joint from 'jointjs'
import { Model } from 'pinia-orm'
import { A } from 'pinia-orm/dist/Data-77556be8'
import { Attr, Num, Str, Uid } from 'pinia-orm/dist/decorators'

export default class Block extends Model {
  static entity = 'blocks'

  @Uid() declare id: string
  @Uid() declare method_id: string
  @Str('') declare name: string
  @Num(0) declare top: number
  @Num(0) declare left: number
  @Attr([]) declare flow_in: {
    id: string
    type: string
    name: string
    block_id: string
  }[]
  @Attr([]) declare flow_out: {
    id: string
    type: string
    name: string
    block_id: string
  }[]
  @Attr([]) declare params_in: {
    id: string
    type: string
    name: string
    block_id: string
  }[]
  @Attr([]) declare params_out: {
    id: string
    type: string
    name: string
    block_id: string
  }[];

  get in() {
    return this.flow_in.concat(this.params_in)
  }

  get out() {
    return this.flow_out.concat(this.params_out)
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
      this.in.map((port, index) => ({
        id: port.id,
        group: 'in',
        attrs: { label: { text: port.name } }
      }))
    )

    shape.addPorts(
      this.out.map((port, index) => ({
        id: port.id,
        group: 'out',
        attrs: { label: { text: port.name } }
      }))
    )

    return shape
  }
}
