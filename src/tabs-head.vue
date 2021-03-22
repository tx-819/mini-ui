<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="actives-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiniTabsHead'
}
</script>

<style lang="scss" scoped>
$tab-height: 40px;
.tabs-head {
  display: flex;
  height: $tab-height;
  justify-content: flex-start;

  .actives-wrapper {
    margin-left: auto;
  }
}
</style>