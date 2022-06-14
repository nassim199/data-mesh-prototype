<script>
  import {
    StructuredList,
    StructuredListHead,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody
  } from "carbon-components-svelte";
  import { Search, PaginationNav, Content, Tile, Button, Row, Column } from "carbon-components-svelte";
  import CopyLink from "carbon-icons-svelte/lib/CopyLink.svelte";
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
    <StructuredList>
        <StructuredListBody>
          <StructuredListRow>
            <StructuredListCell noWrap>Nom</StructuredListCell>
            <StructuredListCell> {dataProduct.nom} </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Description</StructuredListCell>
            <StructuredListCell> {dataProduct.description} </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Format data</StructuredListCell>
            <StructuredListCell> {dataProduct.formatData} </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Date ingestion</StructuredListCell>
            <StructuredListCell> {dataProduct.dateIngestion} </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Lien data</StructuredListCell>
            <StructuredListCell> 
                <Row>
                    <Column>
                        {`http://localhost:3000/dp/${dataProduct._id}/get_data`} 
                    </Column>
                     
                    <Column>
                        <Button iconDescription="Copy" icon={CopyLink} on:click={() => navigator.clipboard.writeText(`http://localhost:3000/dp/${dataProduct._id}/get_data`)}/>
                    </Column>
                </Row> 
            </StructuredListCell>
          </StructuredListRow>
          <StructuredListRow>
            <StructuredListCell noWrap>Acteur</StructuredListCell>
            <StructuredListCell> {dataProduct.owner.nom} </StructuredListCell>
          </StructuredListRow>
        </StructuredListBody>
      </StructuredList>
    {:else}
    <Tile> selectionne data product </Tile>
    {/if}
</Content>
