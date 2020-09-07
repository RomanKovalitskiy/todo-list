<template>
  <v-autocomplete
    :value="value"
    :rules="nameRules"
    :items="listTags"
    chips
    color="blue-grey lighten-2"
    label="Tag"
    multiple
    @input="$emit('input', $event)"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="$emit('remove-tag', data.item)"
      >
        {{ data.item }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title v-html="data.item"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import { listTags } from "@/helpers/variable.js";

export default {
  name: "Autocomplete",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.listTags = listTags;
    this.nameRules = [(v) => !!v || "Name is required"];
  },
};
</script>
