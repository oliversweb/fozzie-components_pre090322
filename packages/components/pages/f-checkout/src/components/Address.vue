<template>
    <div data-test-id='address-component'>
        <fieldset :class="$style['c-address-group']">
            <legend
                :class="$style['c-address-label']"
                @click="addFocus">
                {{ $t('labels.addressGroup') }}
            </legend>
            <checkout-form-field
                field-name="line1"
                :field-type="fieldType"
                :class="$style['c-address-formField']"
                is-grouped />

            <checkout-form-field
                field-name="line2"
                :field-type="fieldType"
                :class="$style['c-address-formField']"
                is-grouped />
        </fieldset>

        <checkout-form-field
            field-name="locality"
            :field-type="fieldType"
            :max-length="fieldLength" />

        <checkout-form-field
            v-if="shouldShowAdministrativeArea"
            field-name="administrativeArea"
            :field-type="fieldType"
            :max-length="fieldLength" />

        <checkout-form-field
            field-name="postcode"
            :field-type="fieldType"
            :max-length="fieldLength" />
    </div>
</template>

<script>
import CheckoutFormField from './CheckoutFormField.vue';

export default {
    name: 'CheckoutAddress',
    components: { CheckoutFormField },

    props: {
        shouldShowAdministrativeArea: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            fieldType: 'address',
            fieldLength: '50'
        };
    },

    methods: {
        addFocus () {
            document.getElementById('formField-line-1').focus();
        }
    }
};
</script>

<style lang="scss" module>
$address-colour          : $color-content-default;
$address-fontSize        : 'body-s';
$address-weight-bold     : $font-weight-bold;

.c-address-label {
    color: $address-colour;
    @include font-size($address-fontSize);
    font-weight: $address-weight-bold;
    margin: spacing(d) 0 spacing();
}

.c-address-group {
    margin: spacing(d) 0;
    padding: 0;
    border: none;
    @include font-size($address-fontSize);

    .c-address-formField {
        &:focus-within,
        &:active {
            z-index: zIndex(high);
            position: relative;
        }
    }
}
</style>
