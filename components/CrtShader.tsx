import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_intensity;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    float a = hash21(cell);
    float b = hash21(cell + vec2(1.0, 0.0));
    float c = hash21(cell + vec2(0.0, 1.0));
    float d = hash21(cell + vec2(1.0, 1.0));

    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 centered = uv * 2.0 - 1.0;
    centered.x *= u_resolution.x / u_resolution.y;

    float radius2 = dot(centered, centered);
    vec2 screenUv = uv;

    float edgeX = smoothstep(0.0, 0.035, screenUv.x) *
      smoothstep(0.0, 0.035, 1.0 - screenUv.x);
    float edgeY = smoothstep(0.0, 0.045, screenUv.y) *
      smoothstep(0.0, 0.045, 1.0 - screenUv.y);
    float screenMask = edgeX * edgeY;

    float scanline = 0.5 + 0.5 * sin(screenUv.y * u_resolution.y * 3.14159265);
    scanline *= scanline;

    float fineNoise = hash21(gl_FragCoord.xy + vec2(u_time * 137.0, u_time * 73.0));
    float cloudNoise = noise(screenUv * vec2(240.0, 135.0) + u_time * 5.0);
    float staticNoise = mix(fineNoise, cloudNoise, 0.35);

    float bandY = abs(fract(screenUv.y - u_time * 0.075) - 0.5);
    float rollingBand = 1.0 - smoothstep(0.0, 0.12, bandY);
    float horizontalTear = step(0.994, hash21(vec2(floor(u_time * 9.0), floor(screenUv.y * 180.0))));

    float pixelColumn = mod(floor(gl_FragCoord.x), 3.0);
    vec3 phosphor = pixelColumn < 1.0
      ? vec3(1.0, 0.16, 0.12)
      : pixelColumn < 2.0
        ? vec3(0.12, 1.0, 0.18)
        : vec3(0.12, 0.25, 1.0);

    float vignette = 1.0 - smoothstep(0.22, 1.25, radius2);
    float glassRefraction = smoothstep(0.38, 1.18, radius2) *
      (1.0 - smoothstep(1.15, 1.7, radius2));
    float flicker = 0.92 + 0.08 * sin(u_time * 48.0) + (fineNoise - 0.5) * 0.035;

    vec3 color = phosphor * (0.012 + staticNoise * 0.025);
    color += vec3(0.02, 0.055, 0.06) * rollingBand * 0.45;
    color += vec3(0.08, 0.015, 0.025) * horizontalTear * 0.32;
    color += mix(
      vec3(0.055, 0.008, 0.018),
      vec3(0.005, 0.04, 0.065),
      clamp(screenUv.x, 0.0, 1.0)
    ) * glassRefraction * 0.5;
    color *= vignette * flicker;

    float darkness = (1.0 - scanline) * 0.025;
    darkness += (1.0 - vignette) * 0.06;
    darkness += (1.0 - screenMask) * 0.22;
    darkness *= u_intensity;

    float colorAlpha = (0.045 + staticNoise * 0.035 + rollingBand * 0.025 +
      glassRefraction * 0.025) *
      screenMask * u_intensity;
    vec3 premultiplied = color * colorAlpha;
    float alpha = clamp(darkness + colorAlpha, 0.0, 0.34);

    gl_FragColor = vec4(premultiplied, alpha);
  }
`;

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("CRT shader compilation failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createBarrelDisplacementMap = () => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return "";

  const image = context.createImageData(size, size);
  const pixels = image.data;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = (x / (size - 1)) * 2 - 1;
      const ny = (y / (size - 1)) * 2 - 1;
      const radius2 = nx * nx + ny * ny;
      const falloff = Math.min(radius2, 1.65);
      const offsetX = nx * falloff * 0.26;
      const offsetY = ny * falloff * 0.26;
      const index = (y * size + x) * 4;

      pixels[index] = Math.round((0.5 + offsetX) * 255);
      pixels[index + 1] = Math.round((0.5 + offsetY) * 255);
      pixels[index + 2] = 128;
      pixels[index + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
};

let cachedDisplacementMap: string | null = null;

const getBarrelDisplacementMap = () => {
  if (!cachedDisplacementMap) {
    cachedDisplacementMap = createBarrelDisplacementMap();
  }
  return cachedDisplacementMap;
};

const CrtShader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const displacementMap = getBarrelDisplacementMap();

  useEffect(() => {
    const updateScale = () => {
      const scale = Math.max(
        52,
        Math.min(140, Math.min(window.innerWidth, window.innerHeight) * 0.12),
      );
      displacementRef.current?.setAttribute("scale", String(scale));
    };

    document.body.classList.add("crt-viewport-active");
    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      document.body.classList.remove("crt-viewport-active");
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("CRT shader linking failed:", gl.getProgramInfoLog(program));
      return;
    }

    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const intensityLocation = gl.getUniformLocation(program, "u_intensity");

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.BLEND);
    gl.uniform1f(intensityLocation, 1.0);

    let animationFrame = 0;
    let startTime = performance.now();
    let lastFrameTime = 0;
    let running = true;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const frameInterval = 1000 / (reducedMotion ? 10 : 30);

    const resize = () => {
      const renderScale = 0.75;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.0) * renderScale;
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolutionLocation, width, height);
    };

    const render = (now: number) => {
      if (!running) return;
      animationFrame = requestAnimationFrame(render);
      const elapsed = now - lastFrameTime;
      if (elapsed < frameInterval) return;
      lastFrameTime = now - (elapsed % frameInterval);
      gl.uniform1f(timeLocation, (now - startTime) * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationFrame);
      } else if (!running) {
        running = true;
        lastFrameTime = performance.now();
        animationFrame = requestAnimationFrame(render);
      }
    };

    const handleContextRestored = () => {
      startTime = performance.now();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return createPortal(
    <>
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        className="fixed pointer-events-none"
      >
        <defs>
          <filter
            id="crt-barrel-distortion"
            x="-8%"
            y="-8%"
            width="116%"
            height="116%"
            filterRes="640 360"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={displacementMap}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="barrelMap"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="barrelMap"
              scale="52"
              xChannelSelector="R"
              yChannelSelector="G"
              result="warpedSource"
            />
            <feColorMatrix
              in="warpedSource"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="redChannelRaw"
            />
            <feColorMatrix
              in="warpedSource"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="greenChannel"
            />
            <feColorMatrix
              in="warpedSource"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="blueChannelRaw"
            />
            <feOffset
              in="redChannelRaw"
              dx="-1.25"
              dy="0.35"
              result="redChannel"
            />
            <feOffset
              in="blueChannelRaw"
              dx="1.25"
              dy="-0.35"
              result="blueChannel"
            />
            <feBlend
              in="redChannel"
              in2="greenChannel"
              mode="screen"
              result="redGreenChannels"
            />
            <feBlend
              in="redGreenChannels"
              in2="blueChannel"
              mode="screen"
            />
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-[9996] h-screen w-screen pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[9995] pointer-events-none rounded-[2.5rem] shadow-[inset_0_0_38px_rgba(0,0,0,0.14),inset_0_0_10px_rgba(0,240,255,0.08)]"
      />
      <div
        aria-hidden="true"
        className="fixed inset-[3px] z-[9997] pointer-events-none rounded-[2.4rem] border border-white/[0.035]"
      />
    </>,
    document.body,
  );
};

export default CrtShader;
