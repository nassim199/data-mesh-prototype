<script>
    import { Row, Column, Grid, Content, Tile, Button, Modal, TextInput, CopyButton } from "carbon-components-svelte";
    import { List, ListItem, Divider, Card, Subheader, MaterialApp } from 'svelte-materialify';

    import "@carbon/styles/css/styles.css";
    import "@carbon/charts/styles.css";
    import { TreeChart } from "@carbon/charts-svelte";

    import {accessToken} from "./store/acteur";
    import { get } from "svelte/store";
    import axios from "axios";

    let url = API_URL

    export let id;
    let dataProduct = null;

    axios({
        method: 'get',
        url: url + '/dp/' + id,
        headers: {
        authorization: "JWT " + get(accessToken)
        }
    })
    .then((res) => {
        dataProduct = res.data.dataProduct;
    })
    .catch((error) => console.log(error));

    let data_lineage = []
    let options = {
            "title": "Dendrogram",
            "height": "800px",
            "tree": {
                "type": "dendrogram",
                "rootTitle": "dp3"
            }
        }
    axios({
        method: 'get',
        url: url + '/dp/' + id + "/data-lineage"
    })
    .then((res) => {
        data_lineage = res.data.data_lineage.children;
        options.tree.rootTitle = res.data.data_lineage.name;
        options = options;
    })
    .catch((error) => console.log(error));
    </script>
  

<Content>
    {#if dataProduct}
    <!-- TODO: move Material App to root -->
    <MaterialApp>
    <Card>
        <List>
          <ListItem>Nom : {dataProduct.nom}</ListItem>
          <Divider />
          <ListItem>Description : {dataProduct.description}</ListItem>
          <Divider />
          <ListItem>Format data : {dataProduct.formatData}</ListItem>
          <Divider />
          <ListItem>Date creation : {dataProduct.dateCreation}</ListItem>
          {#if dataProduct.dataAvailable}
          <Divider />
          <ListItem>
          <Row>
              <Column>
                  {`lien : ${url}/dp/${dataProduct._id}/get_data`} 
              </Column>
                  
              <Column>
                  <CopyButton text={`${url}/dp/${dataProduct._id}/get_data`}/>
              </Column>
          </Row>
          </ListItem>
          <ListItem>Volume : {dataProduct.volume / 1024} ko</ListItem>
          <ListItem>nombre de telechargements : {dataProduct.downloads.length}</ListItem>
          {:else}
          <ListItem> Pas de données disponibles </ListItem>
          {/if}
        </List>
      </Card>

    </MaterialApp>
    <!-- TODO: use svelvet for data lineage, or else delete svelvet -->
    <TreeChart
        bind:data={data_lineage}
        bind:options
        />
    {:else}
    <Tile> selectionne data product </Tile>
    {/if}
</Content>
