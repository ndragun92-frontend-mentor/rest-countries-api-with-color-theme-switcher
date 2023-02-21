<template>
  <nav class="h-20 shadow-md bg-primary-darkTextLightEl dark:bg-primary-darkEl">
    <div class="container h-full flex items-center justify-between gap-4">
      <div>
        <h1 class="font-extrabold text-lg sm:text-2xl tracking-[-0.1px]">
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
            <span
              class="hidden sm:inline"
              v-text="returnThemeName(colorMode.value)"
            />
          </button>
        </client-only>
      </div>
    </div>
  </nav>
  <slot />
  <footer class="text-sm text-center md:text-left opacity-75 hover:opacity-100">
    <div class="p-3">
      Challenge by
      <a
        class="text-blue-500 hover:underline"
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        >Frontend Mentor</a
      >
      & Coded by
      <a
        class="text-blue-500 hover:underline"
        href="https://ndragun92.github.io/portfolio/"
        target="_blank"
        >Nemanja Dragun</a
      >
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: "LayoutDefault",
};
</script>

<script lang="ts" setup>
const colorMode = useColorMode();
const onToggleTheme = () => {
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
