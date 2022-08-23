<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="flex justify-content-between flex-column sm:flex-row">
          <h5>Mes Data Products</h5>
          <Button
            icon="pi pi-plus"
            label="Add Folder"
            @click="addFolderDialog"
            class="mb-2"
          />
        </div>
        <Tree
          :value="dataProductsTree"
          selectionMode="single"
          v-model:selectionKeys="selectedDP"
          @node-select="onNodeSelect"
          @node-unselect="onNodeUnselect"
        ></Tree>
      </div>
      <div>
        <div v-if="dataProduct">
          <Card>
            <template #title>
              {{ dataProduct.nom }}
            </template>
            <template #content>
              {{ dataProduct.description }}
              <Divider />
              Format data : {{ dataProduct.formatData }}
              <Divider />
              Date creation : {{ dataProduct.dateCreation }}
              <Divider />

              <div v-if="dataProduct.dataAvailable">
                Volume : {{ dataProduct.formatData / 1024 }} ko
                <Divider />
                Date Maj : {{ dataProduct.derniereMAJ }}

                <Divider />
              </div>
              <Accordion>
                <AccordionTab header="Lien de telechargement">
                  <div
                    v-if="dataProduct.dataAvailable || dataProduct.isExternal"
                    class="flex justify-content-between"
                  >
                    <div>{{ download_link }}</div>
                    <Button
                      label="copy"
                      class="pi pi-copy"
                      @click="
                        () => {
                          copyURL(download_link);
                        }
                      "
                    ></Button>
                  </div>
                  <div v-else>No data available</div>
                </AccordionTab>
                <AccordionTab header="Lien Upload">
                  <div
                    v-if="!dataProduct.isExternal"
                    class="flex justify-content-between"
                  >
                    <div>{{ upload_link }}</div>
                    <Button
                      label="copy"
                      class="pi pi-copy"
                      @click="
                        () => {
                          copyURL(upload_link);
                        }
                      "
                    ></Button>
                  </div>
                  <div v-else>Data is external</div>
                </AccordionTab>
                <AccordionTab header="Lien notebook">
                  <div
                    v-if="dataProduct.hasNotebook"
                    class="flex justify-content-between"
                  >
                    <div>{{ notebook_link }}</div>
                    <Button
                      label="open"
                      class="pi pi-window-maximize"
                      @click="openUrl(notebook_link)"
                    ></Button>
                  </div>
                  <div v-else>No Notebook</div>
                </AccordionTab>
              </Accordion>
            </template>
            <template #footer>
              <Button label="Data Lineage" @click="showDataLineage" />
              <Button
                label="Download History"
                @click="
                  () => {
                    displayDownloads = true;
                  }
                "
                style="margin-left: 0.5em"
              />
            </template>
          </Card>
        </div>
        <div v-else class="card">No data product selected</div>
      </div>
    </div>
    <Dialog
      v-model:visible="displayDialog"
      :modal="true"
      position="right"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '50vw' }"
    >
      <template #header>
        <h3>Add new folder</h3>
      </template>

      <label for="folderName" class="block text-900 text-xl font-medium mb-2"
        >Folder Name</label
      >
      <InputText
        id="folderName"
        v-model="folderName"
        type="text"
        class="w-full mb-3"
        placeholder="Folder Name"
        style="padding: 1rem"
      />

      <label class="block text-900 text-xl font-medium mb-2"
        >Parent Folder</label
      >
      <TreeSelect
        v-model="selectedNode"
        :options="folders"
        placeholder="Select Folder"
        @select-node="
          (node) => {
            selectedFolder = node.key;
          }
        "
      />

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="
            () => {
              displayDialog = false;
            }
          "
        />
        <Button label="Add" icon="pi pi-plus" @click="addFolder" />
      </template>
    </Dialog>
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
</template>

<script>
import axios from "axios";
import { acteurStore } from "../stores/acteur";
import router from "../router";
import DataLineage from "./DataLineage";

export default {
  data() {
    return {
      folders: null,
      dataProductsTree: null,
      dataProducts: {},
      dataProduct: null,
      displayDialog: false,
      folderName: "",
      selectedFolder: null,
      selectedNode: null,
      selectedDP: null,
      acteur: acteurStore(),
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
  nodeService: null,
  created() {
    if (this.acteur.id == "") {
      router.replace("/access");
    }
    axios({
      method: "get",
      url: "http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/dp/get-my-dps",
      headers: {
        authorization: "JWT " + this.acteur.token,
      },
    })
      .then((res) => {
        this.dataProductsTree = this.createTree(res.data.tree).children;
        this.folders = [this.generateFolders(res.data.tree)];
        this.folders[0].label = "root";
        this.selectedFolder = this.folders[0].key;
        console.log(this.folders);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    onNodeSelect(node) {
      this.dataProduct = node.data;
    },
    onNodeUnselect() {
      this.dataProduct = null;
    },
    showDataLineage() {
      this.displayDataLineage = true;
    },
    addFolderDialog() {
      this.displayDialog = true;
    },
    addFolder() {
      axios({
        method: "post",
        url: "http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/dp/create-folder",
        data: {
          folderId: this.selectedFolder,
          nom: this.folderName,
        },
        headers: {
          authorization: "JWT " + this.acteur.token,
        },
      })
        .then(() => {
          this.displayDialog = false;
          // TODO: actualiser folders
        })
        .catch((error) => console.log(error));
    },

    generateFolders(tree) {
      let f = tree.children.map((c) => this.generateFolders(c));
      return {
        label: tree.nom,
        data: tree.nom,
        key: tree._id,
        children: f,
      };
    },
    createTree(tree) {
      let ch = tree.children.map((c) => this.createTree(c));

      ch = [
        ...ch,
        ...tree.dataProducts.map((dp) => {
          return { label: dp.nom, data: dp, key: dp._id, selectable: true };
        }),
      ];

      return {
        label: tree.nom,
        data: tree.nom,
        key: tree._id,
        children: ch,
        icon: "pi pi-fw pi-folder",
        selectable: false,
      };
    },
    async copyURL(mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
      } catch ($e) {
        alert("Cannot copy");
      }
    },
    openUrl(link) {
      window.open(link, "_blank");
    },
  },
  computed: {
    dp_id() {
      if (this.dataProduct) {
        return this.dataProduct._id;
      } else {
        return "";
      }
    },
    download_history() {
      if (this.dataProduct) {
        let date = Date.now() - 24 * 60 * 60 * 1000 * 7;
        let downloads = this.dataProduct.downloads
          .map((d) => Date.parse(d))
          .filter((d) => d >= date)
          .map((d) => Math.floor((d - date) / (24 * 60 * 60 * 1000)));
        let result = [0, 0, 0, 0, 0, 0, 0];
        downloads.forEach((d) => {
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
    download_link() {
      return `http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/data/${this.dataProduct._id}/get_data`;
    },
    upload_link() {
      return `http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/data/${this.dataProduct._id}/upload_data`;
    },
    notebook_link() {
      return `http://ec2-54-161-217-174.compute-1.amazonaws.com:8090/next/#/notebook/${this.dataProduct.notebookId}`;
    },
  },
  components: {
    DataLineage: DataLineage,
  },
};
</script>
