import Toast from "./toast";

let currentToast

export default {
    install(Vue) {
        Vue.prototype.$toast = function (message, toastOptions) {
            if (currentToast) {
                currentToast.close()
            }
            currentToast = creatToast({Vue, message, propsData: toastOptions})
        }
    }
}


function creatToast({Vue, message, propsData}) {
    const Constructor = Vue.extend(Toast)
    let toast = new Constructor({propsData})
    toast.$slots.default = [message]
    toast.$mount()
    document.body.appendChild(toast.$el)
    return toast
}