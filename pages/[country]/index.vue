<template>
  <div class="my-[40px] md:my-[80px]">
    <div class="container">
      <header>
        <div>
          <button
            type="button"
            class="inline-flex items-center align-center gap-[10px] shadow-md bg-primary-darkTextLightEl dark:bg-primary-darkEl pl-[32px] pr-[40px] py-[8px] rounded-lg hover:-translate-y-1 hover:text-blue-500 duration-200"
            @click="$router.back()"
          >
            <Icon size="20" name="teenyicons:arrow-left-solid" />
            <span>Back</span>
          </button>
        </div>
      </header>
      <main
        class="flex items-center gap-[40px] mt-[80px] md:gap-[80px] flex-col md:flex-row"
      >
        <template v-if="country">
          <div class="flex-1">
            <img
              class="block w-full max-w-[560px] h-[300px] md:h-[400px] object-cover"
              :src="country?.flags?.svg"
              :alt="country?.name"
            />
          </div>
          <div class="flex-1">
            <h1
              class="mb-[24px] font-extrabold text-[30px] tracking-[0.5px]"
              v-text="country?.name"
            />
            <div
              class="flex justify-between flex-col lg:flex-row gap-[32px] lg:gap-0"
            >
              <div class="flex flex-col gap-[8px]">
                <div>
                  <strong class="font-semibold tracking-[-0px]"
                    >Native Name:
                  </strong>
                  <span class="tracking-[0px]" v-text="country?.nativeName" />
                </div>
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
                    >Sub Region:
                  </strong>
                  <span class="tracking-[0px]" v-text="country?.subregion" />
                </div>
                <div>
                  <strong class="font-semibold tracking-[-0px]"
                    >Capital:
                  </strong>
                  <span class="tracking-[0px]" v-text="country?.capital" />
                </div>
              </div>
              <div class="flex flex-col gap-[8px]">
                <div>
                  <strong class="font-semibold tracking-[-0px]"
                    >Top Level Domain:
                  </strong>
                  <span
                    class="tracking-[0px]"
                    v-text="country?.topLevelDomain?.join(', ')"
                  />
                </div>
                <div>
                  <strong class="font-semibold tracking-[-0px]"
                    >Currencies:
                  </strong>
                  <span
                    class="tracking-[0px]"
                    v-text="
                      country?.currencies
                        ?.map((currency) => currency.name)
                        ?.join(', ')
                    "
                  />
                </div>
                <div>
                  <strong class="font-semibold tracking-[-0px]"
                    >Languages:
                  </strong>
                  <span
                    class="tracking-[0px]"
                    v-text="
                      country?.languages
                        ?.map((language) => language.name)
                        ?.join(', ')
                    "
                  />
                </div>
              </div>
            </div>
            <div
              v-if="country?.borders?.length"
              class="mt-[72px] flex gap-[14px] flex flex-col lg:flex-row"
            >
              <label
                class="font-semibold tracking-[-0px] whitespace-nowrap"
                for="borderCountries"
                >Border Countries:</label
              >
              <ul class="flex flex-wrap gap-[10px]">
                <li v-for="border in country?.borders" :key="border">
                  <nuxt-link
                    class="bg-primary-darkTextLightEl dark:bg-primary-darkEl px-[28px] py-[4px] rounded-md shadow tracking-[-1px] hover:text-blue-500 duration-200"
                    :to="`/${returnCountryName(border)}`"
                    >{{ returnCountryName(border) }}</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else> Country name is incorrect </template>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageCountryDetails",
};
</script>

<script lang="ts" setup>
import numberWithCommas from "~/utils/DataFormat";

const route = useRoute();
import countriesJSON from "../../assets/json/countries.json";

const countryName = computed<string>(() => route.params.country as string);

const { data: country } = await useAsyncData<any>(
  countryName.value,
  async (nuxtApp) => {
    if (nuxtApp?.payload?.data && nuxtApp?.payload?.data[countryName.value]) {
      return nuxtApp!.payload.data[countryName.value];
    }
    return await $fetch(`/api/countries?name=${route.params.country}`);
  }
);

const formatNumber = (x) => numberWithCommas(x);

const returnCountryName = (border) => {
  return (
    countriesJSON.find((country) => country.code === border)?.name || border
  );
};
</script>
