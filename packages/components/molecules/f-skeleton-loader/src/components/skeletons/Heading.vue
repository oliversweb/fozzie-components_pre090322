<template>
    <div
        :class="$style['c-heading']" />
</template>

<script>
export default {
    name: 'SkeletonHeading'
};
</script>


<style lang="scss" module>
.c-heading {
    height: $skeleton-loader-heading-height;
    width: 65%;
    border-radius: $radius-rounded-a;
}
</style>
