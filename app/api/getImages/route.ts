export const dynamic = "force-dynamic";
type ImageType = {
  name: string;
  url: string;
};

export async function GET(request: Request) {



  // (bucket?: string,bucketPublicUrl:string=""): Promise<ImageType[]> {
  // console.log("Fetching images from bucket: ", bucket);
  let bucket = 'print'
  let allImages: ImageType[] = [];
  const imageUrls = [];

 

  // Extract the start index from the query parameters
  const url = new URL(request.url);
  console.log("url==="+ url)

  // const startIndex = parseInt(url.searchParams.get('startIndex') || '0', 10);
  console.log("All URL Parameters: ", url.searchParams.entries());
  
  const params = Object.fromEntries(url.searchParams.entries());
  const {category} = params


  console.log('All URL Parameters: ', category);

  if (category !== 'undefined')
  {
    console.log("Fetching images from bucket: " + bucket);
    bucket = category
  
    console.log("Fetching images from bucket and category: ", bucket, category);
  }

  const bucketUrl = `https://api.cloudflare.com/client/v4/accounts/1079414e72226b3a1f5d5d5fc0adc423/r2/buckets/${bucket}/objects`;

  const workerUrl = "https://production.print.mounirrouissi2.workers.dev"
  // console.log("startIndex= " + startIndex)
  // console.log("Fetching images from bucket: ", workerUrl)
  try {
    const response = await fetch(bucketUrl, {
      method: 'GET',
      headers: {
        'X-Auth-Email': 'mounirrouissi2@gmail.com',
        'X-Auth-Key': '71c3ca34b001567adf52c9f6315d95b0d2d61',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("result =", JSON.stringify(data.result));

    //  construct list of images
   
    
    try {
      const results = await Promise.all(
        data.result.map((item: any, index: number) => {
          // if (index >= startIndex && index < startIndex + 15) {
            console.log("item : " + item);
            let imageUrl = null;
            if(category ===  "undefined" || category === null || category === "")
            imageUrl = `${workerUrl}/${item.key}`;
            else
            imageUrl =`https://pub-1632a2ecf2714467a7496a139db56385.r2.dev/${item.key}`

            return {
              name: takoutSpace(item.key),
              url: imageUrl,
            };
          // }
          // return null;
        }).filter((item: any) => item !== null)
      );
      allImages = results;

      console.log("allImages" + JSON.stringify(allImages));

    } catch (error) {
      console.error('Error fetching images child ', error);
    }
  } catch (error) {
    console.log('Error fetching images parent: ', error);
  }

  //  console.log('All images BEFORE SORTTING TO IMAGES COMPONENT: ', allImages);
  sortedImageUrls(allImages)
  //  console.log('All images AFter SORTTING  TO IMAGES COMPONENT: ', allImages);

  return new Response(JSON.stringify(allImages), {
    status: 200,
  })




  function sortedImageUrls(allImages: ImageType[]): ImageType[] {
    return allImages.sort((a, b) => {
      const timestampA = parseInt(a.name.split('_')[1], 10);
      const timestampB = parseInt(b.name.split('_')[1], 10);
      return timestampB - timestampA; // Sort by ascending order of timestamps
    });


  }
  function takoutSpace(prmpt: string): string {
    return prmpt.trim().replace(/%20/g, ' ');
  }

}

