import "../server.mjs";
import { defineComponent, ref, mergeProps, useSSRContext } from "vue";
import "hookable";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "card",
        style: { "max-width": "460px", "margin": "0 auto" }
      }, _attrs))}><h1>Create account</h1><form><label>First name</label><input${ssrRenderAttr("value", firstName.value)}><label>Last name</label><input${ssrRenderAttr("value", lastName.value)}><label>Email</label><input${ssrRenderAttr("value", email.value)} type="email"><label>Password</label><input${ssrRenderAttr("value", password.value)} type="password"><button class="btn" type="submit">Register</button>`);
      if (error.value) {
        _push(`<p class="err">${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=register-BLk3Ub3I.js.map
