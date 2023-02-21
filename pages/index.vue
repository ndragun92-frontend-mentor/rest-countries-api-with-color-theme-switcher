<template>
  <main class="py-[48px]">
    <header
      class="container flex items-center justify-between gap-6 sm:gap-4 flex-col sm:flex-row"
    >
      <div class="w-full">
        <div
          class="relative w-full bg-primary-darkTextLightEl dark:bg-primary-darkEl shadow-md max-w-[480px] h-[56px] rounded-md"
        >
          <div
            class="absolute top-0 left-[28px] bottom-0 flex items-center pointer-events-none"
          >
            <Icon size="24" name="material-symbols:search" />
          </div>
          <input
            v-model.trim="keyword"
            class="text-sm w-full h-full bg-transparent pl-[74px] tracking-[0.1px]"
            type="text"
            placeholder="Search for a country..."
          />
          <transition-fade>
            <button
              v-if="region"
              class="absolute right-0 top-[calc(100%+10px)] sm:left-0 sm:right-[initial] bg-blue-500 hover:bg-red-500 duration-200 text-white font-semibold py-1 px-3 rounded shadow text-sm flex items-center gap-1"
              @click="region = ''"
            >
              <span v-text="region" />
              <Icon size="16" name="material-symbols:close" />
            </button>
          </transition-fade>
        </div>
      </div>
      <div class="w-full">
        <div
          ref="dropdown"
          class="relative w-full bg-primary-darkTextLightEl dark:bg-primary-darkEl shadow-md max-w-[200px] h-[56px] rounded-md sm:ml-auto"
        >
          <button
            class="w-full h-full flex items-center justify-between px-[24px] tracking-[-0.8px]"
            type="button"
            @click="showRegionDropdown = !showRegionDropdown"
          >
            Filter by Region
            <span
              class="absolute top-0 right-[14px] bottom-0 flex items-center"
            >
              <Icon
                class="duration-200"
                size="20"
                name="material-symbols:keyboard-arrow-down"
                :class="{
                  'rotate-180': showRegionDropdown,
                }"
              />
            </span>
          </button>
          <transition-slide>
            <div
              v-if="showRegionDropdown"
              aria-label="Region dropdown"
              class="absolute top-[calc(100%+5px)] left-0 right-0 bg-primary-darkTextLightEl dark:bg-primary-darkEl shadow-md rounded-md"
            >
              <ul class="dropdown__menu">
                <li
                  v-for="countryRegion in returnCountryRegions"
                  :key="countryRegion"
                  :aria-label="`Select region ${countryRegion}`"
                  :class="{ 'text-green-500': region === countryRegion }"
                  @click="onFilterByRegion(countryRegion)"
                  v-text="countryRegion"
                />
              </ul>
            </div>
          </transition-slide>
        </div>
      </div>
    </header>
    <section class="container pt-[48px]">
      <ul
        v-if="returnFilteredData.length"
        class="grid grid-cols-1 gap-[50px] sm:grid-cols-2 sm:gap-[50px] md:grid-cols-3 md:gap-[50px] xl:grid-cols-4 xl:gap-[75px]"
      >
        <li
          v-for="country in returnFilteredData.slice(0, endLoad)"
          :key="country.name"
          class="rounded-md overflow-hidden bg-primary-darkTextLightEl dark:bg-primary-darkEl shadow-md"
        >
          <nuxt-link
            :to="`/${country.name}`"
            class="block hover:-translate-y-2 duration-200"
          >
            <div
              class="w-full h-[220px] sm:h-[160px] bg-primary-lightBg dark:bg-primary-darkBg"
            >
              <img
                class="block w-full h-full object-cover"
                :src="country?.flags?.svg"
                :alt="country?.name"
              />
            </div>
            <div class="p-[24px]">
              <h3
                class="font-extrabold text-[18px] tracking-[-0.1px]"
                v-html="highlightTag(country?.name)"
              />
              <div
                class="mt-[12px] pb-[16px] text-[14px] flex flex-col gap-[3px]"
              >
                <div>
                  <strong class="font-semibold tracking-[-0px]"
                    >Population:
                  </strong>
                  <span
                    class="tracking-[0px]"
                    v-text="formatNumber(country?.population)"
                  />
                </div>
                <div>
                  <strong class="font-semibold tracking-[-0px]"
                    >Region:
                  </strong>
                  <span class="tracking-[0px]" v-text="country?.region" />
                </div>
                <div>
                  <strong class="font-semibold tracking-[-0px]"
                    >Capital:
                  </strong>
                  <span class="tracking-[0px]" v-text="country?.capital" />
                </div>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <div v-else>No matching results</div>
      <client-only>
        <el-infinite-load @load-data="onLoadMore" />
      </client-only>
    </section>
  </main>
</template>

<script lang="ts">
export default {
  name: "PageHomepage",
};
</script>

<script lang="ts" setup>
import escapeRegExp from "lodash-es/escapeRegExp";
import numberWithCommas from "~/utils/DataFormat";
const endLoad = ref(8);

const dropdown = ref<HTMLElement | null>(null);

const { data: countries } = await useFetch("/api/countries", {
  transform: (res: any) => {
    return res.data.map((country) => {
      const { name, population, region, capital, flags } = country;
      return {
        name,
        population,
        region,
        capital,
        flags,
      };
    });
  },
});

const keyword = ref("");
const showRegionDropdown = ref(false);
const region = ref("");
const returnFilteredData = computed(() => {
  let data = countries.value || [];
  if (region.value) {
    data = data.filter((country) => country.region === region.value);
  }
  if (keyword.value) {
    return data.filter((country) => {
      return (
        country.name.toLowerCase().indexOf(keyword.value.toLowerCase()) > -1
      );
    });
  }
  return data;
});

const returnCountryRegions = computed(() => {
  const data = countries.value || [];
  return [...new Set(data.map((country) => country.region))];
});

const highlightTag = (text: string): string => {
  return text.replace(
    new RegExp(escapeRegExp(keyword.value), "gi"),
    (match) => {
      return '<span class="highlighted__text">' + match + "</span>";
    }
  );
};

const onFilterByRegion = (selectedRegion) => {
  if (region.value === selectedRegion) {
    region.value = "";
  } else {
    region.value = selectedRegion;
  }
};

onClickOutside(dropdown, () => {
  showRegionDropdown.value = false;
});

const onLoadMore = async ($state) => {
  if (endLoad.value >= countries.value?.length) {
    $state.complete();
  } else {
    endLoad.value += 8;
    $state.loaded();
  }
};

const formatNumber = (x) => numberWithCommas(x);
</script>

<style lang="scss" scoped>
.dropdown__menu {
  @apply py-[11px];
  li {
    @apply px-[24px] py-[3.5px] text-[14px] font-semibold tracking-[-0.1px] hover:bg-green-300 hover:bg-opacity-20 cursor-pointer;
  }
}
</style>

<style>
.highlighted__text {
  @apply bg-blue-300 dark:bg-green-600;
}
</style>
