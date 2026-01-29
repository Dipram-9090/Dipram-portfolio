import { useEffect, useRef } from "react";

const WavyGradient = ({
  // COLOR CONTROLS
  color1 = "#2115D1", // Bottom Color (Deep Blue)
  color2 = "#6B64CA", // Middle Color (Cyan/Teal) - NEW
  color3 = "#E9E8FD", // Top Color (White) - MOVED

  // MOTION CONTROLS
  speed = 1.3,        // Speed of the animation
  direction = 15,     // Direction in degrees
  
  // WAVE CONTROLS
  waveFrequency = 7.0,
  waveAmplitude = 1.7,
  noiseIntensity = 3,
}) => {
  const canvasRef = useRef(null);

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return [r, g, b];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    // --- RESIZE HANDLER ---
    const resize = () => {
      const realDpr = window.devicePixelRatio || 1;
      const dpr = Math.min(realDpr, 1.5) * 0.6;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // --- VERTEX SHADER (Unchanged) ---
    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5; 
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // --- FRAGMENT SHADER (Updated for 3 Colors) ---
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 vUv;
      
      uniform float iTime;
      uniform vec3 uColor1; // Bottom
      uniform vec3 uColor2; // Middle
      uniform vec3 uColor3; // Top
      
      uniform float uAngle;
      uniform float uWaveFreq;
      uniform float uWaveAmp;
      uniform float uNoiseStr;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      vec2 rotate(vec2 uv, float rotation, vec2 mid) {
          return vec2(
            cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
            cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
          );
      }

      void main() {
        vec2 uv = rotate(vUv, uAngle, vec2(0.5));

        float n = noise(uv * 5.0 + iTime * 0.5);

        float wave =
          sin(uv.x * (uWaveFreq * 0.4) + iTime * 2.6) * 0.045 * uWaveAmp +
          sin(uv.x * uWaveFreq - iTime * 2.0) * 0.030 * uWaveAmp +
          sin(uv.x * (uWaveFreq * 1.8) + iTime * 3.2 + uv.y * 3.0) * 0.020 * uWaveAmp;

        float gradient = uv.y + wave + (n * 0.08 * uNoiseStr);

        // Clamp and smooth
        gradient = clamp(gradient, 0.0, 1.0);
        gradient = smoothstep(0.0, 1.0, gradient); // Linearize slightly
        
        // --- 3-COLOR MIXING LOGIC ---
        vec3 finalColor;

        // Mix Color 1 to Color 2 (0.0 to 0.5)
        vec3 c1 = mix(uColor1, uColor2, smoothstep(0.0, 0.5, gradient));
        
        // Mix result to Color 3 (0.5 to 1.0)
        finalColor = mix(c1, uColor3, smoothstep(0.5, 1.0, gradient));

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // --- COMPILE & LINK ---
    const createShader = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // --- BUFFERS ---
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // --- UNIFORM LOCATIONS ---
    const locs = {
      time: gl.getUniformLocation(program, "iTime"),
      color1: gl.getUniformLocation(program, "uColor1"),
      color2: gl.getUniformLocation(program, "uColor2"),
      color3: gl.getUniformLocation(program, "uColor3"), // NEW
      angle: gl.getUniformLocation(program, "uAngle"),
      freq: gl.getUniformLocation(program, "uWaveFreq"),
      amp: gl.getUniformLocation(program, "uWaveAmp"),
      noise: gl.getUniformLocation(program, "uNoiseStr"),
    };

    let rafId;
    let isRendering = false;
    let startTime = performance.now();

    const render = (now) => {
      if (!isRendering) return;

      const elapsed = (now - startTime) * 0.001 * speed;

      // Update Uniforms
      gl.uniform1f(locs.time, elapsed % 1000.0);
      gl.uniform3fv(locs.color1, hexToRgb(color1));
      gl.uniform3fv(locs.color2, hexToRgb(color2));
      gl.uniform3fv(locs.color3, hexToRgb(color3)); // NEW
      gl.uniform1f(locs.angle, (direction * Math.PI) / 180);
      gl.uniform1f(locs.freq, waveFrequency);
      gl.uniform1f(locs.amp, waveAmplitude);
      gl.uniform1f(locs.noise, noiseIntensity);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };

    // --- OBSERVER ---
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!isRendering) {
          isRendering = true;
          rafId = requestAnimationFrame(render);
        }
      } else {
        isRendering = false;
        cancelAnimationFrame(rafId);
      }
    });
    observer.observe(canvas);

    return () => {
      isRendering = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
    };
  }, [color1, color2, color3, speed, direction, waveFrequency, waveAmplitude, noiseIntensity]); 

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10"
      style={{ width: "100%", height: "100%" }} 
    />
  );
};

export default WavyGradient;