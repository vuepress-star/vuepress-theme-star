import type { Component, ComponentInternalInstance, VNode } from 'vue'

export const getTabPanes = (
  vm: ComponentInternalInstance
): (VNode & { props: Exclude<VNode['props'], null> })[] => {
  const nodes = vm.slots
  return (nodes.default?.() || [])
    .filter((vnode) => (vnode.type as Component).name === 'TabPane')
    .map((vnode) => {
      if (vnode.props === null) {
        vnode.props = {}
      }
      return vnode as VNode & { props: Exclude<VNode['props'], null> }
    })
}
