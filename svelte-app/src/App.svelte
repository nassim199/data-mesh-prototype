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
		  <HeaderAction bind:isOpen={isOpen2}>
			<HeaderPanelLinks>
			  <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
			  <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
			  <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
			  <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
			  <HeaderPanelLink>Switcher item 2</HeaderPanelLink>

			</HeaderPanelLinks>
		  </HeaderAction>
		</HeaderUtilities>
	  </Header>
	  
	  <SideNav bind:isOpen={isSideNavOpen}>
		<SideNavItems>
			<Link to="/"> <SideNavLink text="Home" /> </Link>
			<Link to="/data-catalogues"> <SideNavLink text="Consultation Data Catalogues" /> </Link>
			<Link to="/add-dp"> <SideNavLink text="Creation Data Product" /> </Link>
		</SideNavItems>
	  </SideNav>
	  
	  <Content>
		<Grid>
		  <Row>
			<Column>
				<Route path="data-catalogues" component="{DataCatalogue}" />
				<Route path="add-dp" component="{CreationDP}" />
				<Route path="/"><Home /></Route>
			</Column>
		  </Row>
		</Grid>
	  </Content>
	</Router>
