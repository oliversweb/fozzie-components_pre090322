<template>
    <div :class="$style['c-restaurantCarousel']">
        <heading :class="$style['c-restaurantCarousel-heading']" />
        <text-block :class="$style['c-restaurantCarousel-desc']" />
        <div :class="$style['c-restaurantCarousel-list']">
            <restaurant-card :class="$style['c-restaurantCarousel-item']" />
            <restaurant-card :class="$style['c-restaurantCarousel-item']" />
            <restaurant-card :class="$style['c-restaurantCarousel-item']" />
        </div>
    </div>
</template>

<script>
import TextBlock from './Text.vue';
import Heading from './Heading.vue';
import RestaurantCard from './RestaurantCard.vue';

export default {
    components: {
        Heading,
        TextBlock,
        RestaurantCard
    }
};
</script>

<style lang="scss" module>
$breakpoints: (medium: 520px, large: 960px);

.c-restaurantCarousel {
    margin: auto;
    padding-top: spacing();
    margin-bottom: spacing(d);
}

.c-restaurantCarousel-heading {
    margin-bottom: spacing();
    max-width: 300px;
}

.c-restaurantCarousel-desc {
    margin-bottom: spacing(d);
    max-width: 425px;
}

.c-restaurantCarousel-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.c-restaurantCarousel-item {
    flex: 1;
    display: none;

    &:nth-child(1) {
        display: block;
    }
    @include media('>medium') {
        margin: 0 spacing(d) 0 0;
        &:nth-child(2) {
            display: block;
        }
    }
    @include media('>large') {
        &:nth-child(3) {
            display: block;
        }
    }
}
</style>
