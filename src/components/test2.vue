<script lang="coffee">
export default
  data:
    -> {
      foo: 'bar what? aldkjashdlkjasdsadsadsad'
    }
</script>

<template lang="pug">
.example
  p line 1
  p line 2
  | <%- require('markup-elements/button.pug')({foo: 'buttonnewcontent'}) %>
</template>

<style lang="sass">
$color: yellow
html
  div
    .example,
    .button
      color: $color
</style>
