<template>
  <div class="flex flex-col items-center justify-center">
    <h1>404</h1>
    <p>Page not found</p>
    <button @click="$router.push({ name: 'hub' })" class="button py-3 px-5">
        Go to Hub
    </button>
  </div>
</template>
