<template>
  <div class="tabs-item" @click="select" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MiniTabsItem',
  inject: ['eventBus'],
  data() {
    return{
      active: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    classes() {
      return{
        active: this.active
      }
    }
  },
  mounted() {
    this.eventBus.$on('update:selected', (name) => {
      this.active = name === this.name;
    })
  },
  methods: {
    select() {
      this.eventBus.$emit('update:selected', this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-item {
  flex-shrink: 0;
  padding: 0 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  &.active{
    background: red;
  }
}

</style>