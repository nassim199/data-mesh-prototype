<script>
  import {
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody
  } from "carbon-components-svelte";
  import { Search, PaginationNav, Content, Tile, Row, Column } from "carbon-components-svelte";
  import { Card, CardText, CardActions, Button, MaterialApp } from 'svelte-materialify';
  import { navigate } from "svelte-routing";
  import axios from "axios";
  let dataProducts = [];
  let dataProduct = null;
  axios({
        method: 'get',
        url: API_URL + '/dp/get-dps',
    })
    .then((res) => {
        dataProducts = res.data.dataProducts;
    })
    .catch((error) => console.log(error));
</script>

<Search/>
<StructuredList selection>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>Nom</StructuredListCell>
        <StructuredListCell head>Description</StructuredListCell>
        <StructuredListCell head>Acteur</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      {#each dataProducts as dp}
        <StructuredListRow label for="{dp._id}" on:click={(e) => dataProduct = dp}>
          <StructuredListCell>{dp.nom}</StructuredListCell>
          <StructuredListCell>{dp.description}</StructuredListCell>
          <StructuredListCell> {dp.owner.nom}</StructuredListCell>
        </StructuredListRow>
      {/each}
    </StructuredListBody>
  </StructuredList>
  <PaginationNav/>


<Content>
    {#if dataProduct}
    <MaterialApp>
      <div class="d-flex">
        <Card>
          <CardText>
            <div>{dataProduct.nom}</div>
            <div class="text--primary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed exercitationem repellat voluptatum nostrum! Reprehenderit temporibus modi perspiciatis perferendis totam placeat vitae omnis ipsa quibusdam animi?
            </div>
          </CardText>
          <CardActions>
            <Button text class="primary-text" on:click={() => {navigate("/data-product/" + dataProduct._id);}}>Consulter</Button>
          </CardActions>
        </Card>
      </div>
    </MaterialApp>
    {:else}
    <Tile> selectionne data product </Tile>
    {/if}
</Content>
