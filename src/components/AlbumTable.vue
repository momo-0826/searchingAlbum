<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type { Result } from "@/types/ItunesTypes.interface";
import { computed } from "vue";

interface Props {
  albums: Result[]
}

const props = defineProps<Props>();

const alubumList = computed(() => {
  return props.albums;
})

const formatDate = (date: Date) => {
  let targetDate = new Date(date);
  return targetDate.getFullYear().toString() + "年" + targetDate.getMonth().toString() + "月" + targetDate.getDate().toString() + "日";
};
const formatPrice = (price: string) => {
  if (price == undefined) return "No Data";
  return "$" + price;
};
</script>

<template>
  <DataTable :value="alubumList">
    <template #header>
      <div class="flex justify-content-center align-items-center">
        <h5 class="headerTitle">Results</h5>
      </div>
    </template>
    <template #empty> No artist found. </template>
    <template #loading> Loading artist data. Please wait. </template>
    <Column field="collectionName" header="AlbumName" :sortable="true">
      <template #body="{ data: albums }">
        {{ albums.collectionName }}
      </template>
    </Column>
    <Column header="ArtWork">
      <template #body="{ data: album }">
        <img :src="album.artworkUrl100" />
      </template>
    </Column>
    <Column field="collectionPrice" header="Price" :sortable="true">
      <template #body="{ data: albums }">
        {{ formatPrice(albums.collectionPrice) }}
      </template>
    </Column>
    <Column field="releaseDate" header="ReleaseDate" :sortable="true">
      <template #body="{ data: albums }">
        {{ formatDate(albums.releaseDate) }}
      </template>
    </Column>
    <template #footer>{{ "Total:" + albums.length }}</template>
  </DataTable>
</template>

<style scoped>
:deep(.p-datatable .p-datatable-header){
  color: #000000;
}
</style>