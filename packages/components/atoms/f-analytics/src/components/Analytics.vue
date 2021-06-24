<template>
    <div data-test-id="analytics">
        I am the one and only 'f-analytics' component
    </div>
</template>

<script>
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

    data () {
        return {
            platformData: {
                environment: '',
                name: this.name,
                appType: 'Web',
                applicationId: 7,
                userAgent: '',
                branding: '',
                country: '',
                language: '',
                jeUserPercentage: 0,
                currency: '',
                version: '',
                instancePosition: ''
            }
        };
    },

    created () {
        if (process.server) {
            // Only available serverside
            this.platformData.environment = process.env.justEatEnvironment || 'N/A';
            this.platformData.version = process.env.FEATURE_VERSION || 'N/A';
            this.platformData.instancePosition = process.env.INSTANCE_POSITION || 'N/A';
            // Is of type `httponly` so need to read serverside
            this.platformData.jeUserPercentage = this.$cookies['je-user_percentage'] || 0;
        }
    },

    mounted () {
        this.preparePage();
        this.prepareAnalytics();
        this.pushAnalytics();
    },

    methods: {
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
            this.platformData.userAgent = navigator.userAgent || 'N/A';
            this.platformData.branding = this.getBrand(this.locale);
            this.platformData.country = this.getCountry(this.locale);
            this.platformData.language = this.getLanguage(this.locale);
            this.platformData.currency = this.getCurrency(this.locale);
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
