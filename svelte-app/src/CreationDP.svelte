<script>
  import {
      Form,
      TextArea,
      Button,
      TextInput,
      MultiSelect,
      TreeView,
      Checkbox  
    } from "carbon-components-svelte";
  import axios from "axios";
  import { navigate } from "svelte-routing";
  
  import {accessToken} from "./store/acteur";
  import { get } from "svelte/store";
    
    
    let nom = "dp name";
    let description = "description";
    let formatData = "csv";
    let selectedFolder;
    let selectedIds = [];
    let checked = false;
    let isExternal = false;
    $: notExternal = !isExternal;
    let externalSourceLink = "";

    let dataProducts = [];
    let folders = [];

    // TODO: trop de requetes, peut causer un delay
    axios({
      method: 'get',
      url: API_URL + '/dp/get-dps',
    })
    .then((res) => {
      dataProducts = res.data.dataProducts;
    })
    .catch((error) => console.log(error));

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
        folders = [generateFolders(res.data.tree)]
        //folders.text = "root"
        selectedFolder = folders[0].id
    })
    .catch((error) => console.log(error));


    function createDP(e) {
        e.preventDefault();
        axios({
          method: 'post',
          url:  API_URL + '/dp/create-dp',
          data: {
            nom,
            description,
            formatData,
            dateCreation: new Date(),
            selectedFolder,
            selectedIds,
            checked,
            isExternal,
            externalSourceLink
          },
          headers: {
            authorization: "JWT " +  get(accessToken)
          }
        })
        .then((_) => navigate("/my-dps"))
        .catch((error) => console.log(error));
        }

</script>
    
    
<Form on:submit={createDP}>
    <TextInput bind:value={nom} labelText="data product name" placeholder="Enter data product name..." />
    <TextArea bind:value={description} labelText="Description" placeholder="Enter description..." />
    <TextInput bind:value={formatData} labelText="data format" placeholder="Enter data format..." />
    <TreeView
      labelText="Choisir Dossier."
      children={folders}
      bind:activeId={selectedFolder}
    />
    <MultiSelect
      spellcheck="false"
      filterable
      titleText="Data products utilisés"
      placeholder="Selectionner les data products..."
      items={dataProducts.map(dp => {return { id: dp._id, text: dp.nom}})}
      bind:selectedIds
    />
  <Checkbox labelText="Lien externe pour les données" bind:isExternal />
  <TextInput bind:value={externalSourceLink} labelText="data product link" placeholder="Enter external link..." bind:disabled={notExternal}/>
  <Checkbox labelText="Creer un notebook avec ce data product" bind:checked />
   <Button type="submit">Create</Button>
</Form>

    