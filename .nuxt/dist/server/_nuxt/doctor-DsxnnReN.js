import { _ as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
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
  __name: "doctor",
  __ssrInlineRender: true,
  setup(__props) {
    const patients = ref([]);
    const records = ref([]);
    const selected = ref(null);
    const rxPatient = ref(0);
    const rxMed = ref("");
    const rxDose = ref("");
    const rxNotes = ref("");
    const rxMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Doctor — patient panel</h1><div class="card"><h2>Patients</h2>`);
      if (patients.value.length) {
        _push(`<table><thead><tr><th>Name</th><th>DOB</th><th>Insurance</th><th></th></tr></thead><tbody><!--[-->`);
        ssrRenderList(patients.value, (p) => {
          _push(`<tr><td>${ssrInterpolate(p.first_name)} ${ssrInterpolate(p.last_name)}</td><td>${ssrInterpolate(p.dob)}</td><td>${ssrInterpolate(p.insurance_id)}</td><td><a href="#">Records</a></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (records.value.length) {
        _push(`<div class="card"><h2>Records for patient #${ssrInterpolate(selected.value)}</h2><table><thead><tr><th>Title</th><th>Type</th><th>Result</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(records.value, (r) => {
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/records/${r.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(r.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(r.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td>${ssrInterpolate(r.record_type)}</td><td>${ssrInterpolate(r.result_value)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card"><h2>Prescribe</h2><input${ssrRenderAttr("value", rxPatient.value)} type="number" placeholder="Patient id"><input${ssrRenderAttr("value", rxMed.value)} placeholder="Medication"><input${ssrRenderAttr("value", rxDose.value)} placeholder="Dosage"><textarea rows="2" placeholder="Notes (markdown)">${ssrInterpolate(rxNotes.value)}</textarea><button class="btn">Create prescription</button>`);
      if (rxMsg.value) {
        _push(`<p class="muted">${ssrInterpolate(rxMsg.value)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/doctor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=doctor-DsxnnReN.js.map
