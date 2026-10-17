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
    camera.position.set(0, 0, 10)
    const renderer = new THREE.WebGLRenderer({ canvas: element, antialias: true, alpha: true })
    cleanup = () => { disposeModel(scene); renderer.dispose() }
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    const controls = new OrbitControls(camera, element)
    cleanup = () => { controls.dispose(); disposeModel(scene); renderer.dispose() }
    controls.enableDamping = false
    controls.enablePan = false
    controls.enableRotate = false
    controls.minDistance = 2.5
    controls.maxDistance = 30
    controls.target.set(0, 1, 0)
    controls.update()
    scene.add(new THREE.AmbientLight('#d8c8ff', 2.2))
    const keyLight = new THREE.DirectionalLight('#ffffff', 3.4)
    keyLight.position.set(3, 5, 4)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight('#b77cff', 2.5)
    rimLight.position.set(-4, 2, -3)
    scene.add(rimLight)
    const modelRoot = new THREE.Group()
    scene.add(modelRoot)
    let visible = false
    let modelReady = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const canRender = () => !disposed && visible && !document.hidden
    const render = () => { if (canRender()) renderer.render(scene, camera) }
    const stopAnimation = () => { cancelAnimationFrame(animationFrame); animationFrame = 0 }
    const animate = () => {
      animationFrame = 0
      if (!canRender() || !modelReady || reducedMotion.matches) return
      modelRoot.rotation.y += 0.004
      render()
      animationFrame = requestAnimationFrame(animate)
    }
    const updateAnimation = () => {
      stopAnimation()
      render()
      if (canRender() && modelReady && !reducedMotion.matches) animationFrame = requestAnimationFrame(animate)
    }
    let dragging = false
    let previousPointerX = 0
    const onPointerDown = (event: PointerEvent) => {
      dragging = true
      previousPointerX = event.clientX
      element.setPointerCapture(event.pointerId)
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      modelRoot.rotation.y += (event.clientX - previousPointerX) * 0.0257
      previousPointerX = event.clientX
      render()
    }
    const onPointerUp = (event: PointerEvent) => {
      dragging = false
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId)
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
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateAnimation() })
    const onKey = (event: KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', '+', '-'].includes(event.key)) return
      event.preventDefault()
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') modelRoot.rotation.y += event.key === 'ArrowLeft' ? -0.15 : 0.15
      else {
        const offset = camera.position.clone().sub(controls.target)
        offset.multiplyScalar(event.key === '+' ? 0.9 : 1.1).clampLength(2.5, 30)
        camera.position.copy(controls.target).add(offset)
      }
      controls.update()
      render()
    }
    cleanup = () => {
      stopAnimation()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      controls.removeEventListener('change', render)
      controls.dispose()
      document.removeEventListener('visibilitychange', updateAnimation)
      reducedMotion.removeEventListener('change', updateAnimation)
      element.removeEventListener('keydown', onKey)
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerup', onPointerUp)
      element.removeEventListener('pointercancel', onPointerUp)
      disposeModel(scene)
      renderer.dispose()
    }
    controls.addEventListener('change', render)
    document.addEventListener('visibilitychange', updateAnimation)
    reducedMotion.addEventListener('change', updateAnimation)
    element.addEventListener('keydown', onKey)
    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerup', onPointerUp)
    element.addEventListener('pointercancel', onPointerUp)
    resizeObserver.observe(element)
    intersectionObserver.observe(element)
    resize()
    const gltf = await new GLTFLoader().loadAsync(props.modelPath)
    if (disposed) { disposeModel(gltf.scene); return }
    gltf.scene.position.set(0, -1.05, 0)
    gltf.scene.scale.setScalar(3.5)
    modelRoot.add(gltf.scene)
    modelReady = true
    loading.value = false
    updateAnimation()
  } catch {
    cleanup()
    cleanup = () => {}
    if (!disposed) { failed.value = true; loading.value = false }
  }
})
onBeforeUnmount(() => { disposed = true; cleanup() })
</script>

<template>
  <div class="relative h-64 w-64 overflow-hidden sm:h-80 sm:w-80">
    <canvas v-show="!failed" ref="canvas" tabindex="0" class="h-full w-full cursor-grab touch-none active:cursor-grabbing" aria-label="3D-модель: перетащите для вращения, стрелки влево и вправо поворачивают модель, плюс и минус меняют масштаб" />
    <div v-if="loading" role="status" class="pointer-events-none absolute inset-0 grid place-items-center"><span class="mono text-center text-[9px] uppercase tracking-[.12em] text-[#b9a7df]">загрузка<br>модели…</span></div>
    <div v-if="failed" role="alert" class="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center"><span class="mono text-[9px] uppercase tracking-[.12em] text-[#d8a7b7]">3D-модель временно недоступна</span></div>
    <span v-if="!loading && !failed" class="pointer-events-none absolute bottom-2 left-2 mono text-[8px] uppercase tracking-[.12em] text-[#8f83a5]">drag · orbit</span>
  </div>
</template>
