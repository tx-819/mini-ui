const expect = chai.expect;
import Vue from "vue";
import Tabs from "../src/tabs";
import TabsItem from "../src/tabs-item";
import TabsBody from "../src/tabs-body";
import TabsPane from "../src/tabs-pane";
import TabsHead from "../src/tabs-head";

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.component('m-tabs', Tabs)
Vue.component('m-tabs-head', TabsHead)
Vue.component('m-tabs-item', TabsItem)
Vue.component('m-tabs-body', TabsBody)
Vue.component('m-tabs-pane', TabsPane)
describe("Tabs", () => {
    it("存在.", () => {
        expect(Tabs).to.be.ok;
    });
    it("接收 selected", (done) => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
        <m-tabs selected="finance">
        <m-tabs-head>
            <m-tabs-item name="women">美女</m-tabs-item>
            <m-tabs-item name="finance">财经</m-tabs-item>
            <m-tabs-item name="sports">体育</m-tabs-item>
        </m-tabs-head>
        <m-tabs-body>
            <m-tabs-pane name="women">美女资讯</m-tabs-pane>
            <m-tabs-pane name="finance">财经资讯</m-tabs-pane>
            <m-tabs-pane name="sports">体育资讯</m-tabs-pane>
        </m-tabs-body>
        </m-tabs>
        `
        const vm = new Vue({
            el: div
        })
        vm.$nextTick(() => {
            let item = vm.$el.querySelector(`.tabs-item[data-name='finance']`)
            expect(item.classList.contains('active')).to.be.true
            done()
        })
    });
    it('接收 direction', () => {
        // const Constructor = Vue.extend(Tabs);
        // const vm = new Constructor({
        //     propsData: {
        //         direction: "horizontal"
        //     },
        // }).$mount();
    });
});
