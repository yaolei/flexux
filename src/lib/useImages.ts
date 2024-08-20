import useSWR from 'swr'
import gsap from 'gsap'

const fetcher = async (url:string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Could not fetch images");
        return response.url
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}


const fetchImages = async () => {
    const savedImages = sessionStorage.getItem('fetchedImages');
    if (savedImages) {
        return JSON.parse(savedImages)
    } else {
        const sections = gsap.utils.toArray('section');
        const imgUrls: string[] = [];
        for (let i = 0; i < sections.length; i++) {
          const url = `https://picsum.photos/1600/800?random=${i}`;
          imgUrls.push(await fetcher(url));
        }
        sessionStorage.setItem('fetchedImages', JSON.stringify(imgUrls));
        return imgUrls;
    }
  };
  
  export const useImages = () => {
    return useSWR('images', fetchImages, {
      suspense: true, // Enable Suspense
      fallbackData: [] // Provide fallback data
    });
  };