let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let image = new Image();
let isMaskEnabled = false;
const scale = 0.5;
let imagePosition: {
  x: number;
  y: number;
};
let imageDimensions: {
  width: number;
  height: number;
};

function init(
  renovatioCanvas: HTMLCanvasElement,
  imageURL: string | null,
  isMask: boolean,
) {
  canvas = renovatioCanvas;
  isMaskEnabled = isMask;
  ctx = canvas.getContext("2d")!;

  if (!imageURL) return;

  image.src = imageURL;
  image.onload = draw;
}

function draw() {
  const aspect = image.naturalWidth / image.naturalHeight;
  imageDimensions = {
    width: scale * aspect * 800,
    height: scale * 800,
  };
  imagePosition = {
    x: (canvas.width - imageDimensions.width) / 2,
    y: (canvas.height - imageDimensions.height) / 2,
  };

  ctx.drawImage(
    image,
    imagePosition.x,
    imagePosition.y,
    imageDimensions.width,
    imageDimensions.height,
  );

  if (isMaskEnabled) {
    // Masking true
  }
}

export { init };
/*
image.src =
  "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/056d8f7f-2719-4628-999d-4d9c71fd5616/Default_living_room_minimal_asthetic_grey_dark_center_table_so_0.jpg";

image.src = "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/e2551212-4781-497a-a438-f413b1b432b6/Default_A_minimal_Grey_themed_villa_facade_asthetic_nature_min_0.jpg"

image.src =
  "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/fbba498a-4085-4ec0-8cfb-1b401708df5f/Default_dark_themed_bedroom_luxurious_wood_accents_tv_minimal_0.jpg";

*/
