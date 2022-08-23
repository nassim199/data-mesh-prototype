<template>
  <div>
    <div id="myDiagramDiv"></div>
  </div>
</template>

<script>
import go from "gojs";
import axios from "axios";
import { acteurStore } from "../stores/acteur";

export default {
  data() {
    return {
      acteur: acteurStore(),
    };
  },
  mounted() {
    axios({
      method: "get",
      url: "http://ec2-54-161-217-174.compute-1.amazonaws.com:3000/dp/" + this.dp + "/data-lineage",
      headers: {
        authorization: "JWT " + this.acteur.token,
      },
    })
      .then((res) => {

        const $ = go.GraphObject.make; // for conciseness in defining templates

        var diagram = $(
          go.Diagram,
          "myDiagramDiv", // id of DIV
          {
            // Automatically lay out the diagram as a tree;
            // separate trees are arranged vertically above each other.
            layout: $(go.TreeLayout, { nodeSpacing: 3 }),
          }
        );

        // Define a node template showing class names.
        // Clicking on the node opens up the documentation for that class.
        diagram.nodeTemplate =
            $(go.Node, "Auto",  // the Shape will go around the TextBlock
                $(go.Shape, "RoundedRectangle",
                { strokeWidth: 0, fill: "lightblue" },  // default fill is white
                ),
                $(go.TextBlock,
                { margin: 8 },  // some room around the text
                // TextBlock.text is bound to Node.data.key
                new go.Binding("text", "key"))
            );
        // Define a trivial link template with no arrowhead
        diagram.linkTemplate = $(
          go.Link,
          {
            curve: go.Link.Bezier,
            toEndSegmentLength: 30,
            fromEndSegmentLength: 30,
          },
          $(go.Shape, { strokeWidth: 1.5 }) // the link shape, with the default black stroke
        );

        // Collect all of the data for the model of the class hierarchy
        var nodeDataArray = [];

        nodeDataArray = res.data.data_lineage;

        // Create the model for the hierarchy diagram
        diagram.model = new go.TreeModel(nodeDataArray);
      })
      .catch((error) => console.log(error));
  },
  props: ["dp"],
};
</script>

<style>
#myDiagramDiv {
  width: 100%;
  height: 300px;
}
</style>
