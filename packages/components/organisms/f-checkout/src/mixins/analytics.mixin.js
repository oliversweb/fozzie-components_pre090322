import Trak from '@justeat/f-trak';
import { mapState } from 'vuex';

export default {
    computed: mapState('checkout', [
        'isLoggedIn',
        'basket',
        'restaurantId',
        'autofill',
        'changes'
    ]),

    methods: {
        /**
         * Pushes `form` event to the data layer with correct data
         *
         * @param {object} eventData An object containing data to be pushed to the dataLayer
         */
        trackFormAction (action, error) {
            const formName = this.isLoggedIn ? 'checkout' : 'checkout_guest';

            Trak.event({
                event: 'Form',
                custom: {
                    form: {
                        name: formName,
                        action,
                        error,
                        autofill: this.autofill,
                        changes: this.changes
                    }
                }
            });
        },

        /**
         * Pushes initial state of checkout to the dataLayer.
         *
         * @param {object} eventData An object containing data to be pushed to the dataLayer
         */
        trackFormLoad () {
            window.dataLayer = window.dataLayer || [];

            const pageName = this.isLoggedIn ? 'Overview' : 'Guest';

            Trak.event({
                custom: {
                    checkout: {
                        step: 1
                    },
                    basket: this.basket,
                    restaurant: {
                        id: this.restaurantId
                    },
                    pageData: {
                        name: `Checkout 1 ${pageName}`,
                        group: 'Checkout'
                    }
                }
            });

            this.trackFormAction('start')
        }
    }
};

            // const {
            //     action, isLoggedIn, error, changes, autofill
            // } = eventData;

            // const error = eventData.error && cleanFields(eventData.error);
            // const changes = eventData.changes && cleanFields(eventData.changes);
            // const autofill = eventData.autofill && cleanFields(eventData.autofill);
