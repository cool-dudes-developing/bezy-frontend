import { dia, linkTools } from 'jointjs'

export class Shape extends dia.Element {
  defaults() {
    return {
      ...super.defaults,
      type: 'Shape',
      size: { width: 200, height: 140 },
      attrs: {
        body: {
          stroke: '#fff',
          fill: 'transparent',
          strokeWidth: 2,
          width: 'calc(w)',
          height: 'calc(h)'
        },
        background: {
          fill: '#3f3f3f',
          width: 'calc(w)',
          height: 'calc(h)'
        },
        label: {
          x: 'calc(0.5 * w)',
          y: '10',
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          fontWeight: 'bold',
          fontSize: 15,
          fontFamily: 'sans-serif'
        }
      },
      portMarkup: [
        {
          tagName: 'path',
          selector: 'portBody',
          attributes: {
            fill: '#FFFFFF',
            stroke: '#333333',
            'stroke-width': 2
          }
        }
      ],
      portLabelMarkup: [
        {
          tagName: 'rect',
          selector: 'portLabelBackground'
        },
        {
          tagName: 'text',
          selector: 'portLabel',
          attributes: {
            fill: '#333333'
          }
        }
      ],
      ports: {
        groups: {
          in: {
            label: {
              position: {
                name: 'inside',
                args: {
                  offset: 25
                }
              }
            },
            size: { width: 20, height: 20 },
            attrs: {
              portLabel: {
                fontFamily: 'sans-serif',
                pointerEvents: 'none',
                fill: '#fafafa',
                textVerticalAnchor: 'middle'
              },
              portBody: {
                d: 'M 0 -calc(0.5 * h) h -calc(w) l 3 calc(0.5 * h) l -3 calc(0.5 * h) H 0 A calc(0.5 * h) calc(0.5 * h) 1  1 0 0 -calc(0.5 * h) Z',
                magnet: 'active'
              }
            }
          },
          out: {
            position: 'right',
            label: {
              position: {
                name: 'inside',
                args: {
                  offset: 25
                }
              }
            },
            size: { width: 20, height: 20 },
            attrs: {
              portLabel: {
                fontFamily: 'sans-serif',
                pointerEvents: 'none',
                fill: '#fafafa',
                textVerticalAnchor: 'middle'
              },
              portBody: {
                d: 'M 0 -calc(0.5 * h) h calc(w) l 3 calc(0.5 * h) l -3 calc(0.5 * h) H 0 A calc(0.5 * h) calc(0.5 * h) 1  1 1 0 -calc(0.5 * h) Z',
                magnet: 'active'
              }
            }
          }
        }
      }
    }
  }

  preinitialize() {
    this.markup = [
      {
        tagName: 'rect',
        selector: 'body',
        attributes: {}
      },
      {
        tagName: 'rect',
        selector: 'background',
        attributes: {
          fill: 'red'
        }
      },
      {
        tagName: 'text',
        selector: 'label',
        attributes: {
          fill: '#fff'
        }
      }
    ]
  }
}

export class PortTargetArrowhead extends linkTools.TargetArrowhead {
  preinitialize() {
    this.tagName = 'rect'
    this.attributes = {
      width: 20,
      height: 14,
      x: 6,
      y: -7,
      rx: 7,
      ry: 7,
      fill: '#FD0B88',
      'fill-opacity': 0.2,
      stroke: '#FD0B88',
      'stroke-width': 2,
      cursor: 'move',
      class: 'target-arrowhead'
    }
  }
}

export const HighlightFrame = dia.HighlighterView.extend({
  tagName: 'path',
  attributes: {
    stroke: '#f6f740',
    'stroke-width': 2,
    fill: 'none',
    'pointer-events': 'none'
  },
  // Method called to highlight a CellView
  highlight({ model }) {
    const { padding = 0, bevel = 10 } = this.options
    const bbox = model.getBBox()
    // Highlighter is always rendered relatively to the CellView origin
    bbox.x = bbox.y = 0
    // Increase the size of the highlighter
    bbox.inflate(padding)
    const { x, y, width, height } = bbox
    this.vel.attr(
      'd',
      `
              M ${x} ${y + bevel}
              L ${x} ${y + height - bevel}
              L ${x + bevel} ${y + height}
              L ${x + width - bevel} ${y + height}
              L ${x + width} ${y + height - bevel}
              L ${x + width} ${y + bevel}
              L ${x + width - bevel} ${y}
              L ${x + bevel} ${y}
              Z
          `
    )
  }
})
