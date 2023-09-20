<template>
    <div class="layout-wrapper tool-container">
        <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
            <el-tab-pane v-for="(item, index) in configList" :key="index" :label="item.label">
                <div class="tool-tab-container" v-if="item.data.length">
                    <div class="tool-tab-item" v-for="(it, id) in item.data" :key="id" @click="handelToUrl(it.url)">
                        <img class="tool-tab-img" :src="it.icon" alt="" srcset="" />
                        <div class="tool-tab-title">{{ it.title || '' }}</div>
                        <div class="tool-tab-description">{{ it.description || '' }}</div>
                    </div>
                </div>
                <div class="tool-tab-container" v-else>
                    <p>暂无数据</p>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const configList = reactive([
    {
        label: '技术专区', data: [{
            icon: 'http://cxy521.com/static/img/index/tech/cnblogs.png',
            url: 'https://www.cnblogs.com/',
            title: '博客园',
            description: '开发者的网上家园'
        }, {
            icon: 'http://cxy521.com/static/img/index/tech/csdn.png',
            url: 'https://www.csdn.net/',
            title: 'CSDN',
            description: '中文最大的技术社区'
        }, {
            icon: 'http://cxy521.com/static/img/index/tech/juejin.png',
            url: 'https://juejin.cn/',
            title: '掘金',
            description: '一个帮助开发者成长的社区'
        }, {
            icon: 'http://cxy521.com/static/img/index/tech/stackoverflow.svg',
            url: 'https://stackoverflow.com/',
            title: 'StackOverflow',
            description: '全球最大的技术问答社区'
        }]
    },
    {
        label: '学习专区', data: [{
            icon: 'http://cxy521.com/static/img/index/study/cn.ico',
            url: 'https://www.runoob.com/',
            title: '菜鸟教程',
            description: '学的不仅是技术，更是梦想！'
        }, {
            icon: 'http://cxy521.com/static/img/index/study/github.svg',
            url: 'https://github.com/',
            title: 'GitHub',
            description: '世界最大的开源代码共享社区'
        }, {
            icon: 'http://cxy521.com/static/img/index/study/gitee.png',
            url: 'https://gitee.com/',
            title: 'Gitee',
            description: '中国最大的开源代码共享社区'
        }, {
            icon: 'http://cxy521.com/static/img/index/study/w3.png',
            url: 'https://www.w3school.com.cn/',
            title: 'W3school',
            description: '全球最大的中文 Web 技术教程'
        }]
    },
    { label: '摸鱼专区', data: [] },
    { label: '资源专区', data: [] },
    { label: '私活专区', data: [] }])
const tabPosition = ref('right')
// 跳转页面
const handelToUrl = (url: string) => {
    window.open(url, '_blank')
}
</script>
<style>
.tool-container {
    .tool-tab-container {
        display: flex;
        justify-content: space-between;
        font-size: 14px;

        .tool-tab-item {
            font-size: 14px;
            text-align: center;
            cursor: pointer;

            .tool-tab-img {
                width: 42px;
                height: 42px;
            }
        }
    }
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}
</style>
