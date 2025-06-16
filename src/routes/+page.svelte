<script lang="ts">
  import MultiSelect from 'svelte-multiselect';
  import Slider from './Slider.svelte';
  import { calculatePlayRating } from './potential';

  export let data: { songs: Song[] };

  let chartConst: number = 0;
  let userScore: number = 8341464;
  let selected: { label: string; value: any; songData?: Song }[] = [];

  type Song = {
    rowid?: number;
    song: string;
    artist: string;
    pst: number;
    prs: number;
    ftr: number;
    etr: number;
    byd: number;
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
  $: bydArr = selectedSongs.map(s => s.byd);

  const setChartFrom = (arr: number[]) => {
    if (arr.length) chartConst = arr[0];
  };

  $: if (userScore >= 9996682) {userScore = 10000000 }
</script>

<h2>arcaea ptt play rating calculator !!</h2>
<h4 id="faggotThanks">
  Special thanks to Agatha and 
  <a href="https://arcaea.fandom.com/wiki/Arcaea_Wiki" target="_blank" rel="noopener noreferrer">
    Arcaea wiki fandom
  </a>
</h4>

<div class="layout">
  <div class="select-box">
    <MultiSelect
      bind:selected
      options={options}
      placeholder="type here to search songs !!"
      clearable
      closeOnSelect={false}
      maxSelect={1}
      key={opt => typeof opt === 'object' && 'value' in opt ? opt.value : opt}
      background
    />
  </div>

  {#if selectedSongs.length > 0}
    <div class="song-info">
      <ul>
        {#each selectedSongs as song (song.rowid)}
          <li>
            <strong>{song.song}</strong><br />
            artist: {song.artist}<br />
            PAST: {song.pst}<br />
            PRESENT: {song.prs}<br />
            FUTURE: {song.ftr}<br />
            ETERNAL: {song.etr} <br />
            BEYOND: {song.byd} <br />
          </li>
        {/each}
      </ul>
    </div>

    <div class="buttons">
      <button on:click={() => setChartFrom(pstArr)}>pst</button>
      <button on:click={() => setChartFrom(prsArr)}>prs</button>
      <button on:click={() => setChartFrom(ftrArr)}>ftr</button>
      <button on:click={() => setChartFrom(etrArr)}>etr</button>
      <button on:click={() => setChartFrom(bydArr)}>byd</button>
    </div>

    <div class="slider-box">
      <p>{userScore}</p>
      <Slider
        id="PTTslider"
        min={8292683}
        max={10000000}
        step={4800}
        size={400}
        bind:val={userScore}
      />
      <p>play rating: {calculatePlayRating(chartConst, userScore).toFixed(2)}</p>
    </div>
  {/if}
</div>

<style>
  :global(div.multiselect) {
  --sms-bg: #000;
  --sms-text-color: #fff;
  --sms-placeholder-color: #bbb;
  --sms-placeholder-opacity: 1;
  --sms-options-bg: #000;
  --sms-options-shadow: 0 0 14pt -8pt rgba(255, 255, 255, 0.1);
  --sms-selected-text-color: #fff;
  --sms-li-selected-color: #fff;
  --sms-li-active-bg: rgba(255, 255, 255, 0.1);
  font-family: 'kazesawa';
}


:global(div.multiselect > input[autocomplete]) {
  background-color: #000;
  color: #fff;
  font-family: 'kazesawa';
  caret-color: #fff;
  border: none;
  outline: none;
}

:global(div.multiselect > input[autocomplete]::placeholder) {
  color: #bbb;
  font-family: 'kazesawa';
  opacity: 1;
}

:global(.buttons button) {
  font-family: 'kazesawa';
}

:global(.multiselect input::placeholder) {
  font-family: 'kazesawa';
  color: white;
}


</style>