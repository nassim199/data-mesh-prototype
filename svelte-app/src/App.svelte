<script>
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
  } from "carbon-components-svelte";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import UserAvatarFilledAlt from "carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte";
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./Home.svelte";
  import DataCatalogue from "./ConsultationCatalogue.svelte";
  import CreationDP from "./CreationDP.svelte";
  import Authentication from "./Authentication.svelte";
  import SqlStudio from "./SqlStudio.svelte";
  import MesDataProducts from "./MesDataProducts.svelte";
  import DataProduct from "./DataProduct.svelte";

  import {acteur} from "./store/acteur";

  export let url = "";
  let isSideNavOpen = false;
  let isOpen1 = false;
  let isOpen2 = false;
</script>

<Router url={url}>
	<Header company="ERIC" platformName="Data Mesh prototype" bind:isSideNavOpen>
		<svelte:fragment slot="skip-to-content">
		  <SkipToContent />
		</svelte:fragment>
		<HeaderUtilities>
		  <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} />
		  {#if $acteur.authenticated == true}
		  <HeaderAction
			bind:isOpen={isOpen1}
			icon={UserAvatarFilledAlt}
			closeIcon={UserAvatarFilledAlt}
		  >
			<HeaderPanelLinks>
			  <HeaderPanelDivider>Parametres de compte</HeaderPanelDivider>
			  <HeaderPanelLink>Infos</HeaderPanelLink>
			  <HeaderPanelLink>Accées</HeaderPanelLink>
			  <HeaderPanelDivider></HeaderPanelDivider>
			  <HeaderPanelLink>Logout</HeaderPanelLink>
			</HeaderPanelLinks>
		  </HeaderAction>
		  {:else}
		  <Link to="/authentication"> <SideNavLink text="Register / Login" /> </Link>
		  {/if}
		  <HeaderAction bind:isOpen={isOpen2}>
			<HeaderPanelLinks>
			  <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
			  <Link to="/my-dps"> <HeaderPanelLink>Mes data products</HeaderPanelLink> </Link>
			  <HeaderPanelDivider></HeaderPanelDivider>
			  <Link to="/data-catalogues"> <HeaderPanelLink>Consultation Data Catalogues</HeaderPanelLink> </Link>
			  <Link to="/add-dp"> <HeaderPanelLink>Creation Data Product</HeaderPanelLink> </Link>
			  <Link to="/sql-studio"> <HeaderPanelLink>SQL Studio</HeaderPanelLink> </Link>
			</HeaderPanelLinks>
		  </HeaderAction>
		</HeaderUtilities>
	  </Header>
	  
	  <!-- <SideNav bind:isOpen={isSideNavOpen}>
		<SideNavItems>
			<Link to="/"> <SideNavLink text="Home" /> </Link>
			<Link to="/data-catalogues"> <SideNavLink text="Consultation Data Catalogues" /> </Link>
			<Link to="/add-dp"> <SideNavLink text="Creation Data Product" /> </Link>
			<Link to="/sql-studio"> <SideNavLink text="SQL Studio" /> </Link>
		</SideNavItems>
	  </SideNav> -->
	  
	  <Content>
		<Grid>
		  <Row>
			<Column>
				<Route path="/"><Home /></Route>
				<Route path="data-catalogues" component="{DataCatalogue}" />
				<Route path="add-dp" component="{CreationDP}" />
				<Route path="/authentication"><Authentication /></Route>
				<Route path="/sql-studio"><SqlStudio/></Route>
				<Route path="/my-dps"><MesDataProducts/></Route>
				<Route path="/data-product/:id" let:params > <DataProduct id="{params.id}"/> </Route>
			</Column>
		  </Row>
		</Grid>
	  </Content>
	</Router>
