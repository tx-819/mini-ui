<template>
  <div class="wrapper" :class="toastClasses">
    <div class="toast" ref="toast">
      <div class="message">
        <slot v-if="!enableHtml"></slot>
        <div v-else v-html="$slots.default[0]"></div>
      </div>
      <div class="line" ref="line"></div>
      <span class="close" v-if="closeButton" @click="onClickClose">
      {{ closeButton.text }}
    </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiniToast',
  props: {
    autoClose: {
      type: [Boolean, Number],
      default: 5,
      validator(value) {
        return value === false || typeof value === 'number';
      }
    },
    closeButton: {
      type: Object,
      default() {
        return {
          text: '关闭', callback: undefined
        }
      }
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'middle'].indexOf(value) >= 0
      }
    }
  },
  mounted() {
    this.execAutoClose()
    this.updateStyles()
  },
  computed: {
    toastClasses() {
      return {
        [`position-${this.position}`]: true
      }
    }
  },
  methods: {
    execAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close()
        }, this.autoClose * 1000)
      }
    },
    updateStyles() {
      this.$nextTick(() => {
        this.$refs.line.style.height = this.$refs.toast.getBoundingClientRect().height + 'px'
      })
    },
    close() {
      this.$el.remove()
      this.$emit('close')
      this.$destroy()
    },
    onClickClose() {
      this.close()
      if (this.closeButton && typeof this.closeButton.callback === 'function') {
        this.closeButton.callback(this)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
$animation-duration: 300ms;
@keyframes side-up {
  0% {
    opacity: 0;
    transform: translateY(100%)
  }
  100% {
    opacity: 1;
    transform: translateY(0%)
  }
}
@keyframes side-down {
  0% {
    opacity: 0;
    transform: translateY(-100%)
  }
  100% {
    opacity: 1;
    transform: translateY(0%)
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.wrapper {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  &.position-top {
    top: 0;
    .toast{
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      animation: side-down $animation-duration;
    }
  }

  &.position-bottom {
    bottom: 0;
    .toast{
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: side-up $animation-duration;
    }
  }

  &.position-middle {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    .toast{
      animation: fade-in $animation-duration;
    }
  }
}

.toast {
  font-size: $font-size;
  min-height: $toast-min-height;
  line-height: 1.8;
  background: $toast-bg;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;

  .message {
    padding: 8px 0;
  }

  .close {
    padding-left: 16px;
    flex-shrink: 0;
  }

  .line {
    height: 100%;
    border-left: 1px solid #666;
    margin-left: 16px;
  }
}
</style>