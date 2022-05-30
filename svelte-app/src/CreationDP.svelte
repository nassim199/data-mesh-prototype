<script>
    import {
        Form,
        TextArea,
        Button,
        TextInput 
      } from "carbon-components-svelte";
      import axios from "axios";
    
      import {acteur, accessToken} from "./store/acteur";
import { get } from "svelte/store";
    
    
    let nom = "dp name";
    let description = "description";
    let formatData = "csv";
    let dateIngestion = new Date();
    let link = "http://...";

    function createDP(e) {
        e.preventDefault();
        axios({
          method: 'post',
          url: 'http://localhost:3000/dp/create-dp',
          data: {
            nom,
            description,
            formatData,
            dateIngestion,
            link
          },
          headers: {
            authorization: "JWT " +  get(accessToken)
          }
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
        }

</script>
    
    

<Form on:submit={createDP}>
    <TextInput bind:value={nom} labelText="data product name" placeholder="Enter data product name..." />
    <TextArea bind:value={description} labelText="Description" placeholder="Enter description..." />
    <TextInput bind:value={formatData} labelText="data format" placeholder="Enter data format..." />
    <TextInput bind:value={link} labelText="Link to data" placeholder="Enter link..." />

    <Button type="submit">Create</Button>
</Form>

    