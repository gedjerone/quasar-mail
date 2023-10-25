<template>
  <q-drawer :mini="miniState" show-if-above>
    <q-list>
      <q-item-label header> QMail </q-item-label>
      <EssentialLink
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
        @click="
          {
            sortEmails(link.mailType);
            $router.push(`/`);
          }
        "
      />
    </q-list>
  </q-drawer>
</template>
<script>
import { defineComponent } from "vue";
import EssentialLink from "./EssentialLink.vue";

const linksList = [
  {
    title: "Inbox",
    icon: "fa-solid fa-inbox",
    mailType: "inbox",
  },
  {
    title: "Drafts",
    icon: "fa-regular fa-file",
    mailType: "drafts",
  },
  {
    title: "Sent",
    icon: "fa-solid fa-paper-plane",
    mailType: "sent",
  },
];

export default defineComponent({
  name: "LeftMenu",
  components: {
    EssentialLink,
  },
  props: {
    mailType: {
      type: String,
      required: true,
    },
    miniState: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["sort"],
  setup(props, { emit }) {
    return {
      essentialLinks: linksList,
      sortEmails(value) {
        emit("sort", value);
      },
    };
  },
});
</script>
