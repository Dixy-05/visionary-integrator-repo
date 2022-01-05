<template lang='pug'>
  div
    nav.navbar.header.has-shadow.is-base(role='navigation' aria-label='main navigation')
      .navbar-brand
        a.navbar-item(href='/')
          b-icon(icon="home")
    .container
        .card
          header.card-header
            p.card-header-title
              h1.mainTitle(class="mr-6") Visionary or Integrator ?

    nuxt
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
