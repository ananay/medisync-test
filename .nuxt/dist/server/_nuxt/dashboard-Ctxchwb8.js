import { _ as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, withCtx, createTextVNode, useSSRContext } from "vue";
import "hookable";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import "ofetch";
import "#internal/nuxt/paths";
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const appointments = ref([]);
    const records = ref([]);
    const importUrl = ref("");
    const importMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Dashboard</h1><div class="card"><h2>Upcoming appointments</h2>`);
      if (appointments.value.length) {
        _push(`<table><thead><tr><th>When</th><th>Doctor</th><th>Reason</th><th>Status</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(appointments.value, (a) => {
          _push(`<tr><td>${ssrInterpolate(a.scheduled_for)}</td><td>Dr. ${ssrInterpolate(a.doctor_last)}</td><td>${ssrInterpolate(a.reason)}</td><td>${ssrInterpolate(a.status)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      } else {
        _push(`<p class="muted">No appointments.</p>`);
      }
      _push(`</div><div class="card"><h2>My records</h2>`);
      if (records.value.length) {
        _push(`<table><thead><tr><th>Title</th><th>Type</th><th>Result</th><th></th></tr></thead><tbody><!--[-->`);
        ssrRenderList(records.value, (r) => {
          _push(`<tr><td>${ssrInterpolate(r.title)}</td><td>${ssrInterpolate(r.record_type)}</td><td>${ssrInterpolate(r.result_value)}</td><td>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/records/${r.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`View`);
              } else {
                return [
                  createTextVNode("View")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      } else {
        _push(`<p class="muted">No records.</p>`);
      }
      _push(`</div><div class="card"><h2>Import records</h2><p class="muted">Import a FHIR bundle / lab feed from an external URL.</p><input${ssrRenderAttr("value", importUrl.value)} placeholder="https://fhir.example.org/Patient/123/$everything"><button class="btn">Import from URL</button>`);
      if (importMsg.value) {
        _push(`<p class="muted">${ssrInterpolate(importMsg.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=dashboard-Ctxchwb8.js.map
