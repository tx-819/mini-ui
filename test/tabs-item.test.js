import sinon from "sinon";

const expect = chai.expect;
import Vue from "vue";
import TabsItem from "../src/tabs-item";


Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.component('m-tabs-item', TabsItem)
describe("TabsItem", () => {
    it("存在.", () => {
        expect(TabsItem).to.exist;
    });
    it('接收 name', () => {
        const Constructor = Vue.extend(TabsItem);
        const vm = new Constructor({
            propsData: {
                name: "xxx"
            },
        }).$mount();
    expect(vm.$el.getAttribute('data-name')).to.eq('xxx')
    });
    it('接收 disabled', () => {
        const Constructor = Vue.extend(TabsItem);
        const vm = new Constructor({
            propsData: {
                disabled: true
            },
        }).$mount();
        expect(vm.$el.classList.contains('disabled')).to.be.true
        const callback = sinon.fake()
        vm.$on('click', callback)
        vm.$el.click()
        expect(callback).to.have.not.been.called
    });
});
