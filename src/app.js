import Vue from "vue";
import Button from "./button.vue";
import Icon from "./icon.vue";
import ButtonGroup from "./button-group.vue";

Vue.component("m-button", Button);
Vue.component("m-icon", Icon);
Vue.component("m-button-group", ButtonGroup);

new Vue({
  el: "#app",
  data: {
    loading1: false,
    loading2: true,
    loading3: false,
  },
});

//单元测试
import chai from "chai";
const expect = chai.expect;

{
  const Constructor = Vue.extend(Button);
  const vm = new Constructor({
    propsData: {
      icon: "setting",
    },
  });
  vm.$mount();
  let useElement = vm.$el.querySelector("use");
  let href = useElement.getAttribute("xlink:href");
  expect(href).to.eq("#i-setting");
  vm.$el.remove();
  vm.$destroy();
}
{
  const Constructor = Vue.extend(Button);
  const vm = new Constructor({
    propsData: {
      icon: "setting",
      loading: true,
    },
  });
  vm.$mount();
  let useElement = vm.$el.querySelector("use");
  let href = useElement.getAttribute("xlink:href");
  expect(href).to.eq("#i-loading");
  vm.$el.remove();
  vm.$destroy();
}
{
  const div = document.createElement("div");
  document.body.appendChild(div);
  const Constructor = Vue.extend(Button);
  const vm = new Constructor({
    propsData: {
      icon: "setting",
    },
  });
  vm.$mount(div);
  let svg = vm.$el.querySelector("svg");
  let { order } = window.getComputedStyle(svg);
  expect(order).to.eq("1");
  vm.$el.remove();
  vm.$destroy();
}
{
  const div = document.createElement("div");
  document.body.appendChild(div);
  const Constructor = Vue.extend(Button);
  const vm = new Constructor({
    propsData: {
      icon: "setting",
      iconPosition: "right",
    },
  });
  vm.$mount(div);
  let svg = vm.$el.querySelector("svg");
  let { order } = window.getComputedStyle(svg);
  expect(order).to.eq("2");
  vm.$el.remove();
  vm.$destroy();
}
{
  const Constructor = Vue.extend(Button);
  const vm = new Constructor({
    propsData: {
      icon: "setting",
    },
  });
  vm.$mount();
  vm.$on("click", function() {
    expect(1).to.eq(1);
  });
  //希望这个函数被执行
  let button = vm.$el;
  button.click();
}
