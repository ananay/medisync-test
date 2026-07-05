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
  __name: "labs",
  __ssrInlineRender: true,
  setup(__props) {
    const filename = ref("");
    const content = ref("");
    const uploadMsg = ref("");
    const xml = ref("");
    const xmlMsg = ref("");
    const readName = ref("");
    const fileContent = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Lab uploads</h1><div class="card"><h2>Upload lab file</h2><label>Filename</label><input${ssrRenderAttr("value", filename.value)} placeholder="cbc-2026.txt"><label>Contents</label><textarea rows="4">${ssrInterpolate(content.value)}</textarea><button class="btn">Upload</button>`);
      if (uploadMsg.value) {
        _push(`<p class="muted">${ssrInterpolate(uploadMsg.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="card"><h2>Import lab XML</h2><textarea rows="6" placeholder="&lt;lab&gt;&lt;title&gt;CBC&lt;/title&gt;&lt;value&gt;normal&lt;/value&gt;&lt;/lab&gt;">${ssrInterpolate(xml.value)}</textarea><button class="btn">Import XML</button>`);
      if (xmlMsg.value) {
        _push(`<p class="muted">${ssrInterpolate(xmlMsg.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="card"><h2>Read uploaded file</h2><input${ssrRenderAttr("value", readName.value)} placeholder="cbc-2026.txt"><button class="btn secondary">Read</button>`);
      if (fileContent.value) {
        _push(`<pre>${ssrInterpolate(fileContent.value)}</pre>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/labs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=labs-D2-7hf7Z.js.map
