import "../server.mjs";
import { defineComponent, ref, useSSRContext } from "vue";
import "hookable";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
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
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const users = ref([]);
    const status = ref("Loading...");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Admin — user management</h1><div class="card">`);
      if (users.value.length) {
        _push(`<table><thead><tr><th>ID</th><th>Email</th><th>Role</th><th>Name</th><th>SSN</th><th>Hash</th><th></th></tr></thead><tbody><!--[-->`);
        ssrRenderList(users.value, (u) => {
          _push(`<tr><td>${ssrInterpolate(u.id)}</td><td>${ssrInterpolate(u.email)}</td><td>${ssrInterpolate(u.role)}</td><td>${ssrInterpolate(u.first_name)} ${ssrInterpolate(u.last_name)}</td><td>${ssrInterpolate(u.ssn)}</td><td class="muted">${ssrInterpolate(u.password_hash)}</td><td><select><option${ssrIncludeBooleanAttr(Array.isArray(u.role) ? ssrLooseContain(u.role, null) : ssrLooseEqual(u.role, null)) ? " selected" : ""}>patient</option><option${ssrIncludeBooleanAttr(Array.isArray(u.role) ? ssrLooseContain(u.role, null) : ssrLooseEqual(u.role, null)) ? " selected" : ""}>doctor</option><option${ssrIncludeBooleanAttr(Array.isArray(u.role) ? ssrLooseContain(u.role, null) : ssrLooseEqual(u.role, null)) ? " selected" : ""}>admin</option></select></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      } else {
        _push(`<p class="muted">${ssrInterpolate(status.value)}</p>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=admin-CexGdEXW.js.map
