<template>
    <view class="index">
        <text>{{ msg }}</text>
    </view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import './page1.less'

export default defineComponent({
    setup() {
        const msg = ref('Hello world 222')
        return {
            msg
        }
    }
})
</script>
