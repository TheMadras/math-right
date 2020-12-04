<template>
  <div class="home">
    <h1>Welcome to MathRight</h1>
    <h5 class="text-box">
      With MathRight you can write to do your math right! MathRight gives you
      a better way to do math. With our innovative writing and interpretation
      system, you can write your math in the way that is most comfortable to you
      and helps you present it!
    </h5>
    <br/>
    <b-button to="/userpage">Try it now!</b-button>
    <footer class="github-footer bg-dark">
        <p>Contact me on <a
                href="https://github.com/TheMadras/math-right">GitHub</a></p>
    </footer>
  </div>
</template>

<script>

export default {
  name: "Home",
};
</script>

<style scoped>
.github-footer {
    background-color: #5BDEFF;
    position: fixed;
    bottom: 0;
    flex-shrink: 0;
    width: 100%;
    border-radius: .1em;
    padding-top: .5em;
    padding-bottom: .5em;
}

.github-footer p {
    color: #f7f7f7;
    margin: auto;
    text-align: center;
}

.text-box {
  width: 60%;
  margin: auto;
}
</style>
