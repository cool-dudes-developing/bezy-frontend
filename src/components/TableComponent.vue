<template>
  <table class="bg-transparent w-full table-fixed border-collapse border border-blue">
    <tr class="bg-transparent backdrop-brightness-75 drop-shadow-sm border border-blue rounded-t-lg">
      <slot name="headers"></slot>
    </tr>
    <slot name="main"></slot>
  </table>
</template>
