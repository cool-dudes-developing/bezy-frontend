<template>
  <h2>Editor</h2>
  <div id="container" ref="container"></div>
  <pre>{{ blocks }}</pre>
</template>
<script lang="ts" setup>
import Block from '@/models/Block'
import * as joint from 'jointjs'
import { useRepo } from 'pinia-orm'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as _ from 'lodash'

const container = ref<HTMLElement | null>(null)
const route = computed(() => useRoute())
const blocks = computed(() =>
  useRepo(Block)
    .where('method_id', route.value.params.method as string)
    .get()
)

onMounted(() => {
  let namespace = joint.shapes

  const graph = new joint.dia.Graph({}, { cellNamespace: namespace })

  const paper = new joint.dia.Paper({
    el: document.getElementById('container'),
    width: '800',
    height: 400,
    model: graph,
    gridSize: 5,
    drawGrid: true,
    background: {
      color: 'rgba(0, 255, 0, 0.3)'
    },
    cellViewNamespace: namespace,
    linkPinning: false, // Prevent link being dropped in blank paper area
    snapLinks: { radius: 20 },
    markAvailable: true,
    defaultLink: new joint.shapes.standard.Link(),
    defaultConnectionPoint: {
      name: 'boundary'
    },
    validateConnection: function (
      cellViewS,
      magnetS,
      cellViewT,
      magnetT,
      end,
      linkView
    ) {
      // Prevent linking from input ports
      if (magnetS && magnetS.getAttribute('port-group') === 'in') return false
      // Prevent linking from output ports to input ports within one element
      if (cellViewS === cellViewT) return false
      // Prevent linking if input port is already connected
      if (magnetT && magnetT.getAttribute('port-group') === 'in') {
        const portId = magnetT.getAttribute('port')
        const links = graph.getConnectedLinks(cellViewT.model, {
          inbound: true
        })
        if (links.find((link) => link.get('target').port === portId))
          return false
        return true
      }
      // Prevent linking to output ports
      return magnetT && magnetT.getAttribute('port-group') === 'in'
    },
    validateMagnet: function (cellView, magnet) {
      console.log('validateMagnet', cellView, magnet)

      // Prevent links from ports that already have a link
      var port = magnet.getAttribute('port')
      var links = graph.getConnectedLinks(cellView.model, {
        outbound: true,
        inbound: true
      })

      var portLinks = _.filter(links, function (o) {
        return o.get('source').port == port || o.get('target').port == port
      })
      if (portLinks.length > 0) return false

      // Note that this is the default behaviour. Just showing it here for reference.
      // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
      return magnet.getAttribute('magnet') !== 'passive'
    }
  })

  graph.addCells(blocks.value.map((block) => block.buildingShape))

  // Register events
  paper.on('link:mouseenter', (linkView) => {
    showLinkTools(linkView)
  })

  paper.on('link:mouseleave', (linkView) => {
    linkView.removeTools()
  })

  graph.on('change:position', function (cell) {
    const position = cell.getBBox()
    useRepo(Block).save({
      id: cell.id,
      left: position.x,
      top: position.y
    })
  })

  graph.on('change:source change:target', function (link) {
    if (link.get('source').id && link.get('target').id) {
      // both ends of the link are connected.
      const source = link.get('source')
      const target = link.get('target')

      console.log(
        `Link from ${source.id}:${source.port} to ${target.id}:${target.port} was created.`
      )

      // if (Math.floor(Math.random() * 100) < 50) {
      //   // 50% chance to remove link
      //   // TODO: remove this code later, it's just for testing
      //   console.log('Link removed due to random chance.')
      //   link.remove()
      // }
    }
  })

  graph.on('remove', function (cell) {
    if (cell.isLink()) {
      const source = cell.get('source')
      const target = cell.get('target')
      console.log(
        `Link from ${source.id}:${source.port} to ${target.id}:${target.port} was removed.`
      )
    }
  })

  function showLinkTools(linkView) {
    var tools = new joint.dia.ToolsView({
      tools: [
        new joint.linkTools.Remove({
          distance: '50%',
          markup: [
            {
              tagName: 'circle',
              selector: 'button',
              attributes: {
                r: 7,
                fill: '#f6f6f6',
                stroke: '#ff5148',
                'stroke-width': 2,
                cursor: 'pointer'
              }
            },
            {
              tagName: 'path',
              selector: 'icon',
              attributes: {
                d: 'M -3 -3 3 3 M -3 3 3 -3',
                fill: 'none',
                stroke: '#ff5148',
                'stroke-width': 2,
                'pointer-events': 'none'
              }
            }
          ]
        })
      ]
    })
    linkView.addTools(tools)
  }
})
</script>
<style>
#container {
  border: 1px solid #000;
  user-select: none;
}
.available-magnet {
  fill: #5da271;
  stroke: yellow;
  stroke-width: 2px;
}

/* element styling */
.available-cell rect {
  stroke-dasharray: 5, 2;
}
</style>
