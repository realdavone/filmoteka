<template>
  <div class="item">
    <span class="label">
      <slot name="label" />
    </span>
    <span class="content">
      <slot name="content" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
div.item{
  display:flex;
  flex-direction:column;
  gap:0.25rem;
  span.label{ font-weight:700 }
  span.content{
    font-size:0.75rem;
    font-weight:200;
    line-height:1.4;
  }
}
</style>