<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Row Expand</h5>
        <DataTable
          :value="dataProducts"
          v-model:expandedRows="expandedRows"
          dataKey="_id"
          responsiveLayout="scroll"
          :paginator="true"
          :rows="10"
          :rowHover="true"
          v-model:filters="filters1"
          filterDisplay="menu"
          :loading="loading1"
          :filters="filters1"
          :globalFilterFields="['name']"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                icon="pi pi-minus"
                label="Collapse All"
                @click="collapseAll"
                class="mb-2"
              /><span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters1['global'].value"
                  placeholder="Keyword Search"
                  style="width: 100%"
                />
              </span>
            </div>
          </template>
          <template #empty> No data products found. </template>
          <template #loading> Loading data products. Please wait. </template>

          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="nom" header="Name" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.nom }}
            </template>
          </Column>
          <Column field="owner.nom" header="Acteur" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.owner.nom }}
            </template>
          </Column>
          <Column field="formatData" header="Format" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.formatData }}
            </template></Column
          >

          <template #expansion="slotProps">
            <div class="p-3">
              {{ slotProps.data.description }}
              <br />
              <br />
              Date creation : {{ slotProps.data.dateCreation }}
              <br />
              <div v-if="slotProps.data.dataAvailable">
                Volume : {{ slotProps.data.formatData / 1024 }} ko
                <br />
                Date Maj : {{ slotProps.data.derniereMAJ }}
              </div>
              <br />
              <div
                v-if="slotProps.data.dataAvailable || slotProps.data.isExternal"
                class="flex justify-content-between"
              >
                <div>Lien : {{ download_link(slotProps.data) }}</div>
                <Button
                  label="copy"
                  class="pi pi-copy"
                  @click="
                    () => {
                      copyURL(download_link(slotProps.data));
                    }
                  "
                ></Button>
              </div>
              <div v-else>No data available</div>
              <div>
                <Button
                  label="Data Lineage"
                  @click="
                    () => {
                      dp_id = slotProps.data._id;
                      displayDataLineage = true;
                    }
                  "
                />
                <Button
                  label="Download History"
                  @click="
                    () => {
                      downloads = slotProps.data.downloads;
                      displayDownloads = true;
                    }
                  "
                  style="margin-left: 0.5em"
                />
              </div>
            </div>
          </template>
        </DataTable>
        <Dialog
          v-model:visible="displayDataLineage"
          :modal="true"
          :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
          :style="{ width: '50vw' }"
        >
          <template #header>
            <h3>Data Lineage</h3>
          </template>
          <DataLineage :dp="dp_id" />
          <template #footer>
            <Button
              label="Hide"
              icon="pi pi-times"
              class="p-button-text"
              @click="
                () => {
                  displayDataLineage = false;
                }
              "
            />
          </template>
        </Dialog>
        <Dialog
          v-model:visible="displayDownloads"
          :modal="true"
          :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
          :style="{ width: '50vw' }"
        >
          <template #header>
            <h3>Downloads history</h3>
          </template>
          <Chart type="line" :data="download_history" :options="options" />
          <template #footer>
            <Button
              label="Hide"
              icon="pi pi-times"
              class="p-button-text"
              @click="
                () => {
                  displayDownloads = false;
                }
              "
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import axios from "axios";
import DataLineage from "./DataLineage";

export default {
  data() {
    return {
      filters1: null,
      loading1: true,
      dataProducts: null,
      expandedRows: [],
      dp_id: "",
      downloads: [],
      displayDataLineage: false,
      displayDownloads: false,
      options: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      },
    };
  },
  created() {
    this.initFilters1();
    axios({
      method: "get",
      url: "http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/dp/get-dps",
    })
      .then((res) => {
        this.dataProducts = res.data.dataProducts;
        this.loading1 = false;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
    },
    clearFilter1() {
      this.initFilters1();
    },
    expandAll() {
      this.expandedRows = this.products.filter((p) => p.id);
    },
    collapseAll() {
      this.expandedRows = null;
    },
    formatDate(value) {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    download_link(dp) {
      return `http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/data/${dp._id}/get_data`;
    },
    async copyURL(mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
      } catch ($e) {
        alert("Cannot copy");
      }
    },
  },
  computed: {
    download_history() {
      if (this.downloads) {
        let date = Date.now() - 24 * 60 * 60 * 1000 * 7;
        let result = [0, 0, 0, 0, 0, 0, 0];
        this.downloads
          .map((d) => Date.parse(d))
          .filter((d) => d >= date)
          .map((d) => Math.floor((d - date) / (24 * 60 * 60 * 1000)))
          .forEach((d) => {
            result[d] += 1;
          });

        return {
          labels: ["j-7", "j-6", "j-5", "j-4", "j-3", "j-2", "j-1"],
          datasets: [
            {
              label: "Downloads",
              data: result,
              fill: false,
              borderColor: "#42A5F5",
              tension: 0.4,
            },
          ],
        };
      } else {
        return null;
      }
    },
  },
  components: {
    DataLineage: DataLineage,
  },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";

::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
