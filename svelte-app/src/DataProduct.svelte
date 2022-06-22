<script>
    import { Row, Column, Grid, Content, Tile, Button, Modal, TextInput, CopyButton } from "carbon-components-svelte";
    import { List, ListItem, Divider, Card, Subheader, MaterialApp } from 'svelte-materialify';
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
  </script>
  

<Content>
    {#if dataProduct}
    <MaterialApp>
    <Card>
        <List>
          <ListItem>Nom : {dataProduct.nom}</ListItem>
          <Divider />
          <ListItem>Description : {dataProduct.description}</ListItem>
          <Divider />
          <ListItem>Format data : {dataProduct.formatData}</ListItem>
          <Divider />
          <ListItem>Date creation : {dataProduct.dateIngestion}</ListItem>
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
    {:else}
    <Tile> selectionne data product </Tile>
    {/if}
</Content>
