<template>
  <div class="video-container">
    <iframe
      class = "responsive-iframe"
      width="560" height="315"
      src="https://www.youtube.com/embed/UwUvikiuBME"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer'
}
</script>
