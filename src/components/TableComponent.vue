<template>
  <table class="w-full table-fixed border-separate border border-border rounded-lg">
    <tr class="bg-background-300 border border-border">
      <slot name="headers"></slot>
    </tr>
    <slot name="main"></slot>
  </table>
</template>
