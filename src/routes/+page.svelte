<script lang="ts">
  import MultiSelect from 'svelte-multiselect';
  import Slider from './Slider.svelte';
  import { calculatePlayRating } from './potential'

  export let data: { songs: Song[] };


  let chartConst: number = 0;

  $: if (userScore >= 10000000 - 4800 && userScore < 10000000) {
      userScore = 10000000;
    }

  let userScore: number = 8341464

  
  let selected: { label: string; value: any; songData?: Song }[] = [];
  

  type Song = {
    rowid?: number;
    song: string;
    artist: string;
    pst: number;
    prs: number;
    ftr: number;
    etr: number;
    length: string;
    bpm: string;
    [key: string]: any;
  };
  type Option = {
    label: string;
    value: any;
    songData?: Song;
  };

  const options: Option[] = (data?.songs as Song[] | undefined)?.map(song => ({
    label: `${song.song} - ${song.artist}`,
    value: song.rowid,
    songData: song
  })) ?? [];

  $: selectedSongs = selected
    .map(s => (data?.songs as Song[]).find(song => song.rowid === s.value) || s.songData)
    .filter(Boolean) as Song[];

  $: pstArr = selectedSongs.map(s => s.pst);
  $: prsArr = selectedSongs.map(s => s.prs);
  $: ftrArr = selectedSongs.map(s => s.ftr);
  $: etrArr = selectedSongs.map(s => s.etr);

  const setChartFrom = (arr: number[]) => {
    if (arr.length) chartConst = arr[0];
  };



</script>

<h2 class="text-xl font-bold mb-4">Arcaea PTT Play rating calculator !!</h2>

<MultiSelect
  bind:selected
  options={options}
  placeholder="type here to search songs !!"
  clearable
  closeOnSelect={false}
  maxSelect={1}
  key={opt => typeof opt === 'object' && 'value' in opt ? opt.value : opt}
/>

{#if selectedSongs.length > 0}
  <h3 class="mt-6 text-lg font-semibold">song info:</h3>
  <ul class="mt-2 space-y-2">
    {#each selectedSongs as song (song.rowid)}
      <li class="p-3 border rounded bg-gray-100">
        <strong>{song.song}</strong><br />
        artist:{song.artist}<br />
        PAST: {song.pst}<br />
        PRESENT: {song.prs}<br />
        FUTURE: {song.ftr}<br />
        ETERNAL: {song.etr}<br />
      </li>
    {/each}
  </ul>
{:else}
  <p class="mt-4 text-gray-500">Please select a song.</p>
{/if}

<div class="mt-6 space-x-2 flex flex-col gap-2">
  <button class="px-3 py-1 bg-blue-500 text-white rounded" on:click={() => setChartFrom(pstArr)}>pst</button>
  <button class="px-3 py-1 bg-blue-500 text-white rounded" on:click={() => setChartFrom(prsArr)}>prs</button>
  <button class="px-3 py-1 bg-blue-500 text-white rounded" on:click={() => setChartFrom(ftrArr)}>ftr</button>
  <button class="px-3 py-1 bg-blue-500 text-white rounded" on:click={() => setChartFrom(etrArr)}>etr</button>
</div>

<h1 class="mt-4 text-2xl font-bold">{chartConst}</h1>

<h>
  <p>{userScore}</p>
  <Slider
    id="PTTslider"
    min={8292683}
    max={10000000}
    step={4800}
    size={400}
    bind:val={userScore}
  />

  <p>play rating: {calculatePlayRating(chartConst, userScore).toPrecision(4)}</p>

</h>