<template>
  <client-only>
    <infinite-loading @infinite="$emit('load-data', $event)">
      <template #spinner>
        <div class="spinner__infinite-load">
          <svg
            class="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </template>
      <template #complete>
        <div class="spinner__infinite-load--success">Loaded</div>
      </template>
      <template #error="{ retry }">
        <button class="spinner__infinite-load--error" @click="retry">
          Error. Click to retry.
        </button>
      </template>
    </infinite-loading>
  </client-only>
</template>

<script setup>
// DOC: https://vue3-infinite-loading.netlify.app/
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; //required if you're not going to override default slots
defineEmits(["load-data"]);
</script>
