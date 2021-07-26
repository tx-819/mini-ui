<template>
  <div class="popover" ref="popover">
    <div :class="{[`position-${position}`] : true}" class="contentWrapper" ref="contentWrapper" v-if="visible">
      <slot name="content" :close="close"></slot>
    </div>
    <div ref="triggerWrapper" style="display: inline-block">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MiniPopover",
  data() {
    return {
      visible: false
    }
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validate(value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
      }
    },
    trigger: {
      type: String,
      default: 'click',
      validate(value) {
        return ['click', 'hover'].indexOf(value) >= 0
      }
    }
  },
  mounted() {
    if (this.trigger === 'click') {
      this.$refs.popover.addEventListener('click', this.onclick)
    } else {
      this.$refs.popover.addEventListener('mouseenter', this.open)
      this.$refs.popover.addEventListener('mouseleave', this.close)
    }
  },
  destroyed() {
    if (this.trigger === 'click') {
      this.$refs.popover.removeEventListener('click', this.onclick)
    } else {
      this.$refs.popover.removeEventListener('mouseenter', this.open)
      this.$refs.popover.removeEventListener('mouseleave', this.close)
    }
  },
  methods: {
    positionContent() {
      const {contentWrapper, triggerWrapper} = this.$refs
      document.body.appendChild(contentWrapper)
      const {height: height1} = contentWrapper.getBoundingClientRect()
      const {top, left, height, width} = triggerWrapper.getBoundingClientRect()
      const position = {
        top: {
          top: top + window.scrollY,
          left: left + window.scrollX
        },
        bottom: {
          top: top + height + window.scrollY,
          left: left + window.scrollX
        },
        left: {
          top: top + (height - height1) / 2 + window.scrollY,
          left: left + window.scrollX
        },
        right: {
          top: top + (height - height1) / 2 + window.scrollY,
          left: left + width + window.scrollX
        }
      }
      contentWrapper.style.top = position[this.position].top + 'px'
      contentWrapper.style.left = position[this.position].left + 'px'
    },
    onClickDocument(e) {
      if (this.$refs.popover &&
          (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))) {
        return;
      }
      if (this.$refs.contentWrapper &&
          (this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target))) {
        return;
      }
      this.close()
    },
    open() {
      this.visible = true
      this.$nextTick(() => {
        this.positionContent()
        document.addEventListener('click', this.onClickDocument)
      })
    },
    close() {
      this.visible = false
      document.removeEventListener('click', this.onClickDocument)
    },
    onclick(event) {
      if (this.$refs.triggerWrapper.contains(event.target)) {
        if (this.visible === true) {
          this.close()
        } else {
          this.open()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color: #333;
$border-radius: 4px;
.popover {
  position: relative;
  display: inline-block;
  vertical-align: top;
}

.contentWrapper {
  position: absolute;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
  background: white;
  padding: 0.5em 1em;
  word-break: break-all;

  &::before, &::after {
    content: '';
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
  }

  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;

    &::before, &::after {
      left: 10px;
    }

    &::before {
      border-top-color: black;
      border-bottom: none;
      top: 100%;
    }

    &::after {
      border-bottom: none;
      border-top-color: white;
      top: calc(100% - 1px);
    }
  }

  &.position-bottom {
    margin-top: 10px;

    &::before, &::after {
      left: 10px;
    }

    &::before {
      border-top: none;
      border-bottom-color: black;
      bottom: 100%;
    }

    &::after {
      border-top: none;
      border-bottom-color: white;
      bottom: calc(100% - 1px);
    }
  }

  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;

    &::before, &::after {
      top: 50%;
      transform: translateY(-50%);
    }

    &::before {
      border-right: none;
      border-left-color: black;
      left: 100%;
    }

    &::after {
      border-right: none;
      border-left-color: white;
      left: calc(100% - 1px);
    }
  }

  &.position-right {
    margin-left: 10px;

    &::before, &::after {
      top: 50%;
      transform: translateY(-50%);
    }

    &::before {
      border-left: none;
      border-right-color: black;
      right: 100%;
    }

    &::after {
      border-left: none;
      border-right-color: white;
      right: calc(100% - 1px);
    }
  }


}
</style>