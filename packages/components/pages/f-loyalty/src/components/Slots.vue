<template>
    <div>
        <div v-if="!hasInProgressStampcards && !hasRedeemableStampcards">
            <no-cards-error-state engagement-label="no_cards" />
        </div>
        <template v-if="hasRedeemableStampcards">
            <h2
                data-test-id="section-readyToClaim-title"
                :class="$style['c-loyalty-stampCardsSlotTitle']">
                {{ $t('tabs.stamps.readyToClaimTitle') }}
            </h2>
            <div
                :class="$style['c-loyalty-stampCardsSlotCardsContainer']"
                data-test-id="section-readyToClaim">
                <stamp-card
                    v-for="(card, index) in redeemableStampcards"
                    :key="`redeemable-${index}_${card.id}`"
                    :class="$style['c-loyalty-stampCardsSlot-stampCard']"
                    :card="card" />
            </div>
        </template>
        <template v-if="hasInProgressStampcards">
            <h2
                data-test-id="section-inProgress-title"
                :class="$style['c-loyalty-stampCardsSlotTitle']">
                {{ $t('tabs.stamps.inProgressTitle') }}
            </h2>
            <div
                :class="$style['c-loyalty-stampCardsSlotCardsContainer']"
                data-test-id="section-inProgress">
                <stamp-card
                    v-for="(card, index) in inProgressStampcards"
                    :key="`inProgress-${index}_${card.id}`"
                    :class="$style['c-loyalty-stampCardsSlot-stampCard']"
                    :card="card" />
            </div>
        </template>
        <template v-if="hasParticipatingRestaurantsCards">
            <h2
                data-test-id="section-participatingRestaurants-title"
                :class="$style['c-loyalty-stampCardsSlotTitle']">
                {{ $t('tabs.stamps.participatingRestaurantsTitle') }}
            </h2>
            <i18n
                v-if="location"
                path="tabs.stamps.participatingRestaurantsSubtitle"
                tag="p"
                :class="$style['c-loyalty-stampCardsSlotSubtitle']">
                <template #location>
                    <strong>{{ location }}</strong>
                </template>
            </i18n>
            <div
                data-test-id="section-participatingRestaurants"
                :class="$style['c-loyalty-stampCardsSlotCardsContainer']">
                <stamp-card-promotion-card
                    v-for="(card, index) in participatingRestaurantsCards"
                    :key="`promotion-${index}_${card.id}`"
                    :class="[
                        $style['c-loyalty-stampCardsSlot-stampCard'],
                        $style['c-loyalty-stampCardsSlot-promoCard']
                    ]"
                    :card="card" />
            </div>
        </template>

        <terms />
    </div>
</template>

<script>
import {
    StampCard1 as StampCard,
    StampCardPromotionCard
} from '@justeat/f-content-cards';

import NoCardsErrorState from './NoCardsErrorState.vue';
import Terms from './Terms.vue';

const modeOfArray = (arr = []) => {
    const frequencyDictionary = {};
    arr.forEach(item => {
        frequencyDictionary[item] = (frequencyDictionary[item] !== undefined)
            ? frequencyDictionary[item] + 1
            : 1;
    });
    return Object.entries(frequencyDictionary)
        .sort((a, b) => a[1] - b[1])
        .pop()?.[0];
};

export default {
    name: 'StampCardsSlot',

    components: {
        NoCardsErrorState,
        StampCard,
        StampCardPromotionCard,
        Terms
    },

    props: {
        cards: {
            type: Array,
            default: () => ([])
        }
    },

    data () {
        return {
            location: null
        };
    },

    computed: {
        redeemableStampcards () {
            return this.cards.filter(card => (card.type === 'Stamp_Card_1'
                && [true, 'true'].includes(card.isReadyToClaim)));
        },

        inProgressStampcards () {
            return this.cards.filter(card => (card.type === 'Stamp_Card_1'
                && [false, 'false'].includes(card.isReadyToClaim)))
                .map(card => ({
                    ...card,
                    isReadyToClaim: false
                }));
        },

        participatingRestaurantsCards () {
            return this.cards.filter(card => card.type === 'StampCard_Promotion_Card_1');
        },

        mostFrequentLocation () {
            return modeOfArray(this.participatingRestaurantsCards.filter(c => c.location)
                .map(c => c.location));
        },

        hasRedeemableStampcards () {
            return this.redeemableStampcards.length > 0;
        },

        hasInProgressStampcards () {
            return this.inProgressStampcards.length > 0;
        },

        hasParticipatingRestaurantsCards () {
            return this.participatingRestaurantsCards.length > 0;
        }
    },

    watch: {
        mostFrequentLocation (value) {
            if (this.location) {
                return;
            }
            this.location = value;
        }
    },

    created () {
        this.location = this.mostFrequentLocation;
    }
};
</script>

<style lang="scss" module>
$stampCard-responsive-tabletViewBreakpoint: '<=wide';
$stampCard-responsive-mobileViewBreakpoint: '<=narrowMid';

.c-loyalty-stampCardsSlotCardsContainer {
    margin: spacing() 0;
    display: grid;
    grid-gap: spacing(d);
    grid-template-columns: repeat(3, minmax(0, 1fr));

    @include media($stampCard-responsive-tabletViewBreakpoint) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include media($stampCard-responsive-mobileViewBreakpoint) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .c-loyalty-stampCardsSlot-stampCard {
        overflow: auto;
        width: 100%;
        background-color: $color-white;
    }
}

.c-loyalty-stampCardsSlotTitle {
    width: 100%;
    margin: spacing(f) spacing() spacing();
}

.c-loyalty-stampCardsSlotSubtitle {
    width: 100%;
    margin: spacing();
}

// Workaround to force size of restaurant icon to 48x48 until we integrate a version of f-content-cards that
// fixes the stamp card promo card
.c-loyalty-stampCardsSlot-promoCard [class^='StampCardPromotionCard_c-stampCardPromotion1-info'] img {
    width: 48px;
    height: 48px;
}
</style>
