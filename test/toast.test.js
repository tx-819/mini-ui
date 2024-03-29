const expect = chai.expect;
import Vue from "vue";
import Toast from "../src/toast";

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Toast", () => {
    it("存在.", () => {
        expect(Toast).to.exist;
    });
    describe('props', function () {
        it('接收 autoClose', (done) => {
            let div = document.createElement("div")
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    autoClose: 1
                }
            }).$mount(div)
            vm.$on('close', () => {
                expect(document.body.contains(vm.$el)).to.eq(false)
                done()
            })
        });
        it('接收 closeButton', (done) => {
            const callback = sinon.fake();
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text: '你好',
                        callback
                    }
                }
            }).$mount()
            const closeButton = vm.$el.querySelector('.close')
            expect(closeButton.textContent.trim()).to.eq('你好')
            setTimeout(() => {
                closeButton.click()
                expect(callback).to.have.been.called
                done()
            }, 200)
        });
        it('接收 enableHtml', () => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    enableHtml: true
                }
            })
            vm.$slots.default = ['<strong id="test">你好</strong>']
            vm.$mount()
            const strong = vm.$el.querySelector('#test')
            expect(strong).to.exist
        });
        it('接收 position', () => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    position: 'bottom'
                }
            }).$mount()
            expect(vm.$el.classList.contains('position-bottom')).to.eq(true)
        })
    })
});
