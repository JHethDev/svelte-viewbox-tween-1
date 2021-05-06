<script>
	import { fly } from 'svelte/transition'
	import { backOut, backIn } from 'svelte/easing'
	import { width, height, x, y } from './tweens'
	import { spots } from './spots'
	
	let iw, selected = null
	
	function make(spot, index) {
		selected = index
		$width = 500
		$height = 500
		$x = spot.x
		$y = spot.y
	}
	
	function hint(spot, index) {
		if (selected == null) {
			$width = 800
			$height = 800
			$x = spot.x == 0? 0 : spot.x - 300
			$y = spot.y == 0? 0 : spot.y - 300
		}
	}
	
	function hintReset() {
		if (selected !== null) return
		reset()
	}
	
	function reset() {
		selected = null
		$width = 1000
		$height = 1000
		$x = 0
		$y = 0
	}
</script>

<svelte:window bind:innerWidth={iw} />

<div class="grid">
	<div class="grid-inner">
		<svg viewBox="{$x} {$y} {$width} {$height}">
			{#each spots as spot, index}
				<rect class:selected={selected == index} on:mouseover={()=> hint(spot, index)} on:mouseout={hintReset} on:click={()=> make(spot, index)} id={spot.title} x={spot.x} y={spot.y} fill={spot.fill} width="500" height="500"/>
				<text
							x={spot.x + 250}
							y={spot.y + 250}
							class="large"
							dominant-baseline="middle"
							fill="#fff"
							text-anchor="middle"
							on:click={()=> make(spot, index)}
					>
						{spot.val}
					</text>
				{#if selected == index}
					<text
								in:fly={{ y: 50, easing: backOut, delay: 600 }}
								out:fly={{ y: 50 }}
								x={spot.x + 250}
								y={spot.y + 250}
								dominant-baseline="middle"
								fill="#231f20"
								text-anchor="middle"
								style=""
					>
						{spot.title}
					</text>
				{/if}
			{/each}
		</svg>
	</div>	
</div>


<div class="controls">
	<div class="controls-inner">
		{#each spots as spot, index}
			<button  class:active={selected == index} on:mouseover={()=> hint(spot, index)} on:mouseout={hintReset} on:click={()=> make(spot, index)}>
				{iw > 420? spot.title : spot.val}
				<span style="background-color: {spot.fill}"></span>
			</button>
		{/each}
		<button on:click={reset}>
			Reset
			<span style="background-color: lightgray"></span>
		</button>
	</div>
</div>

<style>
	.grid {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem
	}
	.grid-inner {
		border: 1px solid var(--borderColor);
		border-radius: 2rem;
		overflow: hidden
	}
	.controls {
		display: flex;
		justify-content: center;
	}
	.controls-inner {
		display: flex;
		margin: 0 auto;
		border: 1px solid var(--borderColor);
		border-radius: .5rem;
		overflow: hidden
	}
	.controls-inner > * + * {
		border-left: 1px solid var(--borderColor)
	}
	button {
		cursor: pointer;
		font-weight: 600;
    justify-content: center;
    padding: 1rem 1rem;
    text-align: center;
		border: none;
    white-space: nowrap;
		margin: 0;
		position: relative;
		background: transparent;
		user-select: none;
	}
	button span {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		transition: .2s ease-out
	}
	button:hover span {
		opacity: .7
	}
	button.active {
		text-decoration: underline;
		text-decoration-thickness: 3px
	}
	svg {
		width: 600px;
		max-width: 100%;
		height: auto;
		display: block;
		margin: 0;
	}
	rect {
		cursor: pointer
	}
	rect:hover {
		opacity: .8
	}
	rect.selected:hover {
		opacity: 1
	}
	text {
		cursor: pointer;
		pointer-events: none;
		user-select: none;
		font-size: 59px;
		font-family: 'Poppins', sans-serif;
		font-weight: 600
	}
	text.large {
		opacity: .1;
		font-size: 400px;
	}
	@media (min-width: 420px) {
		button {
			padding: 1rem 1.5rem;
		}
	}
</style>