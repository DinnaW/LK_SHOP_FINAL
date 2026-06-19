<template>
  <aside
    class="side-nav categories-sidebar"
    :class="{ expanded: isExpanded }"
    @mouseleave="clearSubmenu"
  >
    <button
      v-if="!isExpanded"
      class="sidebar-toggle sidebar-rail-toggle"
      type="button"
      @click="$emit('toggle')"
      aria-label="Open shop types sidebar"
    >
      <i class="fa-solid fa-bars-staggered"></i>
      <span>Shop Types</span>
    </button>

    <div v-if="isExpanded" class="shop-types-head">
      <button class="shop-types-close" type="button" @click="$emit('toggle')" aria-label="Close shop types sidebar">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <span class="shop-types-divider"></span>
      <h3>SHOP TYPES</h3>
    </div>

    <div class="side-nav-group side-scroll-group categories-only-sidebar">
      <a
        v-for="item in items"
        :key="item.label"
        :href="item.href"
        :class="{ active: activeSidebar === item.label, 'has-submenu': hasChildren(item) }"
        @mouseenter="setSubmenu(item)"
        @focus="setSubmenu(item)"
        @click="handleItemClick(item)"
      >
        <span class="nav-icon"><i :class="item.icon"></i></span>
        <span class="nav-label">{{ item.label }}</span>
        <i v-if="hasChildren(item) && isExpanded" class="fa-solid fa-angle-right nav-arrow"></i>
      </a>
    </div>

    <div
      v-if="isExpanded && activeSubmenu"
      class="sidebar-submenu-flyout"
      @mouseenter="keepSubmenu"
    >
      <div class="submenu-head">{{ activeSubmenu.label }}</div>
      <a
        v-for="child in activeSubmenu.children"
        :key="child.label"
        :href="child.href"
        class="submenu-link"
        @click="$emit('set-active', activeSubmenu.label)"
      >
        {{ child.label }}
      </a>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  activeSidebar: { type: String, required: true },
  isExpanded: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle', 'set-active'])

const activeSubmenu = ref(null)

const hasChildren = (item) => Array.isArray(item.children) && item.children.length > 0

const setSubmenu = (item) => {
  if (!props.isExpanded || !hasChildren(item)) {
    activeSubmenu.value = null
    return
  }

  activeSubmenu.value = item
}

const clearSubmenu = () => {
  activeSubmenu.value = null
}

const keepSubmenu = () => {
  // Keeps the flyout open while the mouse is inside the submenu panel.
}

const handleItemClick = (item) => {
  emit('set-active', item.label)

  if (props.isExpanded && hasChildren(item)) {
    activeSubmenu.value = item
  }
}
</script>
