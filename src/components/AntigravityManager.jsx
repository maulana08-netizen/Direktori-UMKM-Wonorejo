import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { ToggleLeft, ToggleRight, RotateCcw, Power, Move, HelpCircle } from 'lucide-react';

export default function AntigravityManager({ isActive, onClose }) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const clonesRef = useRef([]);
  const originalElementsRef = useRef([]);

  const [useGravity, setUseGravity] = useState(false); // Default is float (antigravity)
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    // Prevent body scrolling while physics is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 1. Find all gravity items in the document
    const targets = Array.from(document.querySelectorAll('.gravity-item'));
    originalElementsRef.current = targets;

    // Get current viewport size
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 2. Setup Matter.js engine and runner
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: useGravity ? 0.8 : 0, scale: 0.001 }
    });
    engineRef.current = engine;

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    // 3. Create walls (bounds of the screen)
    const wallOptions = { isStatic: true, restitution: 0.8, friction: 0.1 };
    const ground = Matter.Bodies.rectangle(width / 2, height + 30, width * 2, 60, wallOptions);
    const ceiling = Matter.Bodies.rectangle(width / 2, -30, width * 2, 60, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);

    Matter.Composite.add(engine.world, [ground, ceiling, leftWall, rightWall]);

    // 4. Transform HTML elements into Matter.js bodies
    const bodies = [];
    const clones = [];

    targets.forEach((target, index) => {
      const rect = target.getBoundingClientRect();
      
      // Skip off-screen or invisible elements
      if (rect.width === 0 || rect.height === 0) return;

      // Clone DOM element
      const clone = target.cloneNode(true);
      
      // Remove transitions and hover styles from clone, apply absolute fixed styles
      clone.classList.add('physics-body');
      clone.style.position = 'fixed';
      clone.style.left = '0px';
      clone.style.top = '0px';
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.margin = '0px';
      clone.style.zIndex = '1000';
      clone.style.transformOrigin = 'center center';
      clone.style.userSelect = 'none';
      clone.style.pointerEvents = 'auto';
      
      // Append clone to overlay container
      containerRef.current.appendChild(clone);
      clones.push({ element: clone, width: rect.width, height: rect.height });

      // Hide original element
      target.style.opacity = '0';
      target.style.pointerEvents = 'none';
      target.style.transition = 'none';

      // Create Matter.js physics body centered at the element's client coordinates
      const bodyX = rect.left + rect.width / 2;
      const bodyY = rect.top + rect.height / 2;
      const body = Matter.Bodies.rectangle(bodyX, bodyY, rect.width, rect.height, {
        restitution: 0.6,
        friction: 0.1,
        frictionAir: useGravity ? 0.01 : 0.05,
        density: 0.001
      });

      // Store index inside the body so we can map it back to the clone
      body.plugin = { cloneIndex: clones.length - 1 };
      bodies.push(body);

      // If floating, give a tiny random initial velocity for a cool floating effect
      if (!useGravity) {
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);
      }
    });

    clonesRef.current = clones;
    Matter.Composite.add(engine.world, bodies);

    // 5. Setup Mouse Constraint for Dragging
    const mouse = Matter.Mouse.create(containerRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Matter.Composite.add(engine.world, mouseConstraint);

    // Keep the mouse in sync with scroll / viewport (since page is not scrolling, it is stable)
    // Avoid default browser scrolling while dragging
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    // 6. Physics loop: update HTML positions based on Matter.js bodies
    const updateLoop = () => {
      const allBodies = Matter.Composite.allBodies(engine.world);
      
      allBodies.forEach(body => {
        // Skip wall bodies which do not have a clone index
        if (body.plugin && body.plugin.cloneIndex !== undefined) {
          const cloneData = clones[body.plugin.cloneIndex];
          if (cloneData) {
            const { element, width, height } = cloneData;
            const x = body.position.x - width / 2;
            const y = body.position.y - height / 2;
            element.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
          }
        }
      });
    };

    Matter.Events.on(engine, 'afterUpdate', updateLoop);

    // Run the engine
    Matter.Runner.run(runner, engine);

    // Cleanup on unmount or when active becomes false
    return () => {
      document.body.style.overflow = originalOverflow;
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);

      // Restore original element visibilities
      targets.forEach(target => {
        target.style.opacity = '';
        target.style.pointerEvents = '';
        target.style.transition = '';
      });

      // Clear clones
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [isActive]);

  // Handle Gravity Toggle
  useEffect(() => {
    if (!engineRef.current) return;
    engineRef.current.gravity.y = useGravity ? 0.8 : 0;
    
    // Adjust friction and air resistance based on mode
    const bodies = Matter.Composite.allBodies(engineRef.current.world);
    bodies.forEach(body => {
      if (!body.isStatic) {
        body.frictionAir = useGravity ? 0.01 : 0.05;
        // If switching to gravity, wake it up
        Matter.Sleeping.set(body, false);
      }
    });
  }, [useGravity]);

  if (!isActive) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-screen h-screen z-50 overflow-hidden bg-emerald-950/20 backdrop-blur-[2px] pointer-events-none select-none"
    >
      {/* Control Panel (Floating on top, clickable) */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[10001] pointer-events-auto select-none">
        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-100 shadow-xl flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="font-heading text-xs font-bold text-gray-700 tracking-wide">
              {useGravity ? 'Mode: Google Gravity' : 'Mode: Antigravity'}
            </span>
          </div>

          <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
            <button
              onClick={() => setUseGravity(!useGravity)}
              className="flex items-center space-x-1.5 text-xs text-gray-600 hover:text-emerald-700 font-bold transition-all focus:outline-none"
              title={useGravity ? "Ganti ke melayang tanpa gravitasi" : "Ganti ke jatuh dengan gravitasi"}
            >
              {useGravity ? (
                <ToggleRight className="w-8 h-8 text-brand-green" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-gray-400" />
              )}
              <span>Gravitasi</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center space-x-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 font-bold px-3 py-1.5 rounded-xl text-xs transition-all active:scale-95 ml-2"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Normal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Instructions/Help Card */}
      {showGuide && (
        <div className="absolute bottom-6 left-6 z-[10001] bg-gray-900/90 text-white p-4 rounded-xl border border-gray-800 shadow-lg pointer-events-auto max-w-xs transition-opacity duration-300">
          <div className="flex justify-between items-center mb-2">
            <span className="font-heading text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Move className="w-3.5 h-3.5" />
              <span>Interactive Physics Active</span>
            </span>
            <button 
              onClick={() => setShowGuide(false)}
              className="text-gray-400 hover:text-white text-xs font-bold px-1"
            >
              &times;
            </button>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed font-light">
            Seret (drag) dan lempar elemen apapun menggunakan kursor mouse Anda! Coba ubah mode gravitasi untuk efek jatuh atau melayang.
          </p>
        </div>
      )}
    </div>
  );
}
