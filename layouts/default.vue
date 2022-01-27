<template lang='pug'>
div
  nav.navbar.header.has-shadow.is-base(
    role='navigation',
    aria-label='main navigation'
  )
    .navbar-brand
      a.navbar-item(href='/')
        b-icon(icon='home')
        span.home Home
  .container
    .card
      header.card-header
        p.card-header-title
          h1.mainTitle.mr-6 Visionary or Integrator ?
  nuxt
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
<style scoped >
.home,
.mainTitle {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
}
.mainTitle {
  color: #882bb9;
  font-size: 3em;
}
</style>