'use client'
import {useEffect, useRef, Suspense} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {WEBSITEPRO} from '@/lib/navlist'

const getImages = async(num:number) => {
    const currentImg = await fetch(`https://picsum.photos/1600/800?random=${num}`)
    if (!currentImg.ok) throw new Error(`Could not img `)
    return currentImg.url;
}

export default function Page () {
  const imageFetched = useRef(false);
    useEffect(() => {
      if (!imageFetched.current) {
        console.log("done")
          imageFetched.current = true;
      }
      // if (!imageFetched.current) {
      //   gsap.registerPlugin(ScrollTrigger);
      //   let getRatio = (el:any) => window.innerHeight / (window.innerHeight + el.offsetHeight);
      //   gsap.utils.toArray("section").forEach(async (section:any, i) => {
      //     section.bg = section.querySelector(".bg"); 
      //     const imgBg = await getImages(i)
      //     section.bg.style.backgroundImage = `url(${imgBg})`;

      //     gsap.fromTo(section.bg, {
      //       backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
      //     }, {
      //         backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
      //         ease: "none",
      //         scrollTrigger: {
      //           trigger: section,
      //           start: () => i ? "top bottom" : "top top", 
      //           end: "bottom top",
      //           scrub: true,
      //           invalidateOnRefresh: true // to make it responsive
      //         }
      //       });
      //     });
      //     imageFetched.current = true; 
      //   }
    },[])


    return(
        <div className='website'>
            {WEBSITEPRO.map(section => (
                <section key={section.label + section.exntendClass}>
                    <div className={section.exntendClass}></div>
                    <h1 className=' text-center'>{section.label}</h1>
                </section>
            ))}
        </div>
    )
}