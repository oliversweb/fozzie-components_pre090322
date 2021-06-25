// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import analytics from '../src/components/Analytics.vue';

export default {
    title: 'Components/Atoms',
    decorators: [withA11y]
};

export const AnalyticsComponent = () => ({
    components: { analytics },
    props: {
        gtmIdd: 'GTM-123456A',
        name: 'test-harness',
        locale: 'en-GB'
    },
    template: '<analytics />'
});

AnalyticsComponent.storyName = 'f-analytics';
