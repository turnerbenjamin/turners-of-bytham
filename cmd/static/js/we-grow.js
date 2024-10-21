const landUseEl = document.getElementById("land-use");
const patternEls = landUseEl.querySelectorAll(".pattern");

for (el of patternEls) {
  el.classList.add("animated");
}

const LandUseElIsInView = () => {
  const landUseElBottom = landUseEl.getBoundingClientRect().bottom;
  const windowBottom = window.innerHeight;
  return windowBottom >= landUseElBottom;
};

const handleScroll = () => {
  if (LandUseElIsInView()) {
    for (el of patternEls) {
      el.classList.add("animate");
    }
    window.removeEventListener("scroll", handleScroll);
  }
};

window.addEventListener("scroll", handleScroll);
