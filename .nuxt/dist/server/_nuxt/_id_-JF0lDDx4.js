import { _ as __nuxt_component_0 } from "./MarkdownView-BT6aBCpW.js";
import { a as useRoute, _ as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "marked";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "ufo";
import "radix3";
import "defu";
import "klona";
import "devalue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const record = ref(null);
    const status = ref("Loading...");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MarkdownView = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Record detail</h1>`);
      if (record.value) {
        _push(`<div class="card"><h2>${ssrInterpolate(record.value.title)}</h2><p class="muted">${ssrInterpolate(record.value.record_type)} · ${ssrInterpolate(record.value.created_at)}</p><p><strong>Patient:</strong> ${ssrInterpolate(record.value.patient_first)} ${ssrInterpolate(record.value.patient_last)}</p><p><strong>DOB:</strong> ${ssrInterpolate(record.value.patient_dob)}</p><p><strong>Insurance:</strong> ${ssrInterpolate(record.value.patient_insurance)}</p><p><strong>Result:</strong> ${ssrInterpolate(record.value.result_value)}</p><h3>Notes</h3>`);
        _push(ssrRenderComponent(_component_MarkdownView, {
          source: record.value.body
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<p class="muted">${ssrInterpolate(status.value)}</p>`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Back`);
          } else {
            return [
              createTextVNode("Back")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/records/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-JF0lDDx4.js.map
