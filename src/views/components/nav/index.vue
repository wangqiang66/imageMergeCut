<!--
  function: index
  author  : wq
  update  : 2018/8/15 16:16
-->
<template>
  <div
    @click.stop="openNavBox"
    @mouseleave.stop="closeNavBox"
    :class="['nav-box', status === 'close' ? 'nav-box-close': 'nav-box-open']">
    <div class="open-nav-box" v-if="status === 'close'">
      点击打开导航
    </div>
    <ul v-else>
      <li @click.stop="doScrollTop('head')">报告头部信息</li>
      <li @click.stop="doScrollTop('base-info')">个人基本信息</li>
      <li @click.stop="doScrollTop('summary-info')">信息概要</li>
      <li @click.stop="doScrollTop('loan-info')">贷  款</li>
      <li @click.stop="doScrollTop('debit-card-info')">贷记卡</li>
      <li @click.stop="doScrollTop('semi-credit-card-info')">准贷记卡</li>
      <li @click.stop="doScrollTop('guarantee-info')">担保信息</li>
      <li @click.stop="doScrollTop('public-details')">公共信息明细</li>
      <li @click.stop="doScrollTop('query-details')">查询记录</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nav-box',
  data () {
    return {
      status: 'close'
    }
  },
  methods: {
    openNavBox () {
      this.status = 'open'
    },
    closeNavBox (e) {
      if (this.status === 'open') {
        this.status = 'close'
      }
    },
    doScrollTop (id) {
      const node = document.getElementById(id)
      node && node.scrollIntoView()
    }
  }
}
</script>

<style lang="scss">
  .nav-box {
    position: fixed;
    left: 0;
    width: 1px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    & > .open-nav-box {
      background-color: rgba(0,0,0,0.5);
      width: 36px;
      padding: 10px 8px;
      margin-left: 1px;
      text-align: center;
      border-radius: 6px;
      color: #f2f2f2;
    }
    & > ul {
      margin-left: 0;
      background-color: #444;
      color: #fff;
      text-align: center;
      & > li {
        height: 30px;
        line-height: 30px;
        border: 1px solid #666;
        padding: 0 8px;
        width: 100px;
      }
    }
  }
</style>
