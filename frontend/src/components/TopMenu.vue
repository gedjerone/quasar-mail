<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> QMail </q-toolbar-title>
      <q-input
        rounded
        placeholder="Search mail"
        :modelValue="searchState"
        @update:model-value="changeSearchState"
        debounce="300"
        class="searchInput"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0"></div>
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="clearSearch" />
        </template>
      </q-input>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopMenu",
  props: {
    searchState: {
      type: String,
      required: true,
    },
  },
  emits: ["update", "toggle"],
  setup(props, { emit }) {
    return {
      changeSearchState(value) {
        emit("update", value);
      },
      clearSearch() {
        emit("update", "");
      },
      toggleLeftDrawer() {
        emit("toggle");
      },
    };
  },
});
</script>

<style>
.searchInput {
  background-color: white;
  border-radius: 24px;
  min-width: 24rem;
}
.searchInput .q-field__inner {
  padding: 0 1rem;
}
.searchInput .q-field__control {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.searchInput .q-field__control,
.q-field__prepend,
.q-field__append,
.q-field__control-container {
  height: fit-content !important;
}
</style>
