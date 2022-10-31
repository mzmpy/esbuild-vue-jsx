(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });

  // src/index.js
  var import_vue2 = __require("vue");

  // src/main.js
  var import_vue = __require("vue");
  var import_element_plus = __require("element-plus");
  var main_default = (0, import_vue.defineComponent)({
    name: "main",
    components: { ElInput: import_element_plus.ElInput },
    setup(props, ctx) {
      const peopleName = (0, import_vue.ref)("");
      const onInput = (val) => {
        peopleName.value = val;
      };
      return () => {
        return /* @__PURE__ */ (0, import_vue.h)(import_vue.Fragment, null, /* @__PURE__ */ (0, import_vue.h)("h1", null, "Hello ", peopleName.value || "World", "!"), /* @__PURE__ */ (0, import_vue.h)(import_element_plus.ElInput, {
          class: "input",
          modelValue: peopleName.value,
          onInput,
          placeholder: "World"
        }));
      };
    }
  });

  // src/index.js
  var import_dist = __require("element-plus/dist/index.css");
  var app = (0, import_vue2.createApp)(main_default);
  app.mount("#app");
})();
