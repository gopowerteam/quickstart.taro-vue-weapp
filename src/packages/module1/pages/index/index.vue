<template>
    <view class="index">
        <text>{{ msg }}</text>
        <button @tap="onaa">aaaaM</button>
    </view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Taro from '@tarojs/taro'
import './index.less'

export default defineComponent({
    setup() {
        const msg = ref('Hello world 111')
        const onaa = () => {
            Taro.navigateTo({ url: '/packages/index/pages/page1/page1' })
        }
        return {
            msg,
            onaa
        }
    }
})
</script>
