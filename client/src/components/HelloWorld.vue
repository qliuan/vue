<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>This is a Vue.js App for GaTech CS 4400 2018 Spring</h2>
    <h2>Authors</h2>
    <ul>
      <li>
        <a
          href="https://github.com/qliuan"
          target="_blank"
        >
          Liu Qinhan
        </a>
      </li>
      <li>
        <a
          href="https://github.com/ShengruiLYU"
          target="_blank"
        >
          Lyu Shengrui
        </a>
      </li>
      <li>
        <a
          href="https://github.com/linxixiao"
          target="_blank"
        >
          Xiao Linxi
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Atlanta Farm, Garden and Orchard'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
