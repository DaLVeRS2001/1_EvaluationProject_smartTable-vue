<template>
  <div class="container">
    <button @click="$emit('getModeSelected', [smallUrl, 'small'])">
      32 Элемента
    </button>
    <button @click="$emit('getModeSelected', [bigUrl, 'big'])">
      1000 Элементов
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      smallUrl:
        "https://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
      bigUrl:
        "https://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.container button {
  margin: 10px;
  background: yellow;
  border-radius: 10px;
  max-width: 120px;
  width: 100%;
  height: 25px;
  cursor: pointer;
}
</style>
