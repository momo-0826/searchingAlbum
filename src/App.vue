<script setup lang="ts">
import AlbumTable from "./components/AlbumTable.vue";
import { ref } from "vue";
import { itunesSearch } from "./services/iTunesAPI";
import type { Ref } from "vue";
import type { Result } from "@/types/ItunesTypes.interface";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

let searchText: Ref<string> = ref("");

const albums : Ref<Result[]>= ref([]);
const isNameEmpty = ref(false);

const searchItunes = async (name: string): Promise<void> => {
  isNameEmpty.value = false;
  if (name === "") {
    isNameEmpty.value = true;
    return;
  }
  const value = await itunesSearch(name);
  albums.value = value.results;
  console.log("data");
  console.log(albums.value);
};
</script>

<template>
  <h2 style="margin-top: 1rem;">Searching album from iTunes!!</h2>
  <form class="form" @submit.prevent="searchItunes(searchText)">
    <div class="card">
      <div class="searchArea">
        <InputText  placeholder="Artist name" type="text" v-model="searchText" />
        <Button label="Search" @click="searchItunes(searchText)">Search</Button>
      </div>
      <div v-if="isNameEmpty === true" class="error">
        <p >Artist name is required</p>
      </div>
      <div class="cardBody" v-if="albums">
        <AlbumTable :albums="albums"/>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.form {
  width: 100%;
  height: 768px;
}

.card {
  background-color: #fff;
  padding: 2rem;
  margin: 1rem 0;
  border-radius: 10px;
  width: 840px;
}

.searchArea {
  display: flex;
  text-align: center;
  height: 50px;
  margin-bottom: 0.5rem;
}

.error {
  background: #ffe7e6;
  border: solid #ff5757;
  border-width: 0 0 0 6px;
  color: #ff5757;
  vertical-align: middle;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
}

.cardBody {
  background-color: #fff;
}

.headerTitle {
  color: #212121;
}

:deep(.p-datatable) {
  .p-datatable-header {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #000;
  }
  .p-datatable-thead {
    tr {
      th {
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
        color: #343a40;
      }
    }
  }

  .p-datatable-tbody {
    tr {
      background-color: #fff;
      color: #495057;
      td {
        border: 1px solid #dee2e6;
      }
    }
  }

  .p-datatable-footer {
    background-color: #fff;
    color: #495057;
    border: 1px solid #dee2e6;
  }
}

:deep(.p-inputtext) {
  color: black;
  background-color: #fff;
  height: 80%;
}

:deep(.p-button) {
  display: block;
  background-color: #dee2e6;
  border-color: black;
  width: 108px;
  height: 80%;
  text-align: center;
  margin-left: 1rem;
}

:deep(.p-button:enabled:hover) {
  background-color: #c4c7ca;
  border-color: black;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
