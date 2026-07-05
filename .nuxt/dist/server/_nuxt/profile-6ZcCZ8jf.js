import "../server.mjs";
import { defineComponent, ref, useSSRContext } from "vue";
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const user = ref(null);
    const msg = ref("");
    const theme = ref("light");
    const notifications = ref("email");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>My profile</h1>`);
      if (user.value) {
        _push(`<div class="card"><label>First name</label><input${ssrRenderAttr("value", user.value.first_name)}><label>Last name</label><input${ssrRenderAttr("value", user.value.last_name)}><label>Date of birth</label><input${ssrRenderAttr("value", user.value.dob)}><label>Phone</label><input${ssrRenderAttr("value", user.value.phone)}><label>Address</label><input${ssrRenderAttr("value", user.value.address)}><label>Insurance ID</label><input${ssrRenderAttr("value", user.value.insurance_id)}><button class="btn">Save</button>`);
        if (msg.value) {
          _push(`<p class="muted">${ssrInterpolate(msg.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card"><h2>Preferences</h2><label>Theme</label><input${ssrRenderAttr("value", theme.value)}><label>Notifications</label><input${ssrRenderAttr("value", notifications.value)}><button class="btn secondary">Save preferences</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=profile-6ZcCZ8jf.js.map
