<template lang='pug'>
  div
    nav.navbar.header.has-shadow.is-base(role='navigation' aria-label='main navigation')
      .navbar-brand
        a.navbar-item(href='/')
          h2 assessment
        .navbar-burger
          span
            span
              span
    .container
      nuxt
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
