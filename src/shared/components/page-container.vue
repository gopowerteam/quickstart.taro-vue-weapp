<template>
    <View></View>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        allowBack: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    components: {},
    setup() {
        return {}
    }
})
</script>
