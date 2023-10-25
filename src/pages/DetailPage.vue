<template>
  <div class="q-pa-md row items-center q-gutter-md">
    <q-card class="my-card" flat style="width: 100vw">
      <q-card-section>
        <q-btn
          flat
          round
          icon="fa-solid fa-left-long"
          class="absolute text-grey"
          style="top: 10px; right: 10px; font-weigth: 400"
          @click="$router.push('/')"
        />
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">Email</div>
        </div>
      </q-card-section>

      <div v-if="getCurrentEmail(getCurrentId($router))">
        <q-card-section>
          <div class="text-caption">
            <span
              >from:&nbsp;
              {{ getCurrentEmail(getCurrentId($router)).from }}
            </span>
            &nbsp;/&nbsp;
            <span
              >to:&nbsp;
              {{ getCurrentEmail(getCurrentId($router)).to }}
            </span>
            &nbsp;/&nbsp;
            <span>
              {{ getCurrentEmail(getCurrentId($router)).date }}
            </span>
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ getCurrentEmail(getCurrentId($router)).subject }}
          </div>
          <div class="text-grey">
            {{ getCurrentEmail(getCurrentId($router)).body }}
          </div>
        </q-card-section>

        <q-card-actions
          v-if="getCurrentEmail(getCurrentId($router)).type === 'drafts'"
        >
          <q-btn
            flat
            dense
            color="primary"
            icon-right="fa-solid fa-pencil"
            label="Edit"
            @click="updateSendMessageState"
          />
          <q-btn
            flat
            dense
            color="primary"
            icon-right="fa-solid fa-share"
            label="Send"
            @click="
              emailsStore
                .sendEmail(getCurrentId($router))
                .then(() => emailsStore.fetchEmails())
                .catch((err) => console.error(err))
            "
          />
          <new-message-dialog
            :sendMessageState="sendMessageState"
            @update="updateSendMessageState"
            title="Edit draft"
            type="edit"
            :emailId="getCurrentId($router)"
          />
        </q-card-actions>
      </div>

      <q-card-section v-else>
        <div class="text-h5">
          Email with id: {{ getCurrentId($router) }} not found
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useEmailsStore } from "../stores/emails-store";
import NewMessageDialog from "src/components/NewMessageDialog.vue";

const emailsStore = useEmailsStore();

export default defineComponent({
  name: "DetailPage",
  components: {
    NewMessageDialog,
  },
  setup() {
    const getCurrentId = (router) => router.currentRoute.value.params?.id;
    const getCurrentEmail = emailsStore.getCurrentEmail;
    const sendMessageState = ref(false);

    return {
      emailsStore,
      sendMessageState,
      getCurrentId,
      getCurrentEmail,
      updateSendMessageState() {
        sendMessageState.value = !sendMessageState.value;
      },
    };
  },
});
</script>

<style scoped>
.q-page-container {
  display: flex !important;
  align-items: center;
  justify-content: center;
}
.q-pa-md {
  width: auto !important;
}
</style>
