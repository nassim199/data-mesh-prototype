<script>
    import { TextArea, DataTable, Button, DataTableSkeleton  } from "carbon-components-svelte";
    import axios from "axios";

    let query = "";
    let headers = []
    let records = []
    let fetched = false
    let fetching = false

    function run_query() {
        fetching = true
        axios({
        method: 'get',
        url: API_URL + "/data/sql-query?sql=" + query,
    })
    .then((res) => {
        headers = res.data[0].schema.fields.map(f => {return {key : f.name, value: f.name}})
        records = res.data[0].data.map((row,i) => { return {...row, id:i} })
        fetched = true
        fetching = false
    })
    .catch((error) => {
        fetching = false
        console.log(error)
    });
    }
</script>
  
<TextArea
    bind:value={query}
    hideLabel
    labelText="App description"
    placeholder="Enter a SQL query..."
    />
<Button on:click={run_query}>Run</Button>

<!-- TODO: show skeleton before retrieving data <DataTableSkeleton showHeader={false} showToolbar={false} /> -->
{#if fetched}
<DataTable
    headers={headers}
    rows={records}
  />
{:else if fetching}
<DataTableSkeleton showHeader={false} showToolbar={false} />
{/if}