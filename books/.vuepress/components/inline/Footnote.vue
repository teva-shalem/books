<template>
  <span @keydown.esc="onEsc">
    <v-popover placement="top-end"
               trigger="click"
               :container="false">
      <button ref="trigger"
              type="button"
              class="trigger"
              :aria-label="`הערת שוליים: ${content}`" />

      <template slot="popover">
        <span aria-hidden="true"><slot /></span>
      </template>
    </v-popover>

    <span class="print-footnote-content" aria-hidden="true">&nbsp;[{{ content }}]</span>
  </span>
</template>

<script lang="ts">
export default {
  name: 'Footnote',

  computed: {
    trigger() {
      return this.$refs.trigger as HTMLButtonElement
    },

    content() {
      return this.$slots.default
        ? this.$slots.default
          .map(vNode => vNode.text || '')
          .join('')
          .replaceAll('\n', ' ')
        : ''
    },
  },

  methods: {
    onEsc() {
      this.trigger.click()
    },
  },
}
</script>

<style lang="scss" scoped>
.v-popover {
  display: inline;
}

.print-footnote-content {
  display: none;
}

:deep(.tooltip),
.trigger::after {
  font-size: 1.3em;
  font-weight: 600;
}

.trigger {
  all: unset;

  &:focus-visible {
    outline: 2px solid currentcolor;
    outline-offset: 2px;
    border-radius: 3px;
  }

  &::after {
    content: "*";
    cursor: pointer;
    vertical-align: super;
    line-height: 0;
  }
}

:deep(.tooltip) {
  max-width: calc(100vw - 10px);

  .tooltip-inner {
    cursor: initial;
    font-size: 0.7em;
    font-weight: normal;
    line-height: 1.2;
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}

@media print {
  .v-popover {
    display: none !important;
  }

  .print-footnote-content {
    display: inline;
    font-style: italic;
    font-size: 0.8em;
  }
}
</style>
