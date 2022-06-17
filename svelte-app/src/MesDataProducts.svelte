<script>
    import { Row, Column, Grid, Content, Tile, Button, Modal, TextInput, CopyButton } from "carbon-components-svelte";
    import {
    StructuredList,
    StructuredListRow,
    StructuredListCell,
    StructuredListBody
  } from "carbon-components-svelte";
    import {accessToken} from "./store/acteur";
    import { get } from "svelte/store";
    import FolderAdd from "carbon-icons-svelte/lib/FolderAdd.svelte";
    import axios from "axios";
    import { TreeView } from "carbon-components-svelte";

    let url = API_URL
    let open = false
    let children = [];
    let dataProduct = null;
    let dataProducts = {};
    let folders = [];
    let selectedFolder;
    function createTree(tree) {
       let ch = tree.children.map(c =>createTree(c))

       ch = [...ch, ...tree.dataProducts.map(dp => {dataProducts[dp._id]=dp; return {text: dp.nom, id: dp._id}})]

        return {
            text: tree.nom,
            id: tree._id,
            children: ch,
        }
    }
    function generateFolders(tree) {
      let f = tree.children.map(c => generateFolders(c))
      return {
        text: tree.nom,
        id: tree._id,
        children: f
      }
    }
    axios({
        method: 'get',
        url: API_URL + '/dp/get-my-dps',
        headers: {
        authorization: "JWT " + get(accessToken)
        }
    })
    .then((res) => {
        children = createTree(res.data.tree).children
        folders = [generateFolders(res.data.tree)]
        //folders.text = "root"
        selectedFolder = folders[0].id
    })
    .catch((error) => console.log(error));
 
  </script>
  
  <Grid>
    <Row>
        <Column lg={4}>
            {#if children}
            <Button iconDescription="Add" icon={FolderAdd} on:click={() => (open = true)}/>
            <TreeView
            labelText="Data Products"
            {children}
            on:select={({ detail }) => {if (dataProducts[detail.id]) dataProduct = dataProducts[detail.id]}}
          />
          {/if}
          <Modal
            bind:open
            modalHeading="Create Folder"
            primaryButtonText="Confirm"
            secondaryButtonText="Cancel"
            selectorPrimaryFocus="#folder-name"
            on:click:button--secondary={() => (open = false)}
            on:open
            on:close
            on:submit={() => console.log(selectedFolder)}
          >
            <p>Create a new Folder.</p>
            <br />
            <TreeView
              labelText="Folders"
              children={folders}
              bind:selectedFolder
            />
            <TextInput
              id="folder-name"
              labelText="folder name"
              placeholder="Enter folder name..."
            />
          </Modal>
        </Column>
        <Column lg={12}>
            <Button> Add data product </Button>
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
                                    {`${url}/dp/${dataProduct._id}/get_data`} 
                                </Column>
                                 
                                <Column>
                                    <CopyButton text={`${url}/dp/${dataProduct._id}/get_data`}/>
                                </Column>
                            </Row> 
                        </StructuredListCell>
                      </StructuredListRow>
                    </StructuredListBody>
                  </StructuredList>
                {:else}
                <Tile> selectionne data product </Tile>
                {/if}
            </Content>
        </Column>
    </Row>
  </Grid>