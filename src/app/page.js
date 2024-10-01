"use client";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ScrollTriggerSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    gsap.utils.toArray(".row").forEach((row, index) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");

      gsap.to(cardLeft, {
        x: leftXValues[index],
        y: yValues[index],
        rotation: leftRotationValues[index],
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "150% bottom",
          scrub: true,
        },
      });

      gsap.to(cardRight, {
        x: rightXValues[index],
        y: yValues[index],
        rotation: rightRotationValues[index],
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "150% bottom",
          scrub: true,
        },
      });
    });

    gsap.to(".logo", {
      scale: 1.2,
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".main",
        start: "top 50%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    gsap.to(".line p", {
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: ScrollTriggerSettings,
    });

    gsap.to(".button", {
      y: 0,
      opacity: 1,
      delay: 0.25,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: ScrollTriggerSettings,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card card-left">
            <img src={`/img-${2 * i - 1}.webp`} alt={`left card ${i}`} />
          </div>
          <div className="card card-right">
            <img src={`/img-${2 * i}.webp`} alt={`right card ${i}`} />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <ReactLenis root>
        <section className="hero">
          <div className="img">
            <img src="/pro-logo.jpg" alt="Pro Logo"></img>
          </div>
        </section>
        <section className="main">
          <div className="main-content">
            <div
              className="logo"
              style={{ opacity: 0, transform: "scale(0.8)" }}
            >
              <img src="/logo.png" alt="Main Logo" />
            </div>

            <div className="copy">
              <div className="line">
                <p>Kami ada</p>
              </div>
              <div className="line">
                <p>Dan terus</p>
              </div>
              <div className="line">
                <p>Berlipat Ganda</p>
              </div>
            </div>

            <div className="btn">
              <button>Get Pro</button>
            </div>
          </div>

          {generateRows()}
        </section>
      </ReactLenis>
    </>
  );
}
