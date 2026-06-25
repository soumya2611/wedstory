import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * ScratchCard Component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be revealed beneath the scratch card
 * @param {string} [props.title] - Text printed on the card overlay
 * @param {string} [props.subTitle] - Subtext printed on the card overlay
 * @param {number} [props.threshold=50] - Percentage (0-100) of card cleared before auto-revealing
 * @param {function} [props.onComplete] - Callback fired once card is fully revealed
 * @param {string} [props.className] - CSS class for the wrapper container
 */
const ScratchCard = ({
  children,
  title = 'SCRATCH',
  subTitle = 'TO REVEAL',
  threshold = 30,
  onComplete,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const checkTimeoutRef = useRef(null);
  const brushSizeRef = useRef(36);
  
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isScrollingRef = useRef(false);
  const gestureDetectedRef = useRef(false);
  const isTouchRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFullyCleared, setIsFullyCleared] = useState(false);

  // Initialize canvas background and text
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 200;
    const height = rect.height || 200;

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Compute dynamic responsive brush size (bigger on large screens)
    brushSizeRef.current = Math.max(90, Math.min(width * 0.2, 70));

    // Create a beautiful premium metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#bf953f'); // Bronze-gold
    grad.addColorStop(0.2, '#fcf6ba'); // Shimmering pale gold
    grad.addColorStop(0.4, '#b38728'); // Deep gold
    grad.addColorStop(0.6, '#fbf5b7'); // Highlight gold
    grad.addColorStop(0.8, '#c5a850'); // Medium gold
    grad.addColorStop(1, '#aa771c'); // Dark gold

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Sprinkle subtle gold dust particles for premium texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add darker gold specks
    ctx.fillStyle = 'rgba(138, 92, 4, 0.15)';
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer subtle gold frame
    ctx.strokeStyle = 'rgba(18, 17, 16, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(5, 5, width - 10, height - 10);

    // Inner white/gold thin frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Corner decorative brackets
    ctx.strokeStyle = 'rgba(34, 31, 26, 0.3)';
    ctx.lineWidth = 1.5;
    const cornerSize = 12;
    // Top-Left
    ctx.beginPath();
    ctx.moveTo(8 + cornerSize, 8);
    ctx.lineTo(8, 8);
    ctx.lineTo(8, 8 + cornerSize);
    ctx.stroke();
    // Top-Right
    ctx.beginPath();
    ctx.moveTo(width - 8 - cornerSize, 8);
    ctx.lineTo(width - 8, 8);
    ctx.lineTo(width - 8, 8 + cornerSize);
    ctx.stroke();
    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(8, height - 8 - cornerSize);
    ctx.lineTo(8, height - 8);
    ctx.lineTo(8 + cornerSize, height - 8);
    ctx.stroke();
    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(width - 8 - cornerSize, height - 8);
    ctx.lineTo(width - 8, height - 8);
    ctx.lineTo(width - 8, height - 8 - cornerSize);
    ctx.stroke();

    // Draw typography on the scratch card overlay
    ctx.fillStyle = '#221f1a'; // Deep bronze-charcoal
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Title (Cinzel serif look)
    ctx.font = '600 13px "Cinzel", Georgia, serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(title.toUpperCase(), width / 2, height / 2 - 8);

    // Subtitle (Montserrat sans-serif look)
    ctx.fillStyle = '#5c4921'; // Mid gold/bronze
    ctx.font = '500 8px "Montserrat", sans-serif';
    ctx.letterSpacing = '1.5px';
    ctx.fillText(subTitle.toUpperCase(), width / 2, height / 2 + 12);
  }, [title, subTitle]);

  // Redraw when fonts load to ensure clean typography
  useEffect(() => {
    const handleFontsReady = () => {
      initCanvas();
    };
    
    document.fonts.ready.then(handleFontsReady);
    
    // Initial draw
    initCanvas();

    // Resize observer to handle responsiveness
    const resizeObserver = new ResizeObserver(() => {
      if (!isRevealed) {
        initCanvas();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [isRevealed, initCanvas]);

  // Setup touch-action passive handler on canvas to prevent scroll interference on mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchMove = (e) => {
      if (isDrawingRef.current) {
        e.preventDefault();
      }
    };

    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      if (canvas) {
        canvas.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  // Set isRevealed timeout for clean unmounting
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsFullyCleared(true);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }, 500); // Matches the transition duration (500ms)
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  // Get mouse/touch position relative to canvas
  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Optimization: sample every 32nd pixel in alpha channel to compute transparency
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let transparent = 0;
    const step = 32;
    let totalSamples = 0;

    for (let i = 3; i < data.length; i += step * 4) {
      totalSamples++;
      // Count partially transparent pixels (alpha < 150) to handle brush anti-aliasing edges
      if (data[i] < 150) {
        transparent++;
      }
    }

    const percent = (transparent / totalSamples) * 100;

    // Use smaller threshold for mobile touch (15%) than desktop mouse (threshold, which defaults to 45%)
    const activeThreshold = isTouchRef.current ? 15 : threshold;

    if (percent >= activeThreshold) {
      setIsRevealed(true);
    }
  };

  const handleStart = (e) => {
    if (isRevealed) return;

    if (e.touches && e.touches.length > 0) {
      isTouchRef.current = true;
      // Initialize touch coordinates
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      isScrollingRef.current = false;
      gestureDetectedRef.current = false;
      isDrawingRef.current = false;
    } else {
      isTouchRef.current = false;
      isDrawingRef.current = true;
      isScrollingRef.current = false;
      gestureDetectedRef.current = true;
      const pos = getMousePos(e);
      lastPosRef.current = pos;
    }
  };

  const handleMove = (e) => {
    if (isRevealed) return;

    // Gesture detection on mobile to avoid blocking scrolling
    if (e.touches && e.touches.length > 0) {
      if (isScrollingRef.current) return;

      if (!gestureDetectedRef.current) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(currentX - touchStartRef.current.x);
        const diffY = Math.abs(currentY - touchStartRef.current.y);

        // If primarily vertical movement, classify as page scroll
        if (diffY > diffX && diffY > 8) {
          isScrollingRef.current = true;
          gestureDetectedRef.current = true;
          isDrawingRef.current = false;
          return;
        }

        // If horizontal or general scratch movement, classify as scratching
        if (diffX > 6 || diffY > 6) {
          gestureDetectedRef.current = true;
          isDrawingRef.current = true;
          
          const canvas = canvasRef.current;
          if (canvas) {
            const rect = canvas.getBoundingClientRect();
            lastPosRef.current = {
              x: touchStartRef.current.x - rect.left,
              y: touchStartRef.current.y - rect.top,
            };
          }
        }
      }
    }

    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getMousePos(e);

    // Draw scratch line
    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineWidth = brushSizeRef.current; // Dynamic responsive scratch brush size
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPosRef.current = pos;

    // Throttle progress check
    if (!checkTimeoutRef.current) {
      checkTimeoutRef.current = setTimeout(() => {
        checkTimeoutRef.current = null;
        checkProgress();
      }, 100);
    }
  };

  const handleEnd = () => {
    isDrawingRef.current = false;
    isScrollingRef.current = false;
    gestureDetectedRef.current = false;
    checkProgress(); // Final check on release
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none select-none-touch ${className}`}
      style={{ WebkitUserSelect: 'none' }}
    >
      {/* Target Content to Reveal */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* Interactive Scratch Canvas Overlay */}
      {!isFullyCleared && (
        <canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className={`absolute inset-0 w-full h-full z-10 touch-pan-y cursor-pointer transition-opacity duration-500 ease-out ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
};

export default ScratchCard;
