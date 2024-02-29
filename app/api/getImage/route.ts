import { NextRequest, NextResponse } from "next/server";
import { Buffer } from 'buffer';
import fs from 'fs';
import { NextApiResponse } from "next";
interface Data {
  message?: string;
}
export  async function GET(req: NextRequest, res: NextApiResponse<Data>) {

  console.log("uploading data to cloudflare inside post");
 // const { image,prompt } = await req.json();
  //const blob = base64ToBlob(image, "image/png");

// const key = generateRandomString();






  try {   
    
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/1079414e72226b3a1f5d5d5fc0adc423/r2/buckets/print/objects/forest_____the_backgound_should__stricly_be_in_black_colour__graphic_design__17`, {
        method: "GET",
        headers: {
            'X-Auth-Email': 'mounirrouissi2@gmail.com',
            'X-Auth-Key': '71c3ca34b001567adf52c9f6315d95b0d2d61',
          },
      });

      if (!response.ok) {
        throw new Error(`getting : HTTP error! status: ${response.status}`);
      }

      const data = await response.blob();
      return new NextResponse(data, { status: 201, headers: {
        'Cache-Control': 'no-store', // Instruct the browser not to cache the response
      }, })

    }  catch (error) {
        console.error('Fetch error: ', error);
        return res.status(500).json({ message: "An error occurred while uploading the image" });

      }

   
}

