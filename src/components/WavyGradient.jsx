import { useEffect, useRef } from "react";

const WavyGradient = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // OPTIMIZATION 1: { alpha: false }
    // Tells the browser this canvas is opaque, speeding up the page compositor.
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });

    if (!gl) return;

    const resize = () => {
      // OPTIMIZATION 2: Reduced Resolution
      // For gradients, you don't need high DPI.
      // 0.6 looks almost identical to 1.5 for this shader but runs 4x faster.
      const dpr = 0.6;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Ensure CSS keeps it full screen
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      uniform vec2 iResolution;
      uniform float iTime;

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

      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;

        vec3 startColor = vec3(12.0 / 255.0, 1.0 / 255.0, 166.0 / 255.0);
        vec3 endColor   = vec3(1.0);

        float n = noise(uv * 5.0 + iTime * 0.8);

        float wave =
          sin(uv.x * 2.0 + iTime * 2.6) * 0.045 +
          sin(uv.x * 5.0 - iTime * 2.0) * 0.030 +
          sin(uv.x * 9.0 + iTime * 3.2 + uv.y * 3.0) * 0.020;

        float gradient =
          uv.y +
          wave +
          n * 0.08;

        gradient = clamp(gradient, 0.0, 1.0);
        gradient = smoothstep(0.05, 0.95, gradient);
        gradient = pow(gradient, 1.7);

        vec3 color = mix(startColor, endColor, gradient);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(
      program,
      compileShader(gl.VERTEX_SHADER, vertexShaderSource),
    );
    gl.attachShader(
      program,
      compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource),
    );
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "iTime");
    const resLoc = gl.getUniformLocation(program, "iResolution");

    let rafId;
    let isRendering = false;

    const render = (t) => {
      if (!isRendering) return;

      gl.uniform1f(timeLoc, t * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafId = requestAnimationFrame(render);
    };

    // OPTIMIZATION 3: Intersection Observer
    // Stops the GPU loop completely when the element is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isRendering) {
            isRendering = true;
            rafId = requestAnimationFrame(render);
          }
        } else {
          isRendering = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 },
    );

    observer.observe(canvas);

    return () => {
      isRendering = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />
  );
};

export default WavyGradient;
