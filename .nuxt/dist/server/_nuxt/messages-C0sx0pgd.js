import { _ as __nuxt_component_0$1 } from "./MarkdownView-BT6aBCpW.js";
import { defineComponent, mergeProps, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "../server.mjs";
import "hookable";
import "marked";
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MessageThread",
  __ssrInlineRender: true,
  props: {
    messages: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MarkdownView = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "thread" }, _attrs))} data-v-de86a60e><!--[-->`);
      ssrRenderList(_ctx.messages, (m) => {
        _push(`<div class="msg" data-v-de86a60e><div class="msg-meta" data-v-de86a60e><strong data-v-de86a60e>${ssrInterpolate(m.sender_first)} ${ssrInterpolate(m.sender_last)}</strong><span class="muted" data-v-de86a60e>${ssrInterpolate(m.created_at)}</span></div>`);
        _push(ssrRenderComponent(_component_MarkdownView, {
          source: m.body
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MessageThread.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-de86a60e"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "messages",
  __ssrInlineRender: true,
  setup(__props) {
    const threads = ref([]);
    ref(null);
    const messages = ref([]);
    const draft = ref("");
    const recipientId = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MessageThread = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Secure messages</h1><div class="card"><label>Thread</label><select><!--[-->`);
      ssrRenderList(threads.value, (t) => {
        _push(`<option${ssrRenderAttr("value", t.thread_id)}>Thread #${ssrInterpolate(t.thread_id)}</option>`);
      });
      _push(`<!--]--></select></div><div class="card">`);
      _push(ssrRenderComponent(_component_MessageThread, { messages: messages.value }, null, _parent));
      _push(`</div><div class="card"><h2>Reply</h2><textarea rows="3" placeholder="Write a message (markdown supported)">${ssrInterpolate(draft.value)}</textarea><input${ssrRenderAttr("value", recipientId.value)} type="number" placeholder="Recipient user id"><button class="btn">Send</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/messages.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=messages-C0sx0pgd.js.map
