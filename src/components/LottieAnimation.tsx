
import { useEffect, useRef, useState } from "react";

interface LottieAnimationProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  height?: number | string;
  width?: number | string;
}

export const LottieAnimation = ({
  animationData,
  className = "",
  loop = true,
  autoplay = true,
  height = "100%",
  width = "100%",
}: LottieAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let animationInstance: any;
    
    // Dynamically import Lottie
    import("lottie-web").then((Lottie) => {
      if (containerRef.current) {
        animationInstance = Lottie.default.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop,
          autoplay,
          animationData,
        });
        
        setLottie(animationInstance);
        setIsLoaded(true);
      }
    });
    
    return () => {
      animationInstance?.destroy();
    };
  }, [animationData, loop, autoplay]);

  return (
    <div
      ref={containerRef}
      className={`lottie-container ${className} ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={{
        height,
        width,
        transition: "opacity 0.3s ease-in-out",
      }}
    />
  );
};
