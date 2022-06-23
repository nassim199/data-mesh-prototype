<script>
    import { Row, Column, Grid, Content, Tile, Button, Modal, TextInput, CopyButton, Link } from "carbon-components-svelte";
    import { List, ListItem, Divider, Card, Subheader, MaterialApp } from 'svelte-materialify';
    import {accessToken} from "./store/acteur";
    import { get } from "svelte/store";
    import { NewTab, FolderAdd } from "carbon-icons-svelte";
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

    //TODO: create folder call to backend
 
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
              bind:activeId={selectedFolder}
            />
            <TextInput
              id="folder-name"
              labelText="folder name"
              placeholder="Enter folder name..."
            />
          </Modal>
        </Column>
        <Column lg={12}>
            <Content>
                {#if dataProduct}
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
                        <ListItem>Date creation : {dataProduct.dateCreation}</ListItem>
                        {#if dataProduct.dataAvailable}
                        <Divider />
                        <ListItem>
                        <Row>
                          <Column>lien : </Column>
                            <Link>
                                {`${url}/dp/${dataProduct._id}/get_data`} 
                            </Link>
                                
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
                        {#if dataProduct.hasNotebook}
                        <Divider />
                        <ListItem>
                        <Row>
                            <Column>lien : </Column>
                            <Link>
                                {`http://localhost:8080/next/#/notebook/${dataProduct.notebookId}`} 
                            </Link>
                                
                            <Column>
                              <Button iconDescription="Open notebook" icon={NewTab} on:click={() => window.open(`http://localhost:8080/next/#/notebook/${dataProduct.notebookId}`)}/>
                            </Column>
                        </Row>
                        </ListItem>
                        {:else}
                        <ListItem> Pas de notebook </ListItem>
                        {/if}
                      </List>
                    </Card>
              
              
                  </MaterialApp>
                  {:else}
                  <Tile> selectionne data product </Tile>
                  {/if}
              </Content>
              
                {:else}
                <Tile> selectionne data product </Tile>
                {/if}
            </Content>
        </Column>
    </Row>
  </Grid>