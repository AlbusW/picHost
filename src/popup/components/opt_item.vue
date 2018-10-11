<template>
  <li class="pic-host-opt-item" @click="handleClick">
    <span class="icon-wrap">
      <i class="icon" v-if="showSelect">✔️</i>
    </span>
    <span class="opt-text">{{label}}</span>
  </li>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    showSelect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click',this.type);
    }
  }
}
</script>

<style lang="scss">
.pic-host-opt-item {
  display: flex;
  cursor: pointer;
  font-size: 13px;
  line-height: 2;
  border-top: 1px dashed rgba(0,0,0,0.2);

  &:hover{
    background: rgba(0,0,0,0.1);
  }
  .icon {
    font-size: 12px;
  }

  .icon-wrap {
    width: 20px;
    padding-left: 5px;
  }

  .opt-text {
    flex: 9;
    text-align: left;
    padding-left: 10px;
    user-select: none;
  }

}
</style>
