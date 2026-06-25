<template>
  <aside
    class="side-nav categories-sidebar lucide-category-dock"
    :class="{ expanded: isExpanded }"
    @mouseleave="clearSubmenu"
  >
    <button
      class="sidebar-edge-toggle sidebar-premium-toggle"
      type="button"
      @click="$emit('toggle')"
      :aria-label="isExpanded ? 'Close shop types sidebar' : 'Open shop types sidebar'"
    >
      <svg
        v-if="isExpanded"
        class="sidebar-toggle-lucide"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      <svg
        v-else
        class="sidebar-toggle-lucide"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>

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
        <span class="nav-icon" aria-hidden="true">
          <svg
            class="lucide-sidebar-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-html="getLucideIcon(item.label)"
          ></svg>
        </span>
        <span class="nav-label">{{ item.label }}</span>
        <svg
          v-if="hasChildren(item) && isExpanded"
          class="nav-arrow lucide-nav-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
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

const lucideIconMap = {
  Electronics: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M9 2v2"/><path d="M9 20v2"/><path d="M2 9h2"/><path d="M2 15h2"/><path d="M20 9h2"/><path d="M20 15h2"/>',
  'Home Appliances': '<path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/><path d="M5 10h14"/><path d="M9 5v2"/><path d="M9 13v3"/>',
  'Home Accessories': '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M2 11a2 2 0 0 1 4 0v3h12v-3a2 2 0 0 1 4 0"/>',
  'Mobile & Tablets': '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
  'Computer Accessories': '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M6 9h.01"/><path d="M10 9h.01"/><path d="M14 9h.01"/><path d="M18 9h.01"/><path d="M7 13h10"/>',
  Gaming: '<path d="M6 11h4"/><path d="M8 9v4"/><path d="M15 12h.01"/><path d="M18 10h.01"/><path d="M17.3 5H6.7a4 4 0 0 0-4 3.6l-.7 6.6A2.7 2.7 0 0 0 4.7 18h.6a2 2 0 0 0 1.4-.6L8.1 16h7.8l1.4 1.4a2 2 0 0 0 1.4.6h.6a2.7 2.7 0 0 0 2.7-2.8l-.7-6.6A4 4 0 0 0 17.3 5Z"/>',
  'Audio Devices': '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z"/><path d="M21 14h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5Z"/><path d="M3 14a9 9 0 0 1 18 0"/>',
  Cameras: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3"/>',
  'Smart Home': '<path d="m3 11 9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/><path d="M9 21v-6h6v6"/><path d="M9.5 9.5a3.5 3.5 0 0 1 5 0"/><path d="M11 11a1.5 1.5 0 0 1 2 0"/>',
  'Health & Beauty': '<path d="M12 21s-7-4.3-9.4-8.4A5.6 5.6 0 0 1 12 6a5.6 5.6 0 0 1 9.4 6.6C19 16.7 12 21 12 21Z"/><path d="M12 8v8"/><path d="M8 12h8"/>',
  'Office Equipment': '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 13h20"/>',
  'Cleaning Products': '<path d="m16 3 5 5"/><path d="M19 6 8.7 16.3a2.8 2.8 0 0 1-4 0l-1-1a2.8 2.8 0 0 1 0-4L14 1"/><path d="m7 17-3 3"/><path d="M14 11h.01"/><path d="M17 14h.01"/>',
  'Kitchen Accessories': '<path d="M8 2v20"/><path d="M16 2v20"/><path d="M4 6h16"/><path d="M4 18h16"/><path d="M4 12h16"/>',
  Storage: '<path d="M21 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12h18Z"/><path d="M3 10h18"/><path d="M7 14h10"/><path d="M7 18h10"/>',
  'Bedding & Cushions': '<path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3"/><path d="M2 11h20v9"/><path d="M2 20v-9"/><path d="M6 11V9a2 2 0 0 1 2-2h3v4"/>',
  Tableware: '<path d="M7 2v20"/><path d="M17 2v20"/><path d="M4 2v5a3 3 0 0 0 6 0V2"/><path d="M14 2h6v20"/>',
  Fashion: '<path d="M20.4 7.5 16 4l-2 2h-4L8 4 3.6 7.5 6 11v9h12v-9l2.4-3.5Z"/><path d="M10 6a2 2 0 0 0 4 0"/>',
  'Sports & Outdoors': '<circle cx="12" cy="12" r="10"/><path d="M4.9 4.9 19.1 19.1"/><path d="M19.1 4.9 4.9 19.1"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M12 2a14.5 14.5 0 0 1 0 20"/>',
  'Toys & Baby': '<path d="M15.5 8.5 18 6a2.1 2.1 0 0 0-3-3l-2.5 2.5"/><path d="M8.5 15.5 6 18a2.1 2.1 0 0 1-3-3l2.5-2.5"/><path d="m8 8 8 8"/><path d="m16 8-8 8"/>',
  'Best Sellers': '<path d="M12 2 15 8l6 .9-4.5 4.4 1.1 6.3L12 16.7 6.4 19.6l1.1-6.3L3 8.9 9 8l3-6Z"/>',
}

const fallbackLucideIcon = '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'

const getLucideIcon = (label) => lucideIconMap[label] || fallbackLucideIcon

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
