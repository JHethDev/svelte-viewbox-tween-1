import { tweened } from 'svelte/motion'
import { quintOut } from 'svelte/easing'

export const width = tweened(1000, {
	easing: quintOut,
	duration: 600
})
export const height = tweened(1000, {
	easing: quintOut,
	duration: 600
})
export const y = tweened(0, {
	easing: quintOut,
	duration: 600
})
export const x = tweened(0, {
	easing: quintOut,
	duration: 600
})