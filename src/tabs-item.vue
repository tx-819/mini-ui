<template>
  <div class="tabs-item" @click="select" :class="classes" :data-name="name">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MiniTabsItem',
  inject: ['eventBus'],
  data() {
    return {
      active: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    classes() {
      return {
        active: this.active,
        disabled: this.disabled
      }
    }
  },
  mounted() {
    if (this.eventBus) {
      this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name;
      })
    }
  },
  methods: {
    select() {
      if (this.disabled) {
        return
      }
      this.eventBus && this.eventBus.$emit('update:selected', this.name, this)
      this.$emit('click', this)
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: blue;
$disabled-text-color: grey;
.tabs-item {
  flex-shrink: 0;
  padding: 0 1em;
  cursor: pointer;
  display: flex;
  align-items: center;

  &.active {
    color: $blue;
    font-weight: bold;
  }

  &.disabled {
    color: $disabled-text-color;
  }
}

</style>