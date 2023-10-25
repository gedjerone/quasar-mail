<template>
  <q-page class="flex flex-center align-top">
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        :title="mailTypeSort"
        :rows="getRows.sort((a, b) => new Date(b.date) - new Date(a.date))"
        :columns="columns"
        row-key="id"
        virtual-scroll
        hide-header
        :rows-per-page-options="[10, 20, 35, 50, 0]"
      >
        <template v-slot:top>
          <q-btn
            icon="fa-solid fa-refresh"
            label=""
            @click="emailsStore.fetchEmails()"
          />
          <q-space style="flex-grow: 0.05 !important" />
          <q-btn
            icon="fa-solid fa-envelope"
            label="Get new emails"
            @click="
              console.log(
                emailsStore
                  .getNewEmails()
                  .then(() => emailsStore.fetchEmails())
                  .catch((err) => console.error(err))
              )
            "
          />
          <q-space style="flex-grow: 0.05 !important" />
          <q-btn
            icon="fa-solid fa-share"
            label="Send all drafts"
            @click="
              emailsStore
                .sendAllDrafts()
                .then(() => emailsStore.fetchEmails())
                .catch((err) => console.error(err))
            "
          />
        </template>
        <template v-slot:body="props">
          <q-tr
            :props="props"
            @click="
              {
                props.row.type === 'inbox' &&
                  emailsStore
                    .setReaded(props.row.id)
                    .then(() => emailsStore.fetchEmails())
                    .catch((err) => console.error(err));
                $router.push(`/mail/${props.row.id}`);
              }
            "
            :class="{
              readed: props.row.isReaded && props.row.type === 'inbox',
            }"
          >
            <q-td
              key="from"
              :props="props"
              style="font-weight: bold; text-align: left"
            >
              {{ props.row.type === "inbox" ? props.row.from : props.row.to }}
            </q-td>
            <q-td
              key="subject"
              :props="props"
              style="
                font-weight: bold;
                max-width: 10rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: left;
              "
            >
              {{ props.row.subject }}
            </q-td>
            <q-td
              key="body"
              :props="props"
              style="
                max-width: 10rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: left;
              "
            >
              {{ props.row.body }}
            </q-td>
            <q-td key="date" :props="props">
              {{ props.row.date }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, defineComponent, onMounted } from "vue";
import { useEmailsStore } from "../stores/emails-store";

const columns = [
  {
    name: "id",
    required: true,
    label: "Id",
    field: (row) => row.id,
  },
  {
    name: "from",
    required: true,
    label: "From",
    align: "left",
  },
  {
    name: "subject",
    align: "center",
    label: "Subject",
    field: "subject",
  },
  { name: "body", label: "Body", field: "body" },
  {
    name: "date",
    label: "Date",
    field: "date",
  },
  { name: "isReaded", label: "isReaded", field: "isReaded" },
];

const emailsStore = useEmailsStore();

export default defineComponent({
  name: "IndexPage",
  props: {
    mailTypeSort: {
      type: String,
      default: "inbox",
    },
    searchValue: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const selected = ref([]);

    const getRows = computed({
      get() {
        return [...emailsStore.getEmails.values()].filter((value) => {
          return value.type === props.mailTypeSort && isFilteredRow(value);
        });
      },
    });

    const isFilteredRow = (value) => {
      return (
        value.subject.toLowerCase().includes(props.searchValue.toLowerCase()) ||
        value.body.toLowerCase().includes(props.searchValue.toLowerCase()) ||
        value.from.toLowerCase().includes(props.searchValue.toLowerCase())
      );
    };

    onMounted(() => {
      emailsStore.fetchEmails();
    });

    return {
      selected,
      columns,
      getRows,
      emailsStore,
    };
  },
});
</script>

<style>
.q-pa-md {
  width: 100%;
}
.align-top {
  align-items: flex-start;
}
.readed {
  background-color: #edf3fd;
}
</style>
