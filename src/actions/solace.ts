"use server";

export const generateImage = async () => {
  //   const url = "https://cloud.leonardo.ai/api/rest/v1/generations";
  //   const headers = {
  //     "Content-Type": "application/json",
  //     accept: "application/json",
  //     authorization: `Bearer ${process.env.LEONARDO_API_KEY!}`,
  //   };

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify({
  //       height: 512,
  //       prompt: "A cat staring at a window",
  //       width: 512,
  //       presetStyle: "CINEMATIC",
  //     }),
  //   });

  const generatedImg = "a77eb69a-926d-4bfe-bd65-d02dcb6614d2";

  const url = `https://cloud.leonardo.ai/api/rest/v1/generations/${generatedImg}`;

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    authorization: `Bearer ${process.env.LEONARDO_API_KEY!}`,
  };

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  const image = data["generations_by_pk"]["generated_images"][0]["url"];

  console.log(image);

  return image;
};
