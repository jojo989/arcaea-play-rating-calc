<script>
  export let id;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let val = 50;
  export let size = 10;
</script>

<input
  type="range"
  {id} {min} {max} {step} width={size}
  name="{id}"
  bind:value={val}
/>

