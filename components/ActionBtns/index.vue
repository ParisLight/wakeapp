<template>
  <Transition name="fade" mode="in-out" @after-enter="showBtns = true">
    <div class="overlay" @click.stop="$emit('close'), (showBtns = false)">
      <Transition name="translateY" mode="out-in">
        <div
          class="action-btns"
          v-if="showBtns"
        >
          <div class="action-btns__top">
            <div
              class="action-btns__btn"
              @click.stop="$emit('editor')"
              v-if="editText"
              data-editor
            >
              <span class="action-btns__text">
                <!-- <slot name="edit"></slot> -->
                {{ editText }}
              </span>
            </div>
            <div
              class="action-btns__btn"
              @click.stop="$emit('delete'), showBtns = false"
              data-delete
              v-if="deleteText"
            >
              <span class="action-btns__text">
                {{ deleteText }}
                <!-- <slot class="action-btns__text" name="delete"> </slot> -->
              </span>
            </div>
          </div>
          <div
            class="action-btns__btn action-btns__close"
            @click.stop="$emit('close'), (showBtns = false)"
          >
            <span class="action-btns__text">
              Закрыть
            </span>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<script setup>
const props = defineProps({
  deleteText: {
    type: String,
    required: false
  },
  editText: {
    type: String,
    required: false
  },
})
const showBtns = ref(false);
</script>
<style lang=""></style>
