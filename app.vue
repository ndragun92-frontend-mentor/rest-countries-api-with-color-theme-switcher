<template>
  <NuxtLayout>
    <Html lang="en" :data-route-path="$route?.path">
      <Head>
        <Title
          >Frontend Mentor | REST Countries API with color theme switcher</Title
        >
        <Meta name="language" content="en" />
        <Meta
          name="og:title"
          content="Frontend Mentor | REST Countries API with color theme switcher"
        />
        <Meta
          name="twitter:title"
          content="Frontend Mentor | REST Countries API with color theme switcher"
        />
        <Meta
          name="description"
          content="Challenge is to integrate with the REST Countries API to pull country data and display it like in the designs"
        />
        <Meta
          name="og:description"
          content="Challenge is to integrate with the REST Countries API to pull country data and display it like in the designs"
        />
        <Meta
          name="twitter:description"
          content="Challenge is to integrate with the REST Countries API to pull country data and display it like in the designs"
        />
        <Meta name="og:image" content="/favicon.png" />
        <Meta name="twitter:image" content="/favicon.png" />
        <Meta name="og:site_name" content="/favicon.png" />
        <Meta name="twitter:site" content="/favicon.png" />
        <Meta name="url" :content="`${nuxtApp?.$app_origin}${$route?.path}`" />
        <Meta
          name="og:url"
          :content="`${nuxtApp?.$app_origin}${$route?.path}`"
        />
        <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Link rel="apple-touch-icon" type="image/png" href="/favicon.png" />
        <Link rel="apple-touch-startup-image" href="/favicon.png" />
      </Head>
    </Html>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp();
</script>
