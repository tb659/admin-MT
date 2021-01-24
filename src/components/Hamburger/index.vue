<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <svg :class="{ 'is-active': !isActive }" class="hamburger" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <path d="M131.11 192.37m32.17 0l700.08 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-700.08 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z" fill="#ffffff" p-id="2584"></path><path d="M131.11 766.83m32.17 0l700.08 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-700.08 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z" fill="#ffffff" p-id="2585"></path><path d="M449.33 385.09m32.17 0l381.87 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-381.87 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z" fill="#ffffff" p-id="2586"></path><path d="M449.33 578.11m32.17 0l381.87 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-381.87 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z" fill="#ffffff" p-id="2587"></path><path d="M129.91 512.16L321.14 639.7V384.62L129.91 512.16z" fill="#ffffff" p-id="2588"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
