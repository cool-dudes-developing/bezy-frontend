<template>
  <div class="container">
    <img class="logo" src="../assets/logo.png" alt="logo" />
    <div class="authBox"><router-view /></div>
    <p>Made with ♥ by Bezy</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 40px;
  position: relative;
}
.logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
}
.authBox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 30px;

  background: #3c1635;
  border-radius: 10px;
}
p {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
}
</style>
