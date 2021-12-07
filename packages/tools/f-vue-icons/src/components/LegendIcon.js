export default {
    name: 'LegendIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 8.5 283.4 118.7" class="c-ficon c-ficon--legend" {...ctx.data}><g id="legend"><path fill="#FF8000" d="M247.1 9.2c-20.1 0-36.4 16.3-36.4 36.4 0 17 26 57.2 34 69.3 1.1 1.7 3.6 1.7 4.7 0 8.1-12.1 34-52.3 34-69.3.1-20.1-16.2-36.4-36.3-36.4zm0 59.8c-12.9 0-23.4-10.5-23.4-23.4s10.5-23.4 23.4-23.4c12.9 0 23.4 10.5 23.4 23.4S260 69 247.1 69z"></path><path fill="#FF8000" d="m247.1 26.8 4.9 11.9 12.3 1.3-9.2 8.6 2.6 12.6-10.6-6.6-10.7 6.6 2.7-12.6-9.2-8.6 12.3-1.3z"></path><path fill="#242E30" d="M0 13.2h13.5v44.2H37v11.5H0V13.2zm40.8 34.6c0-10.4 7.3-22.2 22.7-22.2 15.4 0 22.7 11.8 22.7 22.2S78.9 70 63.5 70c-15.4-.1-22.7-11.9-22.7-22.2zm22.7 10.1c5.3 0 9.8-4.2 9.8-10.2 0-6-4.5-10.2-9.8-10.2-5.3 0-9.8 4.2-9.8 10.2.1 6 4.5 10.2 9.8 10.2zm26.8-10.1c0-10.4 6.9-22.2 22.3-22.2 7.1 0 12.6 3.1 15.9 6.9l-8.6 8.5c-1.8-2.1-4.5-3.2-7.4-3.2-5.2 0-9.3 4-9.3 10s4.1 10 9.3 10c2.8 0 5.6-1.2 7.4-3.2l8.6 8.5c-3.3 3.8-8.7 6.8-15.8 6.8-15.4 0-22.4-11.8-22.4-22.1zm42 9.2c0-7.7 5.7-12.1 17.6-12.7l10.5-.5v-.2c0-5-3.7-6.9-8.5-6.9-3.9 0-7.5 1.3-9.3 3.3l-7.7-7.4c3.3-3.9 9.6-7 18.3-7 12.6 0 19.9 6.9 19.9 17.4v25.9h-11.9v-4.1h-.2c-2.6 3.3-7.1 5.1-12.7 5.1-8.9 0-16-4.7-16-12.9zm28.2-3.6v-1.2l-8.9.5c-4.3.3-6.5 1.5-6.5 4.1 0 2.9 2.8 4.2 6.3 4.2 5.2 0 9.1-2.9 9.1-7.6zm18.8-44.9H192v60.4h-12.7V8.5zM.4 76.5H6v33.9h16.2v5H.4V76.5zm24.8 24.1c0-9.2 5.9-15.5 14.5-15.5 8.7 0 14.7 6.2 14.7 15.3 0 .7-.1 1.4-.1 2H30.6c.3 5.1 4.5 8.9 9.5 8.9 4.2 0 7.2-1.8 9.2-4l3.3 3.3c-2.7 3.5-7.1 5.5-12.6 5.5-8.8 0-14.8-6.3-14.8-15.5zm5.5-2.7h18.2c-.4-4.2-3.8-8.1-9.2-8.1-5.4 0-8.6 3.8-9 8.1zm31.8 24.6L66 119c1.8 1.9 4.8 3.3 8.3 3.3 5.4 0 8.9-2.5 8.9-8.4v-3.2H83c-2.2 2.8-5.1 4.2-9.6 4.2-8.3 0-14.2-6.3-14.2-14.9 0-8.6 6-14.8 14.2-14.8 4.5 0 8.1 1.9 9.8 4.6h.1v-3.9h5v28.5c0 7.4-4.9 12.8-13.9 12.8-5.4 0-9.5-2.1-11.9-4.7zm20.6-22.6c0-6-4.1-10.2-9.2-10.2-5.2 0-9.3 4.2-9.3 10.2 0 6 4.1 10.2 9.3 10.2 5.1 0 9.2-4.2 9.2-10.2zm11.5.7c0-9.2 5.9-15.5 14.5-15.5 8.7 0 14.7 6.2 14.7 15.3 0 .7-.1 1.4-.1 2H100c.3 5.1 4.5 8.9 9.5 8.9 4.2 0 7.2-1.8 9.2-4l3.3 3.3c-2.7 3.5-7.1 5.5-12.6 5.5-8.8 0-14.8-6.3-14.8-15.5zm5.5-2.7h18.2c-.4-4.2-3.8-8.1-9.2-8.1-5.4 0-8.6 3.8-9 8.1zM130 85.8h5v3h.1c1.6-2.2 4.7-3.7 8.7-3.7 7.4 0 12.1 4.5 12.1 12.4v17.8h-5.3V98.6c0-5.6-2.7-8.7-7.7-8.7-4.8 0-7.8 3.1-7.8 8.7v16.8H130V85.8zm31.4 14.8c0-8.3 5.7-15.5 15-15.5 4.8 0 7.9 1.6 10.3 4.3h.1V73.2h5.3v42.2h-5v-3.9h-.1c-2 2.8-5.7 4.6-10.5 4.6-9.4 0-15.1-7.2-15.1-15.5zm25.4 0c0-6.3-4.4-10.7-9.9-10.7-5.6 0-10 4.4-10 10.7 0 6.3 4.4 10.7 10 10.7 5.5 0 9.9-4.4 9.9-10.7z"></path></g></svg>;
    }
};
