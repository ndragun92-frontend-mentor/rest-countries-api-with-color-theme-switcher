<template>
  <div>
    {{ $route.params?.country }}
    <pre>
      {{ country }}
    </pre>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageCountryDetails",
};
</script>

<script lang="ts" setup>
const route = useRoute();

const { data: country } = await useFetch(
  `/api/countries?name=${route.params.country}`,
  {
    pick: [
      "nativeName",
      "population",
      "region",
      "subregion",
      "capital",
      "topLevelDomain",
      "currencies",
      "languages",
      "borders",
    ],
  }
);
</script>
