<template>
  <div class="w-full h-full bg-slate-900">
    <div
      class="relative w-[54px] h-[54px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div class="bar bar1"></div>
      <div class="bar bar2"></div>
      <div class="bar bar3"></div>
      <div class="bar bar4"></div>
      <div class="bar bar5"></div>
      <div class="bar bar6"></div>
      <div class="bar bar7"></div>
      <div class="bar bar8"></div>
      <div class="bar bar9"></div>
      <div class="bar bar10"></div>
      <div class="bar bar11"></div>
      <div class="bar bar12"></div>
    </div>
  </div>
</template>
<style scoped>
.bar {
  position: absolute;
  width: 3px;
  height: 10px;
  background: #fff;
  left: 44.5%;
  top: 37%;
  border-radius: 12px;
  background-color: #fff;
  animation: fade 1s linear infinite;
}

@-webkit-keyframes fade {
  from {
    background: #fff;
  }
  to {
    background: #000;
  }
}
@keyframes fade {
  from {
    background: #fff;
  }
  to {
    background: #000;
  }
}

.bar1 {
  transform: rotate(-330deg) translate(0px, -142%);
  animation-delay: -0.916s;
}
.bar2 {
  transform: rotate(-300deg) translate(0px, -142%);
  animation-delay: -0.833s;
}
.bar3 {
  transform: rotate(-270deg) translate(0px, -142%);
  animation-delay: -0.75s;
}
.bar4 {
  transform: rotate(-240deg) translate(0px, -142%);
  animation-delay: -0.666s;
}
.bar5 {
  transform: rotate(-210deg) translate(0px, -142%);
  animation-delay: -0.583s;
}
.bar6 {
  transform: rotate(-180deg) translate(0px, -142%);
  animation-delay: -0.5s;
}
.bar7 {
  transform: rotate(-150deg) translate(0px, -142%);
  animation-delay: -0.416s;
}
.bar8 {
  transform: rotate(-120deg) translate(0px, -142%);
  animation-delay: -0.333s;
}
.bar9 {
  transform: rotate(-90deg) translate(0px, -142%);
  animation-delay: -0.25s;
}
.bar10 {
  transform: rotate(-60deg) translate(0px, -142%);
  animation-delay: -0.166s;
}
.bar11 {
  transform: rotate(-30deg) translate(0px, -142%);
  animation-delay: -0.083s;
}
.bar12 {
  transform: rotate(-0deg) translate(0px, -142%);
  animation-delay: 0s;
}
</style>
