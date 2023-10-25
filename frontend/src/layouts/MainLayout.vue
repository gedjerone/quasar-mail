<template>
  <q-layout view="lHh Lpr lFf">
    <top-menu
      :searchState="searchState"
      @update="updateSearchState"
      @toggle="toggleLeftDrawer"
    />
    <left-menu
      :miniState="miniState"
      :mailType="mailType"
      @sort="updateMailType"
    />
    <q-btn
      round
      color="primary"
      icon="fa-solid fa-pencil"
      style="position: fixed; right: 100px; bottom: 100px; z-index: 10"
      @click="updateSendMessageState"
    />
    <new-message-dialog
      :sendMessageState="sendMessageState"
      @update="updateSendMessageState"
      title="New Message"
      type="create"
    />
    <q-page-container>
      <router-view :mailTypeSort="mailType" :searchValue="searchState" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import NewMessageDialog from "components/NewMessageDialog.vue";
import LeftMenu from "components/LeftMenu.vue";
import TopMenu from "components/TopMenu.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    LeftMenu,
    NewMessageDialog,
    TopMenu,
  },

  setup() {
    const miniState = ref(false);
    const searchState = ref("");
    const mailType = ref("inbox");
    const sendMessageState = ref(false);

    return {
      miniState,
      searchState,
      mailType,
      sendMessageState,
      toggleLeftDrawer() {
        miniState.value = !miniState.value;
      },
      updateMailType(value) {
        mailType.value = value;
      },
      updateSearchState(value) {
        searchState.value = value;
      },
      updateSendMessageState() {
        sendMessageState.value = !sendMessageState.value;
      },
    };
  },
});
</script>
