<template>
  <div class="flex flex-col gap-2.5 py-5 px-2.5">
    <div class="flex flex-col gap-2.5 p-2.5">
      <header class="h-12 font-header text-3xl font-bold text-pink">Endpoints</header>
      <table class="table-fixed border-collapse border border-border rounded">
        <tr class="bg-background-300 border border-border">
          <th>Endpoint</th>
          <th>Logic method</th>
          <th>Type</th>
          <th>Middlewares</th>
        </tr>
        <tr class="bg-background-400 border border-border">
          <td>GET /users</td>
          <td>Get users</td>
          <td>API</td>
          <td>1</td>
        </tr>
        <tr class="bg-background-400 border border-border">
          <td>GET /users/{user}</td>
          <td>Get user by id</td>
          <td>API</td>
          <td>2</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
th,
td {
  text-align: left;
  padding: 10px 12px;
}
</style>
