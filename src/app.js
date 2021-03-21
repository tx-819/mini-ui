import Vue from "vue";
import Button from "./button.vue";
import Icon from "./icon.vue";
import ButtonGroup from "./button-group.vue";
import Input from "./input.vue";
import Row from './row.vue';
import Col from './col.vue';
import plugin from "./plugin";
import Toast from "./toast";
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsItem from './tabs-item'
import TabsBody from './tabs-body'
import TabsPane from './tabs-pane'

Vue.component("m-button", Button);
Vue.component("m-icon", Icon);
Vue.component("m-button-group", ButtonGroup);
Vue.component("m-input", Input);
Vue.component("m-row", Row);
Vue.component("m-col", Col);
Vue.component('m-toast', Toast)
Vue.component('m-tabs', Tabs)
Vue.component('m-tabs-head', TabsHead)
Vue.component('m-tabs-item', TabsItem)
Vue.component('m-tabs-body', TabsBody)
Vue.component('m-tabs-pane', TabsPane)
Vue.use(plugin)

new Vue({
    el: "#app",
    data: {
        selectedTab: 'women'
    },
    created() {

    },
    methods: {
        click1() {
            this.click('top')
        },
        click2() {
            this.click('middle')
        },
        click3() {
            this.click('bottom')
        },
        click(position) {
            this.$toast('很长很长很长很长很长', {
                closeButton: {
                    text: '知道了',
                    callback(toast) {
                        console.log(toast)
                        console.log('用户说他知道了')
                    }
                },
                enableHtml: true,
                autoClose: true,
                position
            })
        }
    }
});
