import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'SuccessIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24"
      },
      "class": "c-ficon c-ficon--success"
    }, ctx.data]), [h("g", {
      attrs: {
        "fill-rule": "evenodd",
        transform: "translate(-2 -2)"
      }
    }, [h("path", {
      attrs: {
        d: "M24.446 8.781l-11.27 11.27a1.24 1.24 0 01-1.755 0l-5.057-5.056a1.24 1.24 0 011.756-1.75l4.178 4.178L23.079 6.641a11.814 11.814 0 101.366 2.148l.001-.008z"
      }
    })])]);
  }
};