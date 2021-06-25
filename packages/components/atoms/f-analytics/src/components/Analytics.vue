<template>
    <div data-test-id="analytics" />
</template>

<script>

import { mapState, mapActions } from 'vuex';
import fAnalyticsModule from '../store/analyticsModule';

export default {
    name: 'Analytics',

    props: {
        gtmId: {
            type: String,
            default: 'GTM-XXXXXXX'
        },

        name: {
            type: String,
            default: ''
        },

        locale: {
            type: String,
            default: ''
        }
    },

    computed:
    {
        ...mapState('fAnalyticsModule', ['platformData'])
    },

    created () {
        if (!this.$store.hasModule('fAnalyticsModule')) {
            this.$store.registerModule('fAnalyticsModule', fAnalyticsModule);
        }

        if (this.isServerSide()) {
            // Only available serverside
            const platformData = { ...this.platformData };

            platformData.environment = process.env.justEatEnvironment || 'localhost';
            platformData.version = process.env.FEATURE_VERSION || '0.0.0.0';
            platformData.instancePosition = process.env.INSTANCE_POSITION || 'N/A';

            // Is of type `httponly` so need to read serverside
            platformData.jeUserPercentage = this.$cookies.get('je-user_percentage') || 0;

            this.updatePlatformData(platformData);
        }
    },

    mounted () {
        this.preparePage();
        this.prepareAnalytics();
        this.pushAnalytics();
    },

    methods: {
        ...mapActions('fAnalyticsModule', ['updatePlatformData']),

        isServerSide () {
            return typeof (window) === 'undefined';
        },

        preparePage () {
            if (!window.dataLayer) {
                const headJsGtmTag = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${this.gtmId}');`;
                const script = document.createElement('script');
                script.text = headJsGtmTag;
                document.head.prepend(script);

                const iframeTag = document.createElement('iframe');
                iframeTag.src = `https://www.googletagmanager.com/ns.html?id=${this.gtmId}`;
                iframeTag.setAttribute('height', 0);
                iframeTag.setAttribute('width', 0);
                iframeTag.style.display = 'none';
                iframeTag.style.visibility = 'hidden';
                const noScript = document.createElement('noscript');
                noScript.appendChild(iframeTag);
                document.body.prepend(noScript);
            }
        },

        prepareAnalytics () {
            const platformData = { ...this.platformData };

            platformData.name = this.name;
            platformData.appType = 'Web';
            platformData.applicationId = 7;
            platformData.userAgent = navigator.userAgent || 'N/A';
            platformData.branding = this.getBrand(this.locale);
            platformData.country = this.getCountry(this.locale);
            platformData.language = this.getLanguage(this.locale);
            platformData.currency = this.getCurrency(this.locale);

            this.updatePlatformData(platformData);
        },

        pushAnalytics () {
            const dataLayer = window.dataLayer || [];
            dataLayer.push({ platformData: { ...this.platformData } });
        },

        getLanguage (locale) {
            switch (locale) {
                case 'it-IT':
                    return 'it';
                case 'es-ES':
                    return 'es';
                default:
                    return 'en';
            }
        },

        getCountry (locale) {
            switch (locale) {
                case 'en-GB':
                    return 'UK';
                case 'en-IE':
                    return 'IE';
                case 'it-IT':
                    return 'IT';
                case 'es-ES':
                    return 'ES';
                case 'en-AU':
                    return 'AU';
                case 'en-NZ':
                    return 'NZ';
                default:
                    return '';
            }
        },

        getBrand (locale) {
            switch (locale) {
                case 'en-AU':
                case 'en-NZ':
                    return 'menulog';
                default:
                    return 'justeat';
            }
        },

        getCurrency (locale) {
            switch (locale) {
                case 'en-GB':
                    return 'GBP';
                case 'en-AU':
                    return 'AUD';
                case 'en-NZ':
                    return 'NZD';
                default:
                    return 'EUR';
            }
        }
    }
};
</script>
