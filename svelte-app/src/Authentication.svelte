<script>
import { Tabs, Tab, TabContent } from "carbon-components-svelte";
import {
    Form,
    PasswordInput,
    Button,
    TextInput 
  } from "carbon-components-svelte";
  import axios from "axios";


  let name = "nassim";
  let email = "test2@test.com";
  let password = "test";
  function register(e) {
    e.preventDefault();
    console.log(name, email, password)
    axios.post('localhost:3000/auth/register', {
        name,
        email,
        password
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  }
  function login(e) {
    e.preventDefault();
    console.log(name, email, password)
    axios.post('localhost:3000/auth/login', {
        email,
        password
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  }
</script>


<Tabs>
    <Tab label="Register" />
    <Tab label="Login" />
    <svelte:fragment slot="content">
      <TabContent>
        <Form on:submit={register}>
            <TextInput id="name_register" bind:value={name} labelText="User name" placeholder="Enter user name..." />
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
