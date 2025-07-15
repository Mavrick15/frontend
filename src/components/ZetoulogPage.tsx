import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { motion } from 'framer-motion';

const ZETOULOG_TEXT_CONSTANTS = {
  WELCOME_TITLE: "Bienvenue chez zetounlabs",
  LOGIN_BUTTON: "Connexion",
  SIGNUP_BUTTON: "Inscription",
  LOGO_ALT_TEXT: "Logo Académie Cyber-Web",
};

const FIREWORKS_COLORS = [
  '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF',
  '#4B0082', '#9400D3', '#FFC0CB', '#ADD8E6', '#FFFFFF',
];

const getRandomColor = () => {
  return FIREWORKS_COLORS[Math.floor(Math.random() * FIREWORKS_COLORS.length)];
};

const ZetoulogPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drops = [];
    const splashes = [];
    const numDrops = 100;
    const maxSplashLife = 25;

    for (let i = 0; i < numDrops; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 3 + 1,
        color: getRandomColor(),
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.fillStyle = drop.color;
        ctx.fill();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          const numSplashParticles = 10;
          const splashParticles = [];
          for (let j = 0; j < numSplashParticles; j++) {
            const angle = Math.random() * Math.PI;
            const speed = Math.random() * 6 + 2;
            splashParticles.push({
              x: drop.x,
              y: canvas.height,
              vx: Math.cos(angle) * speed,
              vy: -Math.sin(angle) * speed,
              life: maxSplashLife,
              color: getRandomColor(),
              radius: Math.random() * 1 + 0.5,
            });
          }
          splashes.push({ particles: splashParticles });

          drop.y = -drop.radius;
          drop.x = Math.random() * canvas.width;
          drop.color = getRandomColor();
        }
      }

      for (let i = splashes.length - 1; i >= 0; i--) {
        const splash = splashes[i];
        for (let j = splash.particles.length - 1; j >= 0; j--) {
          const particle = splash.particles[j];

          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.2;
          particle.life--;

          const opacity = particle.life / maxSplashLife;
          if (opacity > 0) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${parseInt(particle.color.slice(1, 3), 16)}, ${parseInt(particle.color.slice(3, 5), 16)}, ${parseInt(particle.color.slice(5, 7), 16)}, ${opacity})`;
            ctx.fill();
          } else {
            splash.particles.splice(j, 1);
          }
        }
        if (splash.particles.length === 0) {
          splashes.splice(i, 1);
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animate();
  }, []);

  useEffect(() => {
    drawParticles();

    const handleResize = () => {
      drawParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawParticles]);

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

      <div className="relative z-10 p-4 flex flex-col items-center justify-center w-full h-full">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-10 text-center tracking-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {ZETOULOG_TEXT_CONSTANTS.WELCOME_TITLE}
        </motion.h1>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <img
            src="lovable-uploads/logo/Logo21.png"
            alt={ZETOULOG_TEXT_CONSTANTS.LOGO_ALT_TEXT}
            className="rounded-full shadow-lg border-4 border-gray-700"
          />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Button
            variant="default"
            className="text-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-full px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center gap-3 border border-gray-600"
            onClick={() => navigate('/login')}
          >
            <LogIn className="h-6 w-6" />
            {ZETOULOG_TEXT_CONSTANTS.LOGIN_BUTTON}
          </Button>
          <Button
            variant="default"
            className="text-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-full px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center gap-3 border border-gray-600"
            onClick={() => navigate('/signup')}
          >
            <UserPlus className="h-6 w-6" />
            {ZETOULOG_TEXT_CONSTANTS.SIGNUP_BUTTON}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ZetoulogPage;
