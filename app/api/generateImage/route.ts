import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest,res:any) {
  const {prompt, size,counter} = await request.json();
  const startTime = performance.now();
  console.log("counter in post = "+counter)
  const apiKey = process.env.OPENAI_API_KEY;
let model;
  if (counter > 2 || size === "1024x1792") 
model ="dall-e-3"
else{
  model ="dall-e-2"

}


console.log("model used" + model)


  console.log("inside genrate post "+ size)
  const predictionResponse = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer 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`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": model, // Updated to DALL-E 3
      "prompt": prompt,
      "n": 1,
      ...(model === "dall-e-3" ? { "size": size } : {})
    })
  });

  const duration = performance.now() - startTime;
  console.log(`API call duration: ${duration} ms`);

  
  if (predictionResponse.status !==  200) {
    console.log("error while gen images" + predictionResponse.status)
    console.log("error while gen images" + predictionResponse)
    let error = await predictionResponse.json();
console.log("error while gen images"+ JSON.stringify(error)) 
    return new NextResponse(JSON.stringify({ error: "Failed to generate image" }), { status:  500, headers: { 'Content-Type': 'application/json' } });
  }

let predictionData;
try {
  predictionData = await predictionResponse.json();
  console.log("predictionData == "+predictionData)
} catch (e) {
  console.error("Failed to parse prediction response:", e);
  return new NextResponse(JSON.stringify({ error: 'Failed to parse prediction response' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
}

return new NextResponse(JSON.stringify(predictionData), { status:  201, headers: { 'Content-Type': 'application/json' } });
}