<template>
  <div class="loadingSpinnerBall">
    <div class="ball">
      <div></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes ball {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.45, 0, 0.9, 0.55);
  }
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 54px);
    animation-timing-function: cubic-bezier(0, 0.45, 0.55, 0.9);
  }
  100% {
    transform: translate(0, 0);
  }
}

.ball div {
  position: absolute;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: #e15b64;
  left: 37px;
  top: 10px;
  animation: ball 1s linear infinite;
}
.loadingSpinnerBall {
  position: absolute;
  top: 10px;
  right: 15px;
  width: 54px;
  height: 44px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
}
.ball {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.34);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ball div {
  box-sizing: content-box;
}
</style>
