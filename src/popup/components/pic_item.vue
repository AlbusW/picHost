<template>
  <li
    class="pic-host-pic-item"
    :class="disabled ? 'pic-item-disabled' : ''"
    @click="handlePicItemClick"
  >
    <div v-if="data.url">
      <img :src="data.url" class="pic-preview">
    </div>
    <div
      class="lds-ring"
      v-if="data.status === 'pending'"
    >
      <div></div><div></div><div></div><div></div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePicItemClick(e) {
      !this.disabled && this.$emit('click', this.data);
    }
  }
}
</script>

<style lang="scss">
.pic-host-pic-item {
  width: 100%;
  margin-bottom: 5px;
  cursor: pointer;
  position: relative;

  &:hover{
    background: rgba(0,0,0,0.1);
  }

  &.pic-item-disabled:hover {
    background: none;
    cursor: auto;
  }

  .pic-preview {
    max-width: 150px;
    max-height: 150px;
  }

  .lds-ring {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    top: 50%;
    left: 50%;
    margin-left: -26px;
    margin-top: -26px;
    border: 6px solid;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
