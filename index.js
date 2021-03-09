// import it from "./node_modules//grapesjs//locale/it";
// import tr from "./node_modules//grapesjs//locale/tr";

//creating a custom component type
const myNewComponentType = (editor) => {
  editor.DomComponents.addType("my-input-type", {
    isComponent: (el) => el.tagName === "INPUT",
    model: {
      defaults: {
        tagName: "input",
        draggable: "form, form *", //can be only dropped in a form elements
        droppable: false, // cannot drop other element inside
        attributes: {
          type: "text",
          name: "default-name",
          placeholder: "Insert text here",
        },
        //-------------WORKING WITH TRAITS--------------
        traits: [
          // Strings are automatically converted to text types
          "name", // Same as: { type: 'text', name: 'name' }
          "placeholder",
          {
            type: "select", // Type of the trait
            label: "Type", // The label you will see in Settings
            name: "type", // The name of the attribute/property to use on component
            options: [
              { id: "text", name: "Text" },
              { id: "email", name: "Email" },
              { id: "password", name: "Password" },
              { id: "number", name: "Number" },
            ],
          },
          {
            type: "checkbox",
            name: "required",
          },
        ],
      },
    },
    view: {
      events: {
        click: "clicking",
      },
      clicking() {
        console.log("input element");
      },
    },
  });
};
//--------------------------------
//creating I18n plugin
const myI18nPlugin = (editor) => {
  editor.I18n.addMessages({
    en: {
      styleManager: {
        properties: {
          // The key is the property name (or id)
          "margin-top": "Top",
          "margin-right": "Right",
          "margin-left": "Left",
          "margin-bottom": "Bottom",
        },
      },
    },
  });
};
//--------------------
const editor = grapesjs.init({
  container: "#gjs",
  plugins: [myNewComponentType, myI18nPlugin],
  fromElement: true,
  height: "600px",
  width: "auto",
  storageManager: false,
  blockManager: {
    appendTo: "#blocks",
    blocks: [
      {
        id: "section",
        label: "Section",
        category: "Basic",
        attributes: { class: "gjs-block-section" },
        content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`,
      },
      {
        id: "text",
        label: "Text",
        category: "Basic",
        content: '<div data-gjs-type:"text">Insert text here</div>',
      },
      {
        id: "image",
        label: "Image",
        category: "Basic",
        select: true,
        content: { type: "image" },
        activate: true,
      },
    ],
  },
  layerManager: {
    appendTo: ".layers-container",
  },
  panels: {
    defaults: [
      {
        id: "layers",
        el: ".panel__right",
        // Make the panel resizable
        resizable: {
          maxDim: 350,
          minDim: 200,
          tc: 0, // Top handler
          cl: 1, // Left handler
          cr: 0, // Right handler
          bc: 0, // Bottom handler
          // Being a flex child we need to change `flex-basis` property
          // instead of the `width` (default)
          keyWidth: "flex-basis",
        },
      },
      {
        id: "panel-switcher",
        el: ".panel__switcher",
        buttons: [
          {
            id: "show-layers",
            active: true,
            togglable: false,
            label: "Layers",
            command: "show-layers",
          },
          {
            id: "show-styles",
            togglable: false,
            label: "Styles",
            command: "show-styles",
          },
          {
            id: "show-traits",
            // active: true,
            label: "Traits",
            command: "show-traits",
            togglable: false,
          },
        ],
      },
      {
        id: "panel-devices",
        el: ".panel__devices",
        buttons: [
          {
            id: "device-desktop",
            active: true,
            label: "D",
            command: "set-device-desktop",
            togglable: false,
          },
          {
            id: "device-mobile",
            label: "M",
            command: "set-device-mobile",
            togglable: false,
          },
        ],
      },
    ],
  },
  selectorManager: {
    appendTo: ".styles-container",
  },
  styleManager: {
    appendTo: ".styles-container",
    sectors: [
      {
        name: "Dimensions",
        open: false,
        buildProps: ["width", "min-height", "padding"],
        properties: [
          {
            type: "integer",
            name: "Width",
            property: "width",
            units: ["px", "%"],
            defaults: "auto",
            min: 0,
          },
        ],
      },
      {
        name: "Extra",
        open: false,
        buildProps: ["background-color", "box-shadow", "custom-prop"],
        properties: [
          {
            id: "custom-prop",
            name: "Font-size",
            type: "select",
            property: "font-size",
            defaults: "32px",
            options: [
              { value: "12px", name: "Tiny" },
              { value: "18px", name: "Medium" },
              { value: "32px", name: "Large" },
            ],
          },
          {
            type: "string",
            name: "Box shadow",
            property: "box-shadow",
          },
        ],
      },
    ],
  },
  traitManager: {
    appendTo: ".traits-container",
  },
  deviceManager: {
    devices: [
      {
        name: "Desktop",
        width: "",
      },
      {
        name: "Mobile",
        width: "320px", // canvas width
        widthMedia: "480px", //@media in css
      },
    ],
  },
  assetManager: {
    assets: [
      {
        src: "http://placehold.it/350x250/459ba8/fff/image2.jpg",
        height: 350,
        width: 250,
      },
      {
        src: "http://placehold.it/350x250/79c267/fff/image3.jpg",
        height: 350,
        width: 250,
      },
      {
        src: "http://placehold.it/350x250/78c5d6/fff/image1.jpg",
        height: 350,
        width: 250,
      },
    ],
    noAssets: "<b>No assets at this moment here, drag to upload</b>",
    upload: 0,
    uploadText: "Drop files here...",
    uploadName: "files",
    addBtnText: "Add image here",
    // dropzone: 1,
    // dropzoneContent: '<div class="dropzone-inner">Drop here your assets</div>',
    // modalTitle: "Select Image Here",
  },
});

editor.BlockManager.add("my-block-id", {
  label: "MyBlockElement",
  content: {
    tagName: "div",
    // draggable: false,
    components: [
      {
        tagName: "span",
        attributes: { class: "my-component" },
        content: "<b>Some static content </b>",
      },
      {
        tagName: "div",
        components: "<span>HTML at some point</span>",
      },
    ],
  },
});

// creating TOP panel with commands
editor.Panels.addPanel({
  id: "panel_top",
  el: ".panel__top",
});
editor.Panels.addPanel({
  id: "basic_actions",
  el: ".panel__basic-actions",
  buttons: [
    {
      id: "visibility",
      active: true,
      className: "btn-toggle-borders",
      label: "<b>B</b>",
      command: "sw-visibility",
    },
    {
      id: "export",
      className: "btn-open-export",
      label: "Exp",
      command: "export-template",
      context: "export-template",
    },
    {
      id: "show-json",
      label: "JSON",
      className: "btn-show-json",
      context: "show-json",
      command(editor) {
        editor.Modal.setTitle("Components JSON")
          .setContent(
            `<textarea style="width: 100%; height: 300px;">
            ${JSON.stringify(editor.getComponents())}
            </textarea>`
          )
          .open();
      },
    },
  ],
});

// Define commands
editor.Commands.add("show-layers", {
  getRowEl(editor) {
    return editor.getContainer().closest(".editor-row");
  },
  getLayersEl(row) {
    return row.querySelector(".layers-container");
  },

  run(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = "";
  },
  stop(editor, sender) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl.style.display = "none";
  },
});
editor.Commands.add("show-styles", {
  getRowEl(editor) {
    return editor.getContainer().closest(".editor-row");
  },
  getStyleEl(row) {
    return row.querySelector(".styles-container");
  },

  run(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = "";
  },
  stop(editor, sender) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl.style.display = "none";
  },
});
editor.Commands.add("show-traits", {
  getTraitsEl(editor) {
    const row = editor.getContainer().closest(".editor-row");
    return row.querySelector(".traits-container");
  },
  run(editor, sender) {
    this.getTraitsEl(editor).style.display = "";
  },
  stop(editor, sender) {
    this.getTraitsEl(editor).style.display = "none";
  },
});
editor.Commands.add("set-device-desktop", {
  run: (editor) => editor.setDevice("Desktop"),
});
editor.Commands.add("set-device-mobile", {
  run: (editor) => editor.setDevice("Mobile"),
});

//--------------------WORKING WITH ASSET MANAGER -------------------------

const assetManager = editor.AssetManager;
assetManager.add([
  {
    category: "c1",
    src: "http://placehold.it/350x250/78c5d6/fff/image1.jpg",
  },
  {
    category: "c1",
    src: "http://placehold.it/350x250/459ba8/fff/image2.jpg",
  },
  {
    category: "c2",
    src: "http://placehold.it/350x250/79c267/fff/image3.jpg",
  },
]);

// adding a new asset type
assetManager.addType("svg-icon", {
  model: {
    defaults: {
      type: "svg-icon",
      svgContent: "",
      name: "Default SVG Name",
    },
    getName() {
      return this.get("name");
    },
  },
  view: {
    getPreview() {
      return `<div style="text-align: center">${this.model.get(
        "svgContent"
      )}</div>`;
    },
    getInfo() {
      return "<div>SVG description</div>";
    },
    updateTarget(target) {
      const svg = this.model.get("svgContent");
      if (target.get("type") == "image") {
        target.set("src", `data:mime/type;base64,${btoa(svg)}`);
      } else {
        target.set("content", svg);
      }
    },
  },
  isType(value) {
    // The condition is intentionally simple
    if (value.substring(0, 5) == "<svg ") {
      return {
        type: "svg-icon",
        svgContent: value,
      };
    }
    // Maybe you pass the `svg-icon` object already
    else if (typeof value == "object" && value.type == "svg-icon") {
      return value;
    }
  },
});

assetManager.add(`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
  <polygon points="4 10 5 10 5 14 4 14"></polygon>
</svg>`);

//--------------------END WORKING WITH ASSET MANAGER ----------------------

//--------------------WORKING WITH COMPONENT MANAGER -------------------------
const component = editor.addComponents(`<div>
  <span title="foo">Custom component!!!</span>
</div>`)[0];

editor.addComponents({
  type: "my-input-type",
});
//--------------------END WORKING WITH COMPONENT MANAGER ---------------------

//---------------------Components & JS --------------------
const script = function (props) {
  const myLIbOptions = {
    prop1: props.myprop1,
    prop2: props.myprop2,
  };

  alert(JSON.stringify(myLIbOptions));
  // `this` is bound to the component element
  console.log("the element", this);
};

editor.Components.addType("comp-with-js", {
  model: {
    defaults: {
      script,
      myprop1: "the value",
      myprop2: 10,
      traits: [
        {
          type: "select",
          name: "myprop1",
          changeProp: true,
          options: [
            { value: "value1", name: "Value 1" },
            { value: "value2", name: "Value 2" },
          ],
        },
        {
          type: "number",
          name: "myprop2",
          changeProp: true,
        },
      ],
      "script-props": ["myprop1", "myprop2"],
      style: {
        width: "100px",
        height: "100px",
        background: "red",
      },
    },
  },
});

// Create a block for the component, so we can drop it easily
editor.Blocks.add("test-block", {
  label: "Test block",
  attributes: { class: "fa fa-text" },
  content: { type: "comp-with-js" },
});

//--------------END WORKING WITH COMPONENT & JS -----------

// ------------- WORKING WITH BLOCK MANAGER ----------------
const blockManager = editor.BlockManager;
blockManager.add("my-first-block", {
  label: "Simple block",
  content: '<div class="my-block">This is a simple block</div>',
});
blockManager.get("my-first-block").set({
  label: "Updated block title",
  attributes: {
    title: "My title",
  },
});
blockManager.add("my-map-block", {
  label: "Simple map block",
  content: {
    type: "map", // Built-in 'map' component
    style: {
      height: "300px",
    },
    removable: false, // Once inserted it can't be removed
  },
});
// ------------- END WORKING WITH BLOCK MANAGER ------------

// ------------- WORKING WITH COMMANDS ------------
const commands = editor.Commands;
commands.add("my-command-id", (editor) => {
  alert("Hi, this is a command");
});

commands.add("my-command-id", (editor, sender, options = {}) => {
  alert(`This is my command ${options.some}`);
});

commands.add("my-command-state", {
  run(editor) {
    alert("This command is now active");
    return {
      activated: new Date(),
    };
  },
  stop(editor) {
    console.log("This command is disabled");
  },
});

commands.add("my-command-modal", {
  run(editor) {
    editor.Modal.open({
      title: "Modal example",
      content: "My content",
    }).onceClose(() => this.stopCommand());
  },
  stop(editor) {
    editor.Modal.close();
  },
});

// editor.on("component:create", (model) =>
//   console.log("comopnent created", model)
// );
// editor.on("component:mount", (model) => console.log("comopnent mountd", model));
// editor.on("component:add", (model) => console.log("comopnent added", model));
// editor.on("component:update", (model) =>
//   console.log("comopnent updateed", model)
// );
const domComponents = editor.DomComponents;
const canvas = editor.Canvas;
editor.on("component:styleUpdate", (modal) => {
  editor.BlockManager.add("my-first-block1", {
    label: "Simple block",
    content: '<div class="my-block">This is a simple block</div>',
  });
});

editor.on("block:add", () => console.log("Block added"));
editor.on("asset:add", () => console.log("asset add"));
editor.on("asset:remove", () => console.log("asset remove"));
editor.on("asset:upload:start", () => console.log("asset upload start"));
editor.on("asset:upload:end", () => console.log("asset upload end"));
editor.on("asset:upload:response", () => console.log("asset upload response "));
editor.on("asset:upload:error", () => console.log("asset upload error "));
editor.on("canvas:dragenter", () => {
  const wrapper = domComponents.getWrapper();
  wrapper.set("style", { "background-color": "red", 'opacity': '0.2' });
  // console.log(assetManager.getContainer());
  // console.log(assetManager.getAssetsEl());
  // console.log(blockManager.getAll());
  // blockManager.render([
  //   {
  //     label: "Label tex",
  //     content: "<div>asdjlasdhadh</div>",
  //   },
  // ]);
});

// editor.runCommand("my-command-modal");
// editor.runCommand("my-command-state");
// console.log(commands.isActive("my-command-state"));
// console.log(commands.getActive());
// ------------- response  WORKING WITH COMMANDS --------

// ------------- WORKING WITH I18N ------------

// ------------- END WORKING WITH I18N --------
