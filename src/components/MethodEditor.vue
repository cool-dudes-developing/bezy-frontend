<template>
  <div
    id="container"
    ref="container"
    class="h-full w-full relative"
    @mousemove="handleMouseMove"
    @wheel.prevent="handleWheelMove"
  ></div>
  <div v-if="inspectBlock" class="absolute inset-0 flex items-center justify-center p-10"
       @click.self="inspectBlock = null">
    <div
      class="grow max-w-lg overflow-y-auto overflow-x-hidden max-h-[500px] h-full bg-background-800 flex flex-col gap-3 p-3 rounded-lg border">
      <div class="flex justify-between">
        <h1 class="text-xl">{{ inspectBlock.name }}</h1>
        <button v-if="templateAssets.find(a=>a.block.id === inspectBlock?.block_id)"
                class="bg-accent text-black font-bold px-3 rounded" @click="() => {
        const asset = templateAssets.find(a=>a.block.id === inspectBlock?.block_id)
        if (!asset) return
        router.push({
          name: 'method',
          params: {
            project: route.params.project as string,
            method: asset.block.id as string
          }
        })
      }">
          Inspect
        </button>
      </div>
      <p>
        {{ inspectBlock.description }}
      </p>

      <div v-if="inspectBlock?.inPorts.length" class="divide-y divide-accent">
        <small>Input</small>
        <div v-for="port in inspectBlock?.inPorts" :key="port.id">
          <div class="flex flex-row justify-between">
            <h2>{{ port.name }}</h2>
            <h2>{{ port.type }}</h2>
          </div>
        </div>
        <div v-if="inspectBlock?.name === 'end'">
          Add method output
          <div class="flex flex-row justify-between">
            <input v-model="newOutputName" class="bg-background" placeholder="name" type="text">
            <select v-model="newOutputType" class="bg-background">
              <option v-for="type in ['string', 'number', 'boolean', 'object', 'array']"
                      :key="type" :value="type">{{ type }}
              </option>
            </select>
            <button class="bg-background px-2" @click="addOutput">add</button>
          </div>
        </div>
      </div>

      <div v-if="inspectBlock?.outPorts.length" class="divide-y divide-accent">
        <small>Output</small>
        <div v-for="port in inspectBlock?.outPorts" :key="port.id">
          <div class="flex flex-row justify-between">
            <h2>{{ port.name }}</h2>
            <h2>{{ port.type }}</h2>
          </div>
        </div>
        <div v-if="inspectBlock?.name === 'start'">
          Add method input
          <div class="flex flex-row justify-between">
            <input v-model="newInputName" class="bg-background" placeholder="name" type="text">
            <select v-model="newInputType" class="bg-background">
              <option v-for="type in ['string', 'number', 'boolean', 'object', 'array']"
                      :key="type" :value="type">{{ type }}
              </option>
            </select>
            <button class="bg-background px-2" @click="addInput">add</button>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div v-if="runner" class="absolute inset-0 flex items-center justify-center p-10"
       @click.self="runner = null">
    <div
      class="grow max-w-lg overflow-y-auto overflow-x-hidden max-h-[500px] h-full bg-background-800 flex flex-col rounded-lg border">
      <div class="flex flex-col sticky top-0 bg-background-800">
        <input :value="`/api/projects/${route.params.project}/methods/${route.params.method}/execute`"
               class="bg-background p-1 rounded" disabled
               type="text">
        <div class="grid grid-cols-2 border-b">
          <button
            :class="{
            'bg-background': runner === 'request'
          }"
            class="p-3"
            @click="runner = 'request'"
          >
            Request
          </button>
          <button
            :class="{
            'bg-background': runner === 'response'
          }"
            class="p-3"
            @click="runner= 'response'"
          >
            Response
          </button>
        </div>
      </div>
      <div class="grow p-3 flex gap-3 flex-col">
        <template v-if="runner==='request'">
          <div class="flex flex-col gap-3">
            <h3 class="text-lg">Params</h3>
            <div v-for="param in method?.blocks.find(b=>b.name === 'start').outPorts.filter(p=>p.type !== 'flow')"
                 class="grid grid-cols-2">
              <h4>
                {{ param.name }}
                <span class="bg-accent text-black rounded-full px-1 text-xs font-bold">
                {{ param.type }}
                </span>
              </h4>
              <input v-if="['string','number'].includes(param.type)" v-model="runnerParams[param.name]"
                     :placeholder="param.type"
                     :type="param.type === 'string' ? 'text' : 'number'" class="bg-background" />
              <textarea v-else-if="['object','array'].includes(param.type)" v-model="runnerParams[param.name]"
                        :placeholder="'JSON '+param.type" class="bg-background" />
              <input v-else-if="param.type==='boolean'" v-model="runnerParams[param.name]" class="bg-background"
                     type="checkbox">
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-sm">
            Status: {{ runnerResponse?.status }} {{ runnerResponse?.statusText }}
          </div>
          <h3 class="text-lg">Response data:</h3>
          <pre class="bg-background">{{ runnerResponse?.data }}</pre>
        </template>

      </div>
      <button :disabled="runnerLoading" class="bg-accent disabled:bg-accent-500 active:bg-accent-400 text-black sticky bottom-0 py-2 font-bold" @click="sendRunner">
        Send
      </button>
    </div>
  </div>
  <div class="absolute top-0 flex gap-3">
    <button class="bg-green-600" @click="logbus">log bus</button>
    <button class="bg-green-600" @click="undo">undo</button>
    <button class="bg-green-600" @click="redo">redo</button>
    <button class="bg-green-600" @click="save">save</button>
    <button class="bg-green-600" @click="publish">publish</button>
    <button class="bg-green-600" @click="runner = 'request'">execute</button>
    <div
      v-if="blocksModalOpen"
      :style="{ top: blocksModalPosition.y + 'px', left: blocksModalPosition.x + 'px' }"
      class="absolute w-64 bg-black bg-opacity-50"
    >
      <div class="flex flex-row justify-between">
        <h1>Add block</h1>
        <button @click="blocksModalOpen = false">close</button>
      </div>
      <div class="flex flex-col overflow-auto">
        <input v-model="blocksSearch" class="bg-transparent" type="text">
        <div v-for="block in blocksSearchResults" :key="block.id">
          <div class="flex flex-row justify-between">
            <h2>{{ block.name }}</h2>
            <button
              @click="
                () => {
                  addTemplateBlock(block)
                  blocksModalOpen = false
                }
              "
            >
              add
            </button>
          </div>
        </div>
        <!--        <small>Marketplace</small>-->
        <!--        <div v-for="asset in templateAssets" :key="asset.id">-->
        <!--          <div class="flex flex-row justify-between">-->
        <!--            <h2>{{ asset.name }}</h2>-->
        <!--            <button-->
        <!--              @click="-->
        <!--                () => {-->
        <!--                  addTemplateBlock(asset.block)-->
        <!--                  blocksModalOpen = false-->
        <!--                }-->
        <!--              "-->
        <!--            >-->
        <!--              add-->
        <!--            </button>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'jointjs/dist/joint.css'
import Block from '@/models/Block'
import * as joint from 'jointjs'
import { useRepo } from 'pinia-orm'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import _ from 'lodash'
import Port from '@/models/Port'
import Method from '@/models/Method'
import Connection from '@/models/Connection'
import { Stack } from '@/utils/stack'
import { HighlightFrame } from '@/models/Shapes'
import * as api from '@/utils/api'
import MarketplaceAsset from '@/models/MarketplaceAsset'
import { AxiosError, type AxiosResponse } from 'axios'

const router = useRouter()
const runner = ref<string | null>(null)
const runnerLoading = ref(false)
const runnerParams = ref({})
const runnerResponse = ref<AxiosResponse | AxiosError | null>(null)
const container = ref<HTMLElement | null>(null)
const route = computed(() => useRoute())
const portRepo = computed(() => useRepo(Port))
const blockRepo = computed(() => useRepo(Block))
const assetRepo = computed(() => useRepo(MarketplaceAsset))
const templateBlocks = computed(() => blockRepo.value.where('method_id', null).get())
const templateAssets = computed(() => assetRepo.value.all())
const inspectBlock = ref<Block | null>(null)
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

const newOutputName = ref('')
const newOutputType = ref('string')

const newInputName = ref('')
const newInputType = ref('string')

function addOutput() {
  if (!method.value) return
  Method.addPort(method.value.id, newOutputName.value, newOutputType.value, true).then((block) => {
    // graph.addCell(blocks.value.find((b) => b.id === block.id)?.buildingShape)
  })
}

function addInput() {
  if (!method.value) return
  Method.addPort(method.value.id, newInputName.value, newInputType.value, false).then((block) => {
    // graph.addCell(blocks.value.find((b) => b.id === block.id)?.buildingShape)
  })
}

function sendRunner() {
  runnerLoading.value = true
  api.post(`/projects/${route.value.params.project}/methods/${route.value.params.method}/exec`, runnerParams.value)
    .then((r) => runnerResponse.value = r)
    .catch((e) => runnerResponse.value = e)
    .finally(() => runnerLoading.value = false)
}

const blocksModalOpen = ref(false)
const blocksModalPosition = ref({ x: 0, y: 0 })

const blocksSearch = ref('')
const blocksSearchResults = computed(() => {
  return templateBlocks.value.slice().concat(templateAssets.value.map((asset) => asset.block))
    .filter((block) => block.name?.toLowerCase().includes(blocksSearch.value.toLowerCase()))
})

console.log('method', method.value.name)

function addTemplateBlock(block: Block) {
  console.log('addTemplateBlock', block)

  if (!blocksModalPosition.value) return
  const p = offsetToLocalPoint(blocksModalPosition.value.x, blocksModalPosition.value.y, paper)

  Method.addBlock(method.value.id, block.id, p.x, p.y).then((block) => {
    graph.addCell(blocks.value.find((b) => b.id === block.id)?.buildingShape)
  })
}

const undoStack = new Stack()
const redoStack = new Stack()

function logbus() {
  console.log('undoStack', undoStack)
  console.log('redoStack', redoStack)
}

function undo() {
  const action = undoStack.pop()
  if (!action) return
  redoStack.push(action)
  switch (action.type) {
    case 'elementMove':
      let el = graph.getElements().find((el) => el.id === action.id)
      if (el) {
        el.translate(-action.dx, -action.dy)
      }
  }
}

function redo() {
  const action = redoStack.pop()
  if (!action) return
  undoStack.push(action)
  switch (action.type) {
    case 'elementMove':
      let el = graph.getElements().find((el) => el.id === action.id)
      if (el) {
        el.translate(action.dx, action.dy)
      }
  }
}

function save() {
  blocks.value.forEach((block) => {
    Block.save(block)
  })
}

function publish() {
  api.post(`/methods/${method.value.id}/publish`).then((res) => {
    router.push({
      name: 'asset',
      params: {
        id: res.data.data.id
      }
    })
  })
}

const namespace = joint.shapes

const graph = new joint.dia.Graph({}, { cellNamespace: namespace })
let paper: joint.dia.Paper | null = null
let dragStartPosition: { x: number; y: number } | null = null
let elementDragStartPosition: { x: number; y: number } | null = null
let localMousePosition: { x: number; y: number } | null = null
let highlightElement: joint.dia.ElementView | null = null

function handleMouseMove(e: MouseEvent) {

  localMousePosition = { x: e.offsetX, y: e.offsetY }
  if (dragStartPosition) {
    const dx = e.offsetX - dragStartPosition.x
    const dy = e.offsetY - dragStartPosition.y

    paper?.translate(dx, dy)
  }
}

function offsetToLocalPoint(offsetX, offsetY, paper) {
  const svgPoint = paper.svg.createSVGPoint()
  svgPoint.x = offsetX
  svgPoint.y = offsetY
  return svgPoint.matrixTransform(paper.viewport.getCTM().inverse())
}

function handleWheelMove(e: WheelEvent) {

  if (!paper?.options?.origin) return

  if (e.ctrlKey) {
    const delta = Math.min(Math.max(e.wheelDelta, -1), 1) / 100
    const scale = paper.scale().sx + delta

    if (scale <= 0.25 || scale >= 2) return

    const p = offsetToLocalPoint(e.offsetX, e.offsetY, paper)

    const oldscale = paper.scale().sx

    const factor = oldscale / scale

    const ax = p.x - p.x * factor
    const ay = p.y - p.y * factor

    const origin = paper.options.origin

    const tx = origin.x - ax * scale
    const ty = origin.y - ay * scale

    paper.translate(tx, ty)

    const ctm = paper.matrix()

    ctm.a = scale
    ctm.d = scale

    paper.matrix(ctm)

    paper.drawGrid()
  } else {
    const dx = paper.options.origin.x - e.deltaX
    const dy = paper.options.origin.y - e.deltaY

    paper?.translate(dx, dy)
  }
}

function selectElement(elementView: joint.dia.ElementView) {
  highlightElement = elementView
  HighlightFrame.add(elementView, 'root', 'frame', { padding: 10 })
  elementView.addTools(
    new joint.dia.ToolsView({
      tools: [
        new joint.linkTools.Remove({
          scale: 1.5,
          x: '100%',
          y: '0%'
        })
      ]
    })
  )
}

function unselectElement(elementView: joint.dia.ElementView) {
  highlightElement = null
  HighlightFrame.remove(elementView, 'frame')
  elementView.removeTools()
}

function removeElement(elementView: joint.dia.ElementView) {
  // TODO: implement this
}

function selectLink(linkView: joint.dia.LinkView) {
  // TODO: implement this
}

function unselectLink(linkView: joint.dia.LinkView) {
  // TODO: implement this
}

function removeLink(linkView: joint.dia.LinkView) {
  // TODO: implement this
}

onMounted(() => {
  paper = new joint.dia.Paper({
    el: document.getElementById('container'),
    model: graph,
    async: true,
    interactive: {
      // label move is disabled by default
      labelMove: true
    },

    // set paper dimensions
    width: '100%',
    height: '100%',

    // set grid size
    gridSize: 10,
    sorting: joint.dia.Paper.sorting.APPROX,
    drawGrid: {
      name: 'mesh',
      args: { color: '#f3dbf3', thickness: 0.1, scaleFactor: 5 }
    },

    // set paper styling
    background: {
      color: '#4a1a42'
    },

    // Prevent link being dropped in blank paper area
    linkPinning: false,
    // Enable link snapping within 20px lookup radius
    snapLinks: { radius: 20 },
    snapLabels: true,
    // Mark all available magnets
    markAvailable: true,
    // Define default link
    defaultLink: new joint.shapes.standard.DoubleLink({
      z: -1,
      attrs: {
        line: {
          stroke: '#fff',
          strokeWidth: 14,
          targetMarker: null
        },
        outline: {
          strokeWidth: 18
        }
      },
      labels: [
        {
          attrs: {
            text: {
              text: `type goes here`,
              fontFamily: 'sans-serif',
              fontSize: 10
            },
            rect: {
              fillOpacity: 0.9
            }
          },
          position: {
            args: {
              keepGradient: true,
              ensureLegibility: true
            }
          }
        }
      ]
    }),
    //
    defaultConnectionPoint: { name: 'anchor' },
    defaultAnchor: (view, magnet, ...rest) => {
      const group = view.findAttribute('port-group', magnet)
      const anchorFn = group === 'in' ? joint.anchors.left : joint.anchors.right
      return anchorFn(view, magnet, ...rest)
    },
    defaultConnector: {
      name: 'curve',
      args: {
        sourceDirection: joint.connectors.curve.TangentDirections.RIGHT,
        targetDirection: joint.connectors.curve.TangentDirections.LEFT
      }
    },
    defaultRouter: {
      name: 'normal',
      args: {
        padding: 100
      }
    },

    clickThreshold: 10,
    magnetThreshold: 'onleave',

    highlighting: {
      connecting: {
        name: 'mask',
        options: {
          layer: joint.dia.Paper.Layers.BACK,
          attrs: {
            stroke: '#0057FF',
            'stroke-width': 3
          }
        }
      }
    },

    // Controls which link connections can be made
    validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
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

    // decide whether to create a link if the user clicks a magnet
    validateMagnet: function(cellView, magnet) {
      // Prevent links from ports that already have a link
      const port = magnet.getAttribute('port')
      const links = graph.getConnectedLinks(cellView.model, {
        outbound: true,
        inbound: true
      })

      const portLinks = _.filter(links, function(o) {
        return o.get('source').port == port || o.get('target').port == port
      })
      if (portLinks.length > 0) return false

      // Note that this is the default behaviour. Just showing it here for reference.
      // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
      return magnet.getAttribute('magnet') !== 'passive'
    }
  })

  // paper.options.interactive = { touch: 'pan' }

  console.log('Initializing building blocks')
  graph.addCells(blocks.value.map((block) => block.buildingShape))
  console.log('Building blocks initialized, count: ', graph.getElements().length)
  if (blocks.value.length !== graph.getElements().length) {
    console.error('Building blocks count mismatch')
  }

  console.log('Initializing links')
  method.value?.connections.forEach((connection) => {
    const link = new joint.shapes.standard.DoubleLink({
      source: { id: connection.from_method_block_id, port: connection.from_port_id },
      target: { id: connection.to_method_block_id, port: connection.to_port_id },
      // router: { name: 'manhattan', args: { padding: 20 } },
      // connector: { name: 'jumpover' },
      attrs: {
        line: {
          stroke: '#fff',
          strokeWidth: 14,
          targetMarker: null
        },
        outline: {
          strokeWidth: 18
        }
      },
      labels: [
        {
          attrs: {
            text: {
              text: `type goes here`,
              fontFamily: 'sans-serif',
              fontSize: 10
            },
            rect: {
              fillOpacity: 0.9
            }
          },
          position: {
            args: {
              keepGradient: true,
              ensureLegibility: true
            }
          }
        }
      ]
    })
    graph.addCell(link)
    link.toBack()
  })

  console.log('Links initialized, count: ', graph.getLinks().length)

  // Register events
  paper.on('link:mouseenter', (linkView) => {
    showLinkTools(linkView)
  })

  paper.on('blank:pointerdown', function(event, x, y) {
    console.log('cloick')

    if (!paper) return

    // we need to use the offset to local point function because x and y
    // are always related to grid size

    const coords = offsetToLocalPoint(
      event.originalEvent.offsetX,
      event.originalEvent.offsetY,
      paper
    )

    const scale = paper.scale().sx

    dragStartPosition = { x: coords.x * scale, y: coords.y * scale }
  })

  paper.on('cell:pointerup blank:pointerup', function() {
    dragStartPosition = null
  })

  paper.on('link:mouseleave', (linkView) => {
    linkView.removeTools()
  })

  paper.on('element:mouseenter', (elementView) => {
  })

  paper.on('element:mouseleave', (elementView) => {
    // elementView.removeTools()
  })

  paper.on('element:pointerdown', (elementView) => {
    console.log('Element pointer down')

    const position = elementView.model.getBBox()

    elementDragStartPosition = { x: position.x, y: position.y }
    console.log('Start drag')
  })

  paper.on('element:pointerdblclick', (elementView) => {
    const block = blocks.value.find((block) => block.id === elementView.model.id)
    if (!block) return
    inspectBlock.value = block
    // const asset = templateAssets.value.find((asset) => asset.block.id === block.block_id)
    // if (!asset) return
    // router.push({
    //   name: 'method',
    //   params: {
    //     project: route.value.params.project as string,
    //     method: block.block_id as string
    //   }
    // })
  })

  paper.on('element:pointerup', (elementView) => {
    if (!elementDragStartPosition) throw new Error('Element drag start position not set')

    const position = elementView.model.getBBox()

    if (elementDragStartPosition.x === position.x && elementDragStartPosition.y === position.y) {
      console.log('Element not moved')
      if (highlightElement) {
        if (highlightElement.model.id === elementView.model.id) {
          console.log('Element already selected, deselecting')
          unselectElement(elementView)
        } else {
          console.log('Another element selected, deselecting')
          unselectElement(elementView)
          selectElement(elementView)
        }
      } else {
        console.log('Selecting element')
        selectElement(elementView)
      }
    } else {
      console.log('Element moved')
      undoStack.push({
        type: 'elementMove',
        id: elementView.model.id,
        x: position.x,
        y: position.y,
        dx: position.x - elementDragStartPosition.x,
        dy: position.y - elementDragStartPosition.y
      })
    }
  })

  graph.on('change:position', function(cell: any) {
    console.log('Position changed')

    // block position changed
    // reroute links
    graph.getLinks().forEach((link) => {
      link.findView(paper).requestConnectionUpdate()
    })
    const position = cell.getBBox()

    useRepo(Block).save({
      id: cell.id,
      x: position.x,
      y: position.y
    })
  })

  graph.on('change:source change:target', function(link: any) {
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

  graph.on('remove', function(cell: any) {
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
        console.log(localMousePosition)

        if (!localMousePosition) throw new Error('Local mouse position not set')
        // Open modal at mouse position
        blocksModalPosition.value = {
          x: localMousePosition.x,
          y: localMousePosition.y
        }
        blocksSearch.value = ''
        blocksModalOpen.value = true
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
          distance: '95%',
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
