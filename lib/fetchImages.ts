export const dynamic = "force-dynamic";
const fetchImages = ({category}) =>
  fetch(`/api/getImages?category=${category}`, {
    // cache: "no-store",
    next: { revalidate: 0 },
  }).then((res) => res.json());

export default fetchImages;
