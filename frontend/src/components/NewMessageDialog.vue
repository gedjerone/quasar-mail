<template>
  <q-dialog
    :modelValue="sendMessageState"
    @update:model-value="updateSendMessageState"
  >
    <q-card class="my-card" style="width: 80vw">
      <q-card-section>
        <q-btn
          flat
          round
          icon="fa-solid fa-xmark"
          class="absolute"
          style="top: 10px; right: 10px"
          v-close-popup
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ title }}</div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          ></div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="stateTo"
            label="To"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'This field required']"
          />

          <q-input filled v-model="stateSubject" label="Subject" />

          <q-input
            filled
            v-model="stateBody"
            label="Body"
            autogrow
            style="
              max-height: 20rem;
              overflow-y: auto;
              scrollbar-width: thin;
              scrollbar-color: blue;
            "
          />

          <q-separator />

          <q-btn
            flat
            color="primary"
            type="submit"
            label="Save to drafts"
            icon="fa-solid fa-download"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>

<script>
import { ref, defineComponent } from "vue";
import { useEmailsStore } from "../stores/emails-store";

const emailsStore = useEmailsStore();

export default defineComponent({
  name: "NewMessageDialog",
  props: {
    sendMessageState: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    emailId: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const stateTo = ref("");
    const stateSubject = ref("");
    const stateBody = ref("");
    const updateSendMessageState = () => {
      emit("update");
    };

    return {
      stateTo,
      stateSubject,
      stateBody,
      updateSendMessageState,
      onSubmit() {
        if (props.type === "create") {
          emailsStore
            .saveToDrafts(stateTo.value, stateSubject.value, stateBody.value)
            .then(() => emailsStore.fetchEmails())
            .catch((err) => console.error(err));
        }
        if (props.type === "edit") {
          emailsStore
            .updateCurrentDraft(
              props.emailId,
              stateTo.value,
              stateSubject.value,
              stateBody.value
            )
            .then(() => emailsStore.fetchEmails())
            .catch((err) => console.error(err));
        }
        updateSendMessageState();
        stateTo.value = "";
        stateSubject.value = "";
        stateBody.value = "";
      },
    };
  },
});
</script>
