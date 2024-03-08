<template>
  <table class="w-full table-fixed border-separate border border-border">
    <tr class="bg-background-300 border border-border rounded-t-lg">
      <slot name="headers"></slot>
    </tr>
    <slot name="main"></slot>
  </table>
</template>
