<template>
<div id="app">
    <GetActivity msg="Welcome to Your Vue.js App" />
</div>
</template>

<script>
import GetActivity from './components/GetActivity.vue'

export default {
    name: 'App',
    components: {
        GetActivity
    }
}
</script>

<style>
#app {
    font-family: sans-serif;
    color: #656565;
    font-size: .875rem;
    line-height: 1.4;
    text-align: center;
    margin-top: 60px;
}
</style>
