import "../server.mjs";
import { defineComponent, ref, useSSRContext } from "vue";
import "hookable";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
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
  __name: "book",
  __ssrInlineRender: true,
  setup(__props) {
    const doctors = ref([]);
    ref(0);
    const scheduledFor = ref("");
    const reason = ref("");
    const msg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Book an appointment</h1><div class="card"><label>Doctor</label><select><!--[-->`);
      ssrRenderList(doctors.value, (d) => {
        _push(`<option${ssrRenderAttr("value", d.id)}>Dr. ${ssrInterpolate(d.first_name)} ${ssrInterpolate(d.last_name)}</option>`);
      });
      _push(`<!--]--></select><label>Date / time</label><input${ssrRenderAttr("value", scheduledFor.value)} placeholder="2026-07-15 09:30"><label>Reason</label><input${ssrRenderAttr("value", reason.value)}><button class="btn">Book</button>`);
      if (msg.value) {
        _push(`<p class="muted">${ssrInterpolate(msg.value)}</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/book.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=book-xTjIli5_.js.map
