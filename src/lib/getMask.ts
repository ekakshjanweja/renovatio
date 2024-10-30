function getMask() {
  const canvas = document.getElementById("mask-canvas") as HTMLCanvasElement;
  const maskDataURL = canvas.toDataURL().split(",")[1];
  console.log(maskDataURL);
  return maskDataURL;
}

export default getMask;
