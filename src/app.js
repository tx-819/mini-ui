import Vue from "vue";
import Button from "./button.vue";
import Icon from "./icon.vue";
import ButtonGroup from "./button-group.vue";
import Input from "./input.vue";
import Row from './row.vue';
import Col from './col.vue';
import plugin from "./plugin";
import Toast from "./toast";

Vue.component("m-button", Button);
Vue.component("m-icon", Icon);
Vue.component("m-button-group", ButtonGroup);
Vue.component("m-input", Input);
Vue.component("m-row", Row);
Vue.component("m-col", Col);
Vue.component('m-toast', Toast)
Vue.use(plugin)

new Vue({
    el: "#app",
    data: {
        loading1: false,
        loading2: true,
        loading3: false,
        message: "hi",
    },
    created() {
        this.$toast('很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长', {
            closeButton: {
                text: '知道了',
                callback(toast) {
                    console.log(toast)
                    console.log('用户说他知道了')
                }
            },
            enableHtml: true
        })
    },
    methods: {
        click() {
        }
    }
});
