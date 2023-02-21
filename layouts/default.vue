<template>
  <nav class="h-20 shadow-md bg-primary-darkTextLightEl dark:bg-primary-darkEl">
    <div class="container h-full flex items-center justify-between gap-4">
      <div>
        <h1 class="font-extrabold text-2xl tracking-[-0.1px]">
          Where in the world?
        </h1>
      </div>
      <div>
        <client-only>
          <button
            class="font-semibold flex items-center gap-2"
            type="button"
            @click="onToggleTheme"
          >
            <Icon
              size="20"
              :name="`material-symbols:dark-mode${
                colorMode.value === 'dark' ? '' : '-outline'
              }`"
            />
            <span v-text="returnThemeName(colorMode.value)" />
          </button>
        </client-only>
      </div>
    </div>
  </nav>
  <slot />
</template>

<script lang="ts">
export default {
  name: "LayoutDefault",
};
</script>

<script lang="ts" setup>
const colorMode = useColorMode();
const onToggleTheme = () => {
  console.log("onToggleTheme", colorMode);
  switch (colorMode.value) {
    case "dark":
      colorMode.preference = "light";
      break;
    case "light":
      colorMode.preference = "dark";
      break;
  }
};

const returnThemeName = (theme: string) => {
  switch (theme) {
    case "dark":
      return "Light Mode";
    case "light":
      return "Dark Mode";
  }
  return "System mode";
};
</script>
