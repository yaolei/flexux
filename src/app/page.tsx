'use client'
import {useEffect,Suspense} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {WEBSITEPRO} from '@/lib/navlist'
import {useImages} from '@/lib/useImages'

gsap.registerPlugin(ScrollTrigger);
interface SectionElement extends HTMLElement {
    bg?: HTMLElement;
}

 const PageContent = () => {
    const {data:images} =  useImages()
      useEffect(() => {
        if (images.length === 0) return;
        const getRatio = (el: HTMLElement) =>
          window.innerHeight / (window.innerHeight + el.offsetHeight);
    
        gsap.utils.toArray<SectionElement>('section').forEach((section, i) => {
          section.bg = section.querySelector('.bg') as HTMLElement;
          if (section.bg.style) {
            // This will only happen on the client side
              section.bg.style.backgroundImage = `url(${images[i]})`;
    
              gsap.fromTo(
                section.bg,
                {
                  backgroundPosition: () =>
                    i ? `50% ${-window.innerHeight * getRatio(section)}px` : '50% 0px',
                },
                {
                  backgroundPosition: () =>
                    `50% ${window.innerHeight * (1 - getRatio(section))}px`,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: () => (i ? 'top bottom' : 'top top'),
                    end: 'bottom top',
                    scrub: true,
                    invalidateOnRefresh: true,
                  }
                }
              );
          }
        });
      }, [images]);

    return(
        <>
            <div className='website'>
                {WEBSITEPRO.map(section => (
                    <section key={section.label + section.exntendClass}>
                        <div className={section.exntendClass}></div>
                        <h1 className=' text-center'>{section.label}</h1>
                    </section>
                ))}
            </div>
        </>
    )
}

export default function Page () { 
    return (
        <Suspense fallback={<div className=' fixed top-[50%] left-[50%] transform translate-x-[50%] translate-y-[50%] text-red-300 text-2xl'>Loading.....</div>}>
            <PageContent />
        </Suspense>
    )
}