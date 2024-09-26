import useSWR from 'swr'
import gsap from 'gsap'
import { count } from 'console';

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


const fetchPublicImgsList:any = async () => {
    try {
    const url = `${location.protocol}//${location.host}/api/tools`;
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      if (!res.ok) throw new Error("Could not fetch images");
      return res.text()
    } catch (error:any) {
        throw new Error("Fetch error:", error?.message);
    }

}

const fetchImages = async () => {
    const savedImages = sessionStorage.getItem('fetchedImages');
    const baseImagePath = "/images/_img/"
    if (savedImages) {
        return JSON.parse(savedImages)
    } else {
        const sections = gsap.utils.toArray('section');
        const imgJson = JSON.parse(await fetchPublicImgsList())
        const imgUrls: string[] = [];
        for (let i = 0; i < sections.length; i++) {
          console.log(baseImagePath+imgJson[i])
          console.log(imgJson[i])
          imgUrls.push(baseImagePath+imgJson[i])
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