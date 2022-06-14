<script>
import { Tabs, Tab, TabContent } from "carbon-components-svelte";
import {
    Form,
    PasswordInput,
    Button,
    TextInput 
  } from "carbon-components-svelte";
  import axios from "axios";
  import { navigate } from "svelte-routing";

  import {acteur, accessToken} from "./store/acteur";


  let nom = "nassim";
  let email = "test7@test.com";
  let password = "test";
  function register(e) {
    e.preventDefault();
    console.log(nom, email, password)
    axios({
      method: 'post',
      url: API_URL + '/auth/register',
      data: {
        nom,
        email,
        password
      }
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
    // Api.post("/auth/register", {nom, email, password})
    // .then((res) => console.log(res))
    // .catch((error) => console.log(error));
    }
    function login(e) {
      e.preventDefault();
      axios({
      method: 'post',
      url: API_URL + '/auth/login',
      data: {
        email,
        password
      }
    })
    .then((res) => {
      acteur.set({
          id: res.data.acteur.id,
          email: res.data.acteur.email,
          authenticated: true
      });
      accessToken.set(res.data.accessToken);

      navigate("/", { replace: true });
    })
    .catch((error) => console.log(error));
    }
</script>


<Tabs>
    <Tab label="Register" />
    <Tab label="Login" />
    <svelte:fragment slot="content">
      <TabContent>
        <Form on:submit={register}>
            <TextInput id="name_register" bind:value={nom} labelText="User name" placeholder="Enter user name..." />
            <TextInput id="email_register" bind:value={email} labelText="e-mail" placeholder="Enter e-mail..." />
            <PasswordInput id="pwd_register" bind:value={password} labelText="Password" placeholder="Enter password..." />
            <Button type="submit">Register</Button>
          </Form>
      </TabContent>
      <TabContent>
        <Form on:submit={login}>
            <TextInput id="email_login" bind:value={email} labelText="e-mail" placeholder="Enter e-mail..." />
            <PasswordInput id="pwd_login" bind:value={password} labelText="Password" placeholder="Enter password..." />
            <Button type="submit">Login</Button>
        </Form>
      </TabContent>
    </svelte:fragment>
  </Tabs>
