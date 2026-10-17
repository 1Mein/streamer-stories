<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Object3D, Mesh, Texture } from 'three'
const props = withDefaults(defineProps<{ modelPath?: string }>(), { modelPath: '/models/serega-pirat.glb' })
const canvas = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const failed = ref(false)
let disposed = false
let cleanup = () => {}
let animationFrame = 0

function disposeModel(root: Object3D) {
  const textures = new Set<Texture>()
  root.traverse((object) => {
    const mesh = object as Mesh
    mesh.geometry?.dispose()
    const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : []
    materials.forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value && typeof value === 'object' && 'isTexture' in value) textures.add(value as Texture)
      })
      material.dispose()
    })
  })
  textures.forEach((texture) => texture.dispose())
}

onMounted(async () => {
  try {
    const [THREE, { GLTFLoader }, { OrbitControls }] = await Promise.all([
      import('three'), import('three/examples/jsm/loaders/GLTFLoader.js'), import('three/examples/jsm/controls/OrbitControls.js')
    ])
    if (disposed || !canvas.value) return
    const element = canvas.value
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
    camera.position.set(0, 1, 10)
    const renderer = new THREE.WebGLRenderer({ canvas: element, antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    // Register disposal before any further initialization or asynchronous load.
    cleanup = () => { disposeModel(scene); renderer.dispose() }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    const controls = new OrbitControls(camera, element)
    controls.enableDamping = false
    controls.enablePan = false
    controls.minDistance = 3
    controls.maxDistance = 15
    controls.minPolarAngle = Math.PI / 2
    controls.maxPolarAngle = Math.PI / 2
    controls.target.set(0, 1, 0)
    controls.update()
    scene.add(new THREE.AmbientLight('#ffffff', 2.2))
    const light = new THREE.DirectionalLight('#ffffff', 3.4)
    light.position.set(3, 5, 4)
    scene.add(light)
    let visible = true
    let model: Object3D | null = null
    let previousTimestamp = 0
    const render = () => { if (!disposed && visible && !document.hidden) renderer.render(scene, camera) }
    const animate = (timestamp: number) => {
      if (disposed) return
      if (visible && !document.hidden && model) {
        const elapsed = previousTimestamp ? Math.min((timestamp - previousTimestamp) / 1000, 0.05) : 0
        model.rotation.y += elapsed * 0.6
        render()
      }
      previousTimestamp = timestamp
      animationFrame = requestAnimationFrame(animate)
    }
    const resize = () => {
      const { clientWidth: width, clientHeight: height } = element
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      render()
    }
    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; render() })
    const onKey = (event: KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', '+', '-'].includes(event.key)) return
      event.preventDefault()
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') model && (model.rotation.y += event.key === 'ArrowLeft' ? -0.15 : 0.15)
      else camera.position.multiplyScalar(event.key === '+' ? 0.9 : 1.1)
      camera.position.clampLength(3, 15)
      controls.update()
      render()
    }
    cleanup = () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      controls.removeEventListener('change', render)
      controls.dispose()
      document.removeEventListener('visibilitychange', render)
      element.removeEventListener('keydown', onKey)
      cancelAnimationFrame(animationFrame)
      disposeModel(scene)
      renderer.dispose()
    }
    controls.addEventListener('change', render)
    document.addEventListener('visibilitychange', render)
    element.addEventListener('keydown', onKey)
    resizeObserver.observe(element)
    intersectionObserver.observe(element)
    resize()
    animationFrame = requestAnimationFrame(animate)
    const gltf = await new GLTFLoader().loadAsync(props.modelPath)
    if (disposed) { disposeModel(gltf.scene); return }
    model = gltf.scene
    model.position.set(0, -1.05, 0)
    model.scale.setScalar(4)
    scene.add(model)
    loading.value = false
    render()
  } catch {
    cleanup()
    cleanup = () => {}
    if (!disposed) { failed.value = true; loading.value = false }
  }
})
onBeforeUnmount(() => { disposed = true; cleanup() })
</script>

<template>
  <div class="fixed bottom-4 right-4 z-40 h-64 w-1/3 max-w-sm overflow-hidden sm:h-80 sm:w-[calc(100vw-2rem)]">
    <canvas v-show="!failed" ref="canvas" tabindex="0" class="h-full w-full cursor-grab touch-none active:cursor-grabbing" aria-label="3D-модель: перетащите для вращения, стрелки влево и вправо поворачивают модель, плюс и минус меняют масштаб" />
  </div>
</template>
