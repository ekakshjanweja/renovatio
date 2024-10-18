function draw(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const image = new Image();
  image.src =
    "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/056d8f7f-2719-4628-999d-4d9c71fd5616/Default_living_room_minimal_asthetic_grey_dark_center_table_so_0.jpg";

  let imagePosition = { x: 50, y: 50 };
  let imageWidth: number, imageHeight: number;
  let isBordered = false;
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };

  image.onload = () => {
    const scale = 0.5;
    const aspect = image.naturalWidth / image.naturalHeight;
    imageWidth = scale * aspect * 800;
    imageHeight = scale * 800;

    drawImageWithBorder();

    // Add event listener for click to toggle border
    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Check if the click is within the image bounds
      if (
        x >= imagePosition.x &&
        x <= imagePosition.x + imageWidth &&
        y >= imagePosition.y &&
        y <= imagePosition.y + imageHeight
      ) {
        // Toggle border on image
        isBordered = !isBordered;
        drawImageWithBorder();
      }
    });

    // Mouse down event to start dragging
    canvas.addEventListener("mousedown", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Check if the mouse down is on the image
      if (
        x >= imagePosition.x &&
        x <= imagePosition.x + imageWidth &&
        y >= imagePosition.y &&
        y <= imagePosition.y + imageHeight
      ) {
        isDragging = true;
        // Calculate the offset between mouse position and image position
        dragOffset.x = x - imagePosition.x;
        dragOffset.y = y - imagePosition.y;
      }
    });

    // Mouse move event to drag the image
    canvas.addEventListener("mousemove", (event) => {
      if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Update image position based on mouse movement
        imagePosition.x = x - dragOffset.x;
        imagePosition.y = y - dragOffset.y;

        drawImageWithBorder();
      }
    });

    // Mouse up event to stop dragging
    canvas.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Mouse out event to stop dragging if the mouse leaves the canvas
    canvas.addEventListener("mouseout", () => {
      isDragging = false;
    });
  };

  function drawImageWithBorder() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isBordered) {
      // Draw a red border around the image
      ctx.strokeStyle = "red";
      ctx.lineWidth = 5;
      ctx.strokeRect(
        imagePosition.x - 5,
        imagePosition.y - 5,
        imageWidth + 10,
        imageHeight + 10,
      );
    }

    // Draw the image
    ctx.drawImage(
      image,
      imagePosition.x,
      imagePosition.y,
      imageWidth,
      imageHeight,
    );
  }
}

export default draw;
/*
image.src =
  "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/056d8f7f-2719-4628-999d-4d9c71fd5616/Default_living_room_minimal_asthetic_grey_dark_center_table_so_0.jpg";

image.src = "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/e2551212-4781-497a-a438-f413b1b432b6/Default_A_minimal_Grey_themed_villa_facade_asthetic_nature_min_0.jpg"

image.src =
  "https://cdn.leonardo.ai/users/28134775-7926-489d-bcb7-dc47a2aba5a2/generations/fbba498a-4085-4ec0-8cfb-1b401708df5f/Default_dark_themed_bedroom_luxurious_wood_accents_tv_minimal_0.jpg";

*/
