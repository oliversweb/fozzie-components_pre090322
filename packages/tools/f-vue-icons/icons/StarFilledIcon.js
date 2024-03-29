import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'StarFilledIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "-0.02 0.16 18.03 17.01"
      },
      "class": "c-ficon c-ficon--star-filled"
    }, ctx.data]), [h("defs", [h("path", {
      attrs: {
        id: "star-filled-a",
        d: "m12 17.3 4.8 2.8a.7.7 0 0 0 1-.7L16.5 14l4.3-3.7a.7.7 0 0 0-.4-1.2l-5.6-.5-2.2-5.1a.7.7 0 0 0-1.2 0L9.2 8.6l-5.6.5a.7.7 0 0 0-.4 1.2L7.5 14l-1.3 5.4a.7.7 0 0 0 1 .7l4.8-2.8z"
      }
    })]), h("use", {
      attrs: {
        fill: "#FF8000",
        "fill-rule": "evenodd",
        transform: "translate(-3 -3)",
        href: "#star-filled-a"
      }
    })]);
  }
};