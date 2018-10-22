// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import store from '@/store'
import FormLabel from '@/components/form/formLabel'
import FormInput from '@/components/form/formInput'
import State24Comp from '@/containers/state24/state24Comp'
import VuePreview from 'vue2-preview'
import router from './route'
import 'element-ui/lib/theme-chalk/index.css'
import './css/_normalize.scss'
import './css/main.scss'
import './css/base.scss'

Vue.use(ElementUI)
Vue.use(VuePreview)
Vue.config.productionTip = false
Vue.component('form-label', FormLabel)
Vue.component('form-input', FormInput)
Vue.component('state24-comp', State24Comp)
/* eslint-disable no-new */
window.storeGlobalIoc = {}
const layui = window.layui
layui.use([ 'layer', 'laydate' ], function () {
  new Vue({
    el: '#app',
    store,
    router,
    render () {
      return (
        <router-view></router-view>
      )
    }
  })
})
