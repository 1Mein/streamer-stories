<template>
  <div class="home-background" aria-hidden="true">
    <div class="home-background-ray home-background-ray--one" />
    <div class="home-background-ray home-background-ray--two" />
    <div class="home-background-ray home-background-ray--three" />
    <div class="home-background-ray home-background-ray--four" />
  </div>
</template>

<style scoped>
.home-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  contain: paint;
}

.home-background-ray {
  position: absolute;
  width: 150vw;
  height: 12rem;
  left: -25vw;
  border-radius: 999px;
  filter: blur(34px);
  opacity: .34;
  will-change: transform;
}

.home-background-ray--one {
  top: 12%;
  background: linear-gradient(90deg, transparent 8%, #f5d9e96b 38%, #ffffff66 50%, #d9c7ff4d 62%, transparent 88%);
  transform: rotate(-18deg);
  animation: ray-drift-one 34s ease-in-out infinite alternate;
}

.home-background-ray--two {
  top: 36%;
  opacity: .28;
  background: linear-gradient(90deg, transparent 6%, #d7ccfa70 36%, #ffffff55 51%, #c7b7f05c 66%, transparent 90%);
  transform: rotate(13deg);
  animation: ray-drift-two 42s ease-in-out infinite alternate;
}

.home-background-ray--three {
  top: 62%;
  opacity: .25;
  background: linear-gradient(90deg, transparent 12%, #f6e7c966 40%, #ffffff4d 53%, #e8c8dc4d 68%, transparent 88%);
  transform: rotate(-9deg);
  animation: ray-drift-three 38s ease-in-out infinite alternate;
}

.home-background-ray--four {
  top: 82%;
  opacity: .2;
  background: linear-gradient(90deg, transparent 4%, #e2d9fa5c 35%, #ffffff42 56%, #c9b8f04d 70%, transparent 92%);
  transform: rotate(17deg);
  animation: ray-drift-four 46s ease-in-out infinite alternate;
}

@keyframes ray-drift-one {
  from { transform: translate3d(-7%, -5%, 0) rotate(-18deg) scale(.94); }
  to { transform: translate3d(8%, 7%, 0) rotate(-12deg) scale(1.08); }
}

@keyframes ray-drift-two {
  from { transform: translate3d(8%, 3%, 0) rotate(13deg) scale(1.06); }
  to { transform: translate3d(-9%, -6%, 0) rotate(8deg) scale(.92); }
}

@keyframes ray-drift-three {
  from { transform: translate3d(-5%, 4%, 0) rotate(-9deg) scale(.96); }
  to { transform: translate3d(10%, -5%, 0) rotate(-3deg) scale(1.08); }
}

@keyframes ray-drift-four {
  from { transform: translate3d(7%, -3%, 0) rotate(17deg) scale(1.02); }
  to { transform: translate3d(-8%, 6%, 0) rotate(22deg) scale(.9); }
}

@media (max-width: 767px) {
  .home-background-ray { width: 220vw; left: -60vw; filter: blur(24px); }
}

@media (prefers-reduced-motion: reduce) {
  .home-background-ray { animation: none; transform: none; }
}
</style>
