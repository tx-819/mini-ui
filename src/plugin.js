import Toast from "./toast";

let currentToast

export default {
    install(Vue) {
        Vue.prototype.$toast = function (message, toastOptions) {
            if (currentToast) {
                currentToast.close()
            }
            currentToast = creatToast({
                Vue, message, propsData: toastOptions, onClose: () => {
                    currentToast = null
                }
            })
        }
    }
}


function creatToast({Vue, message, propsData, onClose}) {
    const Constructor = Vue.extend(Toast)
    let toast = new Constructor({propsData})
    toast.$slots.default = [message]
    toast.$mount()
    toast.$on('close', onClose)
    document.body.appendChild(toast.$el)
    return toast
}