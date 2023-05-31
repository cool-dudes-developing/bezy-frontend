<template>
  <h2>Editor {{ method.name }}</h2>
  <div id="container" ref="container"></div>
  <div class="flex flex-row w-full">
    <pre>{{
      blocks.map((b) => {
        return {
          name: b.name,
          x: b.x,
          y: b.y
        }
      })
    }}</pre>
    <div class="flex-grow">
      <h1>Template blocks</h1>
      <div
        v-for="block in templateBlocks"
        :key="block.id"
        class="bg-red-400 rounded w-full p-3 my-3"
      >
        <div class="flex justify-between">
          <h3>{{ block.name }}</h3>
          <button
            class="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            @click="addTemplateBlock(block)"
          >
            add
          </button>
        </div>
        <div class="flex justify-evenly"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from '@/models/Block'
import * as joint from 'jointjs'
import { useRepo } from 'pinia-orm'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import _ from 'lodash'
import Port from '@/models/Port'
import Method from '@/models/Method'
import Connection from '@/models/Connection'

const container = ref<HTMLElement | null>(null)
const route = computed(() => useRoute())
const portRepo = computed(() => useRepo(Port))
const blockRepo = computed(() => useRepo(Block))
const templateBlocks = computed(() => blockRepo.value.where('method_id', null).get())
const blocks = computed(() =>
  blockRepo.value
    .where('method_id', route.value.params.method as string)
    .withAll()
    .get()
)
const method = computed(() =>
  useRepo(Method)
    .withAllRecursive()
    .find(route.value.params.method as string)
)

console.log('method', method.value.name)

function addTemplateBlock(block: Block) {
  console.log('addTemplateBlock', block)

  Method.addBlock(method.value.id, block.id).then((block) => {
    graph.addCell(blocks.value.find((b) => b.id === block.id)?.buildingShape)
  })
}

const namespace = joint.shapes
const graph = new joint.dia.Graph({}, { cellNamespace: namespace })

onMounted(() => {
  const paper = new joint.dia.Paper({
    el: document.getElementById('container'),
    width: '100%',
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
    validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
      // Prevent linking from input ports
      if (magnetS && magnetS.getAttribute('port-group') === 'in') return false

      // Prevent linking from output ports to input ports within one element
      if (cellViewS === cellViewT) return false

      // Prevent linking if input port is already connected
      if (magnetT && magnetT.getAttribute('port-group') === 'in') {
        // target port id
        const targetPortId = magnetT.getAttribute('port')

        // target connected links
        const links = graph.getConnectedLinks(cellViewT.model, {
          inbound: true
        })

        // check if any of the links has the same target port
        if (links.find((link) => link.get('target').port === targetPortId)) return false

        // check if type of source port is the same as target port
        const sourcePortId = magnetS.getAttribute('port')

        const sourcePort = portRepo.value.find(sourcePortId as string)
        const targetPort = portRepo.value.find(targetPortId as string)

        // check if ports exist in storage
        if (!sourcePort || !targetPort) return false

        // check if types are the same
        if (sourcePort.type !== targetPort.type) return false

        return true
      }
      // Prevent linking to output ports
      return magnetT && magnetT.getAttribute('port-group') === 'in'
    },
    validateMagnet: function (cellView, magnet) {
      // Prevent links from ports that already have a link
      const port = magnet.getAttribute('port')
      const links = graph.getConnectedLinks(cellView.model, {
        outbound: true,
        inbound: true
      })

      const portLinks = _.filter(links, function (o) {
        return o.get('source').port == port || o.get('target').port == port
      })
      if (portLinks.length > 0) return false

      // Note that this is the default behaviour. Just showing it here for reference.
      // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
      return magnet.getAttribute('magnet') !== 'passive'
    }
  })

  console.log('Initializing building blocks')
  graph.addCells(blocks.value.map((block) => block.buildingShape))
  console.log('Building blocks initialized, count: ', graph.getElements().length)
  if (blocks.value.length !== graph.getElements().length) {
    console.error('Building blocks count mismatch')
  }

  console.log('Initializing links')
  method.value?.connections.forEach((connection) => {
    const link = new joint.shapes.standard.Link()
    console.log('id', connection.id)

    console.log('from', connection.from_method_block.id, 'to', connection.to_method_block.id)
    console.log('from', connection.from_port.id, 'to', connection.to_port.id)

    link.source({ id: connection.from_method_block_id, port: connection.from_port_id })
    link.target({ id: connection.to_method_block_id, port: connection.to_port_id })
    graph.addCell(link)
  })

  // graph.getElements().forEach((cell) => {
  //   const block = blockRepo.value.with('ports').find(cell.id)

  //   if (!block) return
  //   const ports = block.connectedPorts
  //   ports.forEach((port) => {
  //     if (port.direction === 'out') {
  //       const sourcePort = portRepo.value.find(port.connected_to)
  //       const link = new joint.shapes.standard.Link()
  //       link.source({ id: cell.id, port: port.id })
  //       link.target({
  //         id: sourcePort.block_id,
  //         port: sourcePort.id
  //       })
  //       graph.addCell(link)
  //     }
  //   })
  // })
  console.log('Links initialized, count: ', graph.getLinks().length)

  // Register events
  paper.on('link:mouseenter', (linkView) => {
    showLinkTools(linkView)
  })

  paper.on('link:mouseleave', (linkView) => {
    linkView.removeTools()
  })

  paper.on('element:mouseenter', (elementView) => {
    elementView.addTools(
      new joint.dia.ToolsView({
        tools: [
          new joint.linkTools.Boundary(),
          new joint.linkTools.Remove({
            distance: 20
          })
        ]
      })
    )
  })

  paper.on('element:mouseleave', (elementView) => {
    elementView.removeTools()
  })

  graph.on('change:position', function (cell: any) {
    const position = cell.getBBox()

    useRepo(Block).save({
      id: cell.id,
      x: position.x,
      y: position.y
    })
  })

  graph.on('change:source change:target', function (link: any) {
    if (link.get('source').id && link.get('target').id) {
      // both ends of the link are connected.
      const source = link.get('source')
      const target = link.get('target')

      console.log(
        `Link from ${source.id}:${source.port} to ${target.id}:${target.port} was created.`
      )

      const sourcePort = portRepo.value.find(source.port as string)
      const targetPort = portRepo.value.find(target.port as string)

      if (sourcePort && targetPort) {
        Connection.store(method.value.id, source.id, target.id, source.port, target.port)
      }
    }
  })

  graph.on('remove', function (cell: any) {
    if (cell.isElement()) {
      Block.destroy(cell.id)
    }

    if (cell.isLink()) {
      const source = cell.get('source')
      const target = cell.get('target')
      console.log(
        `Link from ${source.id}:${source.port} to ${target.id}:${target.port} was removed.`
      )

      const sourcePort = portRepo.value.find(source.port as string)

      // check if target id or target port is undefined
      if (!target.id || !target.port) {
        // TODO: initiate block creation dialog
        console.log('Block creation dialog initialization')
      }

      const targetPort = portRepo.value.find(target.port as string)
      if (targetPort && sourcePort) {
        Connection.destroy(
          useRepo(Connection)
            .where('from_method_block_id', source.id)
            .where('to_method_block_id', target.id)
            .where('from_port_id', source.port)
            .where('to_port_id', target.port)
            .first()?.id as string
        )
      }
    }
  })

  function showLinkTools(linkView) {
    const tools = new joint.dia.ToolsView({
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
