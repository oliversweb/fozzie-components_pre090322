export default {
    name: 'OfferIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.07 51.22" class="c-ficon c-ficon--offer" {...ctx.data}><g fill="none"><path d="M8.81 42.306c-.4-2.8 0-3.2-2.6-4-2.5-.6-5.1-1-5-3.1 0-2 2.4-3.2 2.1-5.7-.2-2.4-1.4-2.6-1.7-5.2-.3-2.6.1-2.5 1.4-4 1.4-1.4 2.1-3.3 2.1-5.3s.4-4 1.3-4.4c1-.4 3.3.3 4.6-.5 1.2-.9 1.7-2.2 2.6-3.8.9-1.6 2-3.2 3.6-3.2 1.8 0 4 1.7 5.3 1.3 1.3-.5 2.3-1.7 3.7-2.4 1.4-.7 3-1 4 .5a2.9 2.9 0 0 0 3.8.7c1.2-.6 2.8-1.8 3-.5.4 1.3.5 3.4 2.6 3 2-.3 4.3-1.3 4.8.5.5 2 .4 5 2.6 5.8 2.3.8 3.8.7 3.3 3.7-.4 3-.6 4.8.8 6 1.4 1.2 2 2.6 1 4-1 1.3-2.6 4.1-2.2 6.4.3 2.3.4 3.7-1.3 4.8-1.8 1.1-3.7.8-4.4 3.3-.6 2.6-1 4.3-2.5 4.7-1.4.4-3.6-.8-5.3 1.1-1.7 2-1.4 4-3.8 3.3-2.3-.8-3.8-3-6.4-1.5-2.5 1.6-4.5 3.6-6.4 1.6-2-2-3-3.6-5.4-3.2-2.5.5-5 .6-5.6-3.9Z" fill="#FFB727"></path><path d="M16.81 22.406c1.8-.3 4.7-.4 5.2-.6.4-.2.6-.3 2-2.6 1.3-2.3 2.1-4.2 3.1-3.6 1 .6 1.9 3.1 2.6 4.7.8 1.6 2.5 1.3 4.1 1.7 1 .1 1.7.8 1.9 1.8 0 0-4 1.3-4 3.3 0 2 .9 4 .7 5.5-.1 1.5-3 .5-3 .5l-3.2-2.4-3.7 2.6c-1.7 1.1-3.8 3.3-3.2.6l1.2-5.5-1.2-2.5-2.5-1.3s-1.6-2.1 0-2.3v.1Z" fill="#FFF"></path><path d="M33.31 2.906c-1.3-.7-2.2-2-3.5-2.6a3.8 3.8 0 0 0-3.7.4c-1 .7-2 2-3.1 2.4-.9.2-1.7-.4-2.4-.7a6 6 0 0 0-2.4-.6c-1.5 0-3 .6-4 1.7-1.1 1-1.5 2.5-2 3.9-.3.7-.8 1.2-1.5 1.5h-2.8c-1.4.1-2.7 1-3.3 2.4-.6 1.5-.3 3-.3 4.6 0 1-.3 2-1 2.5l-2 1.5a5 5 0 0 0-.5 6.1c.5.7 1.4 1.2 1.6 2 .6 1.7-1.4 3.7-2 5.3a4 4 0 0 0 .7 4.2c1 .8 2.2 1.4 3.5 1.5 1.2.3 2.6.6 3 2 .4 1.3 0 2.7.4 4a3.6 3.6 0 0 0 2.7 2.7c1.6.4 3-.4 4.5-.4s2.2 1.4 3.2 2.4 2.3 1.6 3.6 1.5c1.5-.1 2.6-1 3.7-1.8.5-.4 1.2-.7 1.8-.7.9 0 1.7.4 2.4 1 1.2.8 2.7 1 4 .4 1-.6 2-1.5 2.5-2.6.3-.5.7-.9 1.2-1.2.8-.3 2 .2 3 .1a5 5 0 0 0 3.6-2.2c1-1.3.5-3 1.8-4.1 1.8-1.7 4.8-2.3 5.3-5 .4-2-.9-4 0-6 .7-1.6 2.4-2.8 2.7-4.6.3-1.4-.6-2.5-1.4-3.5-.6-.4-1-1-1.3-1.6-.2-.8-.2-1.7.1-2.5.3-1.4.6-2.8-.2-4.1-.8-1.3-2.4-1.4-3.7-2-1.4-.6-1.1-2.6-1.3-3.8-.2-1.3-1-2.4-2.3-2.8-.8-.2-1.6-.2-2.4 0-.7 0-2 .6-2.5.1-.4-.4-.3-1.3-.5-1.8-.2-.7-.7-1.3-1.4-1.5-1.7-.4-3.7 1.2-5.1 2-1.5.6-.2 2.5 1.1 1.9.8-.4 1.6-1 2.5-1.3l.4-.2c.3-.2.5-.1.5.2l.1 1a3 3 0 0 0 2.8 2.1c1.2 0 3.6-1.2 4.3 0 .7 1.1.4 2.5.8 3.6.3 1.2 1.1 2 2.3 2.5 1.2.5 2.8.5 2.7 2.2-.1 1.3-.6 2.5-.5 3.9.2 1.3.9 2.5 1.9 3.4.4.4 1 .8 1 1.4 0 .6-.7 1.4-1 2a8.6 8.6 0 0 0-2.1 4.7c-.1 1.4 1 3.2.2 4.5-.5 1-1.8 1.5-2.7 2a8 8 0 0 0-2.5 2.2c-1 1.3-.6 3.1-1.8 4.2-1.4 1.3-3 .2-4.5.6-1 .3-2 1-2.6 1.8-.5.8-1.1 2.1-2.1 2.3-1.3.2-2.8-1.3-4-1.6-1.2-.3-2.5 0-3.5.6s-2.3 2-3.5 1.9c-1.1 0-1.9-1.3-2.6-2-.8-1-2-1.8-3.2-2-1.4-.2-2.7.4-4 .4-1.8.1-1.7-1.4-1.8-2.7 0-2.6-.7-4.6-3.3-5.5-1-.4-2.3-.5-3.3-1-1.8-.8-.8-2.7 0-4a7.2 7.2 0 0 0 1.3-4.3c-.2-1.7-1.7-2.3-2.3-3.7-.5-1.3 0-2.8 1.2-3.5a5 5 0 0 0 2.6-3.4c.3-1.6-.4-3.4.2-5 .6-1.8 3-.9 4.6-1.2a4.5 4.5 0 0 0 3-2.9c.6-1.3.9-2.9 2.3-3.7 1.8-1 3 .1 4.8.6 1.4.5 2.9.1 4-.8.9-.7 2-2.4 3.3-2 1.3.3 2.3 2 3.5 2.6 1.3.5 2.4-1.3 1.1-2l.1.1Z" fill="#4C4C4C"></path><path d="M24.01 21.706a26.6 26.6 0 0 1 2-3.1l.5-.6.6-.5v-.1l.4-.3s.5-.4.6-.3a1 1 0 0 1-1 0 .6.6 0 0 1-.2-.3l.2.3.2.5c-.1-.3 0 0 0 .1l.4 1 1 3.6c.1.8 1 1.3 1.8 1 .7-.2 1.2-1 1-1.8a23.5 23.5 0 0 0-1.4-4.9c-.3-.7-.6-1.3-1-1.8a2 2 0 0 0-2.5-.3 11.3 11.3 0 0 0-3.5 3.3c-.7.8-1.2 1.7-1.7 2.7a1.5 1.5 0 1 0 2.6 1.5Z" fill="#FFF"></path><path d="M22.81 20.006a18.7 18.7 0 0 0-6.9 1 2.5 2.5 0 0 0-1.1 3.4 8 8 0 0 0 2.5 2.4 15 15 0 0 0 3.3 1.8c.8.2 1.6-.3 1.8-1 .2-.8-.2-1.6-1-1.9h-.2c.2 0 .2 0 0 0l-.3-.2-.8-.4c-.4-.2-.9-.5-1.3-.9l-.2-.1c.1.1.1.1 0 0l-.3-.2-.6-.6-.3-.2c-.2-.3.1.1 0-.1 0-.3 0-.1 0 0v.5c0-.3-.3.2 0 0h-.1.1c.3-.2 0 0 0 0l.4-.1 1.6-.3h.6l1-.1h1.7c.9 0 1.5-.7 1.5-1.5s-.6-1.5-1.5-1.5h.1Zm8.1 3.3h1.4l.9.1h.5l1.5.5.2.2-.1-.1-.1-.1-.2-.5.1-.4c.1-.1 0 0 0 0 .1 0 .1 0 0 0l-.2.1-.7.5-1.5 1-3 1.6c-.8.4-1 1.3-.6 2 .4.6 1.3.9 2 .5 2-.9 3.8-2 5.5-3.2.6-.3 1-1 1.3-1.6.2-.8 0-1.6-.6-2.2-.9-.7-2-1.1-3.1-1.2-1.3-.2-2.7-.2-4 0a1.5 1.5 0 0 0-1 1.8c.2.8 1 1.2 1.8 1h-.1Z" fill="#FFF"></path><path d="M19.61 26.806c-1.2 2-1.8 4.4-1.7 6.8 0 .8.3 1.6 1 2.1.7.4 1.6.4 2.3.2a9.7 9.7 0 0 0 3.1-2c1-1 1.9-1.9 2.7-3a1.5 1.5 0 0 0-.6-2c-.7-.4-1.6-.2-2 .5l-.1.2c0-.2 0-.2 0 0l-.3.3a16.5 16.5 0 0 1-1.8 1.8l-.7.5-.4.4-.8.4c.4-.1 0 0 0 0-.1 0-.2 0 0 0h-.3.4c.3.2.5.5.5.8 0 .1 0 .1 0 0v-.3a7.8 7.8 0 0 1 0-1.6c0-.2 0-.2 0 0v-.3l.1-.3a11.5 11.5 0 0 1 .8-2.1l.4-.9a1.5 1.5 0 0 0-2.6-1.5Z" fill="#FFF"></path><path d="m29.21 28.106 1.5 3.5.4.7v.2c.2 0 .1.1 0 0l.2.3v.1-.1.1c0-.2.1-.2 0-.1-.1 0 0 0 0-.1l.2-.1.3-.1h.3-.3.1l-.2-.1-.8-.4a32.3 32.3 0 0 1-4.2-2.8c-.7-.3-1.6-.1-2 .6-.4.7-.1 1.6.6 2a35 35 0 0 0 5 3.1c.8.6 1.8.7 2.7.3.8-.5 1.3-1.3 1.3-2.2 0-.7-.2-1.5-.6-2.2l-.8-1.8-.5-1-.2-.5c.2.3 0-.2 0-.3-.2-.3-.4-.7-.8-.9-.3-.2-.7-.2-1.1-.1-.8.2-1.2 1-1 1.8l-.1.1Z" fill="#FFF"></path></g></svg>;
    }
};
