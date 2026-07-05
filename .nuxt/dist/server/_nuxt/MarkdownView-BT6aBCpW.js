import { defineComponent, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import marked from "marked";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MarkdownView",
  __ssrInlineRender: true,
  props: {
    source: {}
  },
  setup(__props) {
    const props = __props;
    const rendered = computed(() => {
      try {
        return marked(props.source || "");
      } catch {
        return props.source;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "markdown-body" }, _attrs))} data-v-12b89581>${rendered.value ?? ""}</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MarkdownView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-12b89581"]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=MarkdownView-BT6aBCpW.js.map
