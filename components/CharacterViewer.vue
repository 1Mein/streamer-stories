<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelPath?: string
}>(), {
  modelPath: '/models/serega-pirat.glb'
})

const canvas = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const failed = ref(false)
let cleanup: (() => void) | undefined

onMounted(async () => {
  if (!canvas.value) return

  const [{ AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer, Group }, { GLTFLoader }, { OrbitControls }] = await Promise.all([
    import('three'),
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    import('three/examples/jsm/controls/OrbitControls.js')
  ])

  const element = canvas.value
  const scene = new Scene()
  const camera = new PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 0, 10)

  const renderer = new WebGLRenderer({ canvas: element, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = 'srgb'

  scene.add(new AmbientLight('#d8c8ff', 2.2))
  const keyLight = new DirectionalLight('#ffffff', 3.4)
  keyLight.position.set(3, 5, 4)
  scene.add(keyLight)
  const rimLight = new DirectionalLight('#b77cff', 2.5)
  rimLight.position.set(-4, 2, -3)
  scene.add(rimLight)

  const modelRoot = new Group()
  modelRoot.position.set(0, 0, 0)
  modelRoot.rotation.set(0, 0, 0)
  scene.add(modelRoot)
  const controls = new OrbitControls(camera, element)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableRotate = false
  controls.minDistance = 2.5
  controls.maxDistance = 30
  controls.target.set(0, 1, 0)
  controls.autoRotate = false

  let dragging = false
  let previousPointerX = 0
  const onPointerDown = (event: PointerEvent) => {
    dragging = true
    previousPointerX = event.clientX
    element.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) return
    modelRoot.rotation.y += (event.clientX - previousPointerX) * 0.025
    previousPointerX = event.clientX
  }
  const onPointerUp = (event: PointerEvent) => {
    dragging = false
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId)
  }
  element.addEventListener('pointerdown', onPointerDown)
  element.addEventListener('pointermove', onPointerMove)
  element.addEventListener('pointerup', onPointerUp)
  element.addEventListener('pointercancel', onPointerUp)

  const resize = () => {
    const width = element.clientWidth
    const height = element.clientHeight
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(element.parentElement || element)
  resize()

  try {
    const gltf = await new GLTFLoader().loadAsync(props.modelPath)
    modelRoot.add(gltf.scene)
    gltf.scene.position.set(0, -1.05, 0)
    gltf.scene.scale.setScalar(2.2)
    loading.value = false
  } catch {
    failed.value = true
    loading.value = false
  }

  let frame = 0
  const render = () => {
    modelRoot.rotation.y += 0.012
    controls.update()
    renderer.render(scene, camera)
    frame = requestAnimationFrame(render)
  }
  render()

  cleanup = () => {
    cancelAnimationFrame(frame)
    resizeObserver.disconnect()
    controls.dispose()
    element.removeEventListener('pointerdown', onPointerDown)
    element.removeEventListener('pointermove', onPointerMove)
    element.removeEventListener('pointerup', onPointerUp)
    element.removeEventListener('pointercancel', onPointerUp)
    renderer.dispose()
    modelRoot.traverse((object) => {
      const mesh = object as { geometry?: { dispose: () => void }; material?: { dispose?: () => void } }
      mesh.geometry?.dispose()
      mesh.material?.dispose?.()
    })
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div class="relative h-64 w-64 overflow-hidden sm:h-80 sm:w-80">
    <canvas ref="canvas" class="h-full w-full cursor-grab touch-none active:cursor-grabbing" aria-label="Интерактивная 3D-модель" />
    <div v-if="loading" class="pointer-events-none absolute inset-0 grid place-items-center"><span class="mono text-center text-[9px] uppercase tracking-[.12em] text-[#b9a7df]">загрузка<br>модели…</span></div>
    <div v-if="failed" class="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center"><span class="mono text-[9px] uppercase tracking-[.12em] text-[#d8a7b7]">3D-модель временно недоступна</span></div>
    <span class="pointer-events-none absolute bottom-2 left-2 mono text-[8px] uppercase tracking-[.12em] text-[#8f83a5]">drag · orbit</span>
  </div>
</template>
