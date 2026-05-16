import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import './App.css';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// SVG components
const LightningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block text-[#c8f525]">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const GavelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"></path>
    <path d="m16 16 6-6"></path>
    <path d="m8 8 6-6"></path>
    <path d="m9 7 8 8"></path>
    <path d="m21 11-8-8"></path>
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c8f525]">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);

const InkSplatter = ({ className, opacity = 0.08, delay = 0 }) => (
  <motion.svg
    className={`absolute pointer-events-none z-0 ${className}`}
    style={{ opacity }}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    animate={{
      x: [0, 120, -80, 90, 0],
      y: [0, -90, 70, -50, 0],
      rotate: [0, 45, -20, 30, 0],
      scale: [1, 1.3, 0.85, 1.2, 1]
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  >
    <path fill="currentColor" d="M45.7,-76.4C58.3,-68.9,66.9,-54.2,74.7,-39.6C82.5,-25,89.5,-10.5,88.1,3.2C86.7,16.9,76.8,29.8,66.5,40.8C56.2,51.8,45.5,60.9,32.7,68.8C19.9,76.7,5,83.4,-8.6,81.7C-22.2,80,-34.5,69.9,-47.5,60.7C-60.5,51.5,-74.2,43.2,-80.7,30.3C-87.2,17.4,-86.5,0,-82.1,-15.5C-77.7,-31,-69.6,-44.6,-57.8,-53.2C-46,-61.8,-30.5,-65.4,-15.9,-68.8C-1.3,-72.2,12.4,-75.4,26,-78.5C39.6,-81.6,53.3,-84.6,45.7,-76.4Z" transform="translate(100 100)" />
  </motion.svg>
);

const RevealOnScroll = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 12,
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

const HeroOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      className="absolute top-[20%] left-[20%] w-64 h-64 rounded-full bg-[#c8f525] mix-blend-screen opacity-20 blur-[80px]"
      animate={{
        x: [0, 50, -50, 0],
        y: [0, -50, 50, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute top-[40%] right-[15%] w-80 h-80 rounded-full bg-[#4a90d9] mix-blend-screen opacity-20 blur-[100px]"
      animate={{
        x: [0, -70, 40, 0],
        y: [0, 60, -30, 0],
        scale: [1, 1.5, 0.9, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute bottom-[10%] left-[40%] w-72 h-72 rounded-full bg-[#d94a6e] mix-blend-screen opacity-20 blur-[90px]"
      animate={{
        x: [0, 80, -60, 0],
        y: [0, -40, 70, 0],
        scale: [1, 0.8, 1.3, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const MASCOT_IMAGES = ['/Power1.png', '/power peek.png', '/power_sit.png', '/power_yay.png'];

const InteractiveMascot = ({ state = 'waiting' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [poof, setPoof] = useState(false);
  const [imageSrc, setImageSrc] = useState(state === 'waiting' ? '/power peek.png' : '/power_yay.png');

  const handleHover = () => {
    // Jump away from cursor, keeping mostly within the right-side main area
    // If we are near x=0 (sidebar), jump right. Otherwise jump random.
    let nextX = position.x < 100 ? position.x + 200 + Math.random() * 200 : position.x + (Math.random() > 0.5 ? 200 : -200);
    // Constrain to prevent jumping off screen
    nextX = Math.max(0, Math.min(nextX, 800));

    const nextY = (Math.random() - 0.5) * 400;

    setPoof(true);
    setPosition({ x: nextX, y: nextY });
    setImageSrc(MASCOT_IMAGES[Math.floor(Math.random() * MASCOT_IMAGES.length)]);
    setTimeout(() => setPoof(false), 500);
  };

  return (
    <div className="relative z-50 flex items-center justify-center">
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", damping: 15, stiffness: 150 }}
        className="relative cursor-pointer"
        onMouseEnter={handleHover}
      >
        {poof && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 bg-white rounded-full blur-xl z-0"
          />
        )}
        <motion.img
          src={imageSrc}
          alt="Mascot"
          className="w-48 h-48 object-contain drop-shadow-[0_0_25px_rgba(200,245,37,0.4)] relative z-10"
          animate={{
            y: [0, -12, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

const Navbar = ({ onEnterArena }) => {
  return (
    <nav className="sticky top-0 h-16 bg-[#0d0d14] border-b border-[#3a3a48] z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onEnterArena('home')}>
        <span className="font-bebas text-2xl tracking-wide flex items-center">
          AI <LightningIcon /> BATTLE ARENA
        </span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <button className="text-[#aaaabc] hover:text-[#c8f525] font-inter text-[13px] font-bold uppercase tracking-wider transition-colors">History</button>
        <button className="text-[#aaaabc] hover:text-[#c8f525] font-inter text-[13px] font-bold uppercase tracking-wider transition-colors">Leaderboard</button>
        <motion.button
          whileHover={{ scale: 1.2, rotate: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => onEnterArena('arena')}
          className="btn-primary py-2 px-6 text-[16px]"
        >
          Enter Arena →
        </motion.button>
      </div>
      <div className="md:hidden">
        <MenuIcon />
      </div>
    </nav>
  );
};

const HowItWorksCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const cards = [
    { num: '01', title: 'SUBMIT YOUR PROMPT', desc: 'Enter your coding problem, creative writing task, or factual question into the arena input.', tagClass: '' },
    { num: '02', title: 'FIGHTERS CLASH', desc: 'Two distinct AI models generate solutions simultaneously, battling for the best response.', tagClass: 'bg-[#c8f525] text-[#0d0d14]' },
    { num: '03', title: 'JUDGE DECIDES', desc: 'An impartial AI judge evaluates both solutions, provides reasoning, and declares the ultimate winner.', tagClass: '' }
  ];

  const getTranslateX = (i) => {
    if (clickedIndex !== null) {
      if (clickedIndex === 0) {
        if (i === 1) return 180;
        if (i === 2) return 200;
      }
      if (clickedIndex === 1) {
        if (i === 0) return -180;
        if (i === 2) return 180;
      }
      if (clickedIndex === 2) {
        if (i === 0) return -200;
        if (i === 1) return -180;
      }
      return 0;
    }

    if (hoveredIndex !== null) {
      if (hoveredIndex === 0) {
        if (i === 1) return 60;
        if (i === 2) return 90;
      }
      if (hoveredIndex === 1) {
        if (i === 0) return -60;
        if (i === 2) return 60;
      }
      if (hoveredIndex === 2) {
        if (i === 0) return -90;
        if (i === 1) return -60;
      }
    }
    return 0;
  };

  const getScale = (i) => {
    if (clickedIndex === i) return 1.25;
    if (hoveredIndex === i && clickedIndex === null) return 1.15;
    if (clickedIndex !== null && clickedIndex !== i) return 0.9;
    return 1;
  };

  const getAnimationProps = (i) => {
    const tx = getTranslateX(i);
    const scale = getScale(i);

    if (clickedIndex !== null && clickedIndex !== i) {
      return {
        animate: { scale, x: [tx - 5, tx + 5, tx - 5], y: 0 },
        transition: { x: { repeat: Infinity, duration: 0.1, ease: "linear" }, default: { type: "spring", stiffness: 300, damping: 20 } }
      };
    }

    if (clickedIndex === i) {
      return {
        animate: { scale, x: tx, y: [0, -15, 0] },
        transition: { y: { repeat: Infinity, duration: 2, ease: "easeInOut" }, default: { type: "spring", stiffness: 300, damping: 20 } }
      }
    }

    if (hoveredIndex === i) {
      return {
        animate: { scale, x: tx, y: [0, -12, 0] },
        transition: { y: { repeat: Infinity, duration: 2, ease: "easeInOut" }, default: { type: "spring", stiffness: 300, damping: 20 } }
      };
    }

    return {
      animate: { scale, x: tx, y: 0 },
      transition: { type: "spring", stiffness: 300, damping: 20 }
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20">
      {cards.map((c, i) => {
        const isClicked = clickedIndex === i;
        const isOtherClicked = clickedIndex !== null && clickedIndex !== i;
        const animProps = getAnimationProps(i);

        return (
          <motion.div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setClickedIndex(isClicked ? null : i)}
            animate={animProps.animate}
            transition={animProps.transition}
            className={`bg-[#2a2a35] p-8 border-l-4 border-[#c8f525] relative group hover:border-[#9fc01a] transition-colors cursor-pointer ${isClicked ? 'z-50 shadow-[0_20px_50px_rgba(200,245,37,0.4)]' : 'z-10'} ${isOtherClicked ? 'opacity-70 grayscale' : ''}`}
            style={{ originX: i === 0 ? 0 : i === 2 ? 1 : 0.5 }}
          >
            {isClicked && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#c8f52530] via-transparent to-transparent animate-pulse"></div>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-30">
                  <motion.line x1="-20" y1="20" x2="120" y2="20" stroke="#c8f525" strokeWidth="2" animate={{ x: [-150, 150] }} transition={{ repeat: Infinity, duration: 0.3 }} />
                  <motion.line x1="-20" y1="50" x2="120" y2="50" stroke="#c8f525" strokeWidth="3" animate={{ x: [-150, 150] }} transition={{ repeat: Infinity, duration: 0.2 }} />
                  <motion.line x1="-20" y1="80" x2="120" y2="80" stroke="#c8f525" strokeWidth="1" animate={{ x: [-150, 150] }} transition={{ repeat: Infinity, duration: 0.4 }} />
                </svg>
              </div>
            )}

            <div className={`badge-tag absolute -top-3 -left-1 ${c.tagClass} relative z-10`}>{c.num}</div>
            <h3 className="font-bebas text-3xl mb-4 mt-2 group-hover:text-[#c8f525] transition-colors relative z-10">{c.title}</h3>
            <p className="text-[#aaaabc] font-inter relative z-10">{c.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

const LandingPage = ({ onEnterArena }) => {
  return (
    <div className="min-h-screen bg-[#0d0d14] flex flex-col relative overflow-hidden ink-bg">
      <Navbar onEnterArena={onEnterArena} />

      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center min-h-[80vh] px-6 py-20 overflow-hidden">
        <InkSplatter className="text-[#c8f525] -top-20 -left-20 w-[400px] h-[400px]" opacity={0.06} delay={0} />
        <InkSplatter className="text-[#ffffff] bottom-0 -right-20 w-[500px] h-[500px]" opacity={0.03} delay={2} />

        {/* Tape strips */}
        <div className="absolute top-1/4 left-10 w-48 h-3 bg-[#c8f525] rotate-[-12deg] opacity-80 mix-blend-overlay"></div>
        <div className="absolute bottom-1/3 right-10 w-64 h-4 bg-[#3a3a48] rotate-[8deg] opacity-60"></div>

        <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="badge-tag mb-8 bg-[#2a2a35] text-[#c8f525] border border-[#3a3a48]">The Ultimate AI Showdown</div>

          <h1 className="font-bebas text-6xl md:text-[88px] leading-[0.9] tracking-wider mb-6 text-white drop-shadow-lg glitch-hover cursor-default">
            TWO AIs ENTER.<br />
            <span className="text-[#c8f525]">ONE ANSWER WINS.</span>
          </h1>

          <p className="font-inter text-lg text-[#aaaabc] mb-12 max-w-2xl leading-relaxed">
            Submit your question. Watch two AI fighters battle it out in real-time. The Judge evaluates the results and declares the ultimate winner.
          </p>

          <motion.button
            whileHover={{ scale: 1.25, rotate: -4 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            onClick={() => onEnterArena('arena')}
            className="btn-primary text-2xl py-5 px-10 shadow-[0_0_30px_rgba(200,245,37,0.3)] z-10"
          >
            START THE BATTLE →
          </motion.button>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#1a1a22] py-24 px-6 border-t-2 border-b-2 border-[#3a3a48] relative">
        <RevealOnScroll>
          <div className="max-w-6xl mx-auto">
            <h2 className="font-bebas text-5xl text-center mb-16 tracking-wide">HOW THE ARENA WORKS</h2>

            <HowItWorksCards />
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 flex flex-col items-center relative overflow-hidden">
        <RevealOnScroll>
          <div className="flex flex-col items-center relative z-10">
            <InkSplatter className="text-[#c8f525] absolute -top-20 -z-10 w-[300px] h-[300px]" opacity={0.05} />
            <h2 className="font-bebas text-5xl mb-8 tracking-wide glitch-hover cursor-default">READY TO ENTER THE ARENA?</h2>
            <motion.button
              whileHover={{ scale: 1.25, rotate: 4 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              onClick={() => onEnterArena('arena')}
              className="btn-secondary relative z-10"
            >
              LAUNCH APP →
            </motion.button>
          </div>
        </RevealOnScroll>
      </section>

      <footer className="bg-[#0a0a10] py-6 px-6 flex justify-between items-center text-[#6a6a7a] font-inter text-sm border-t border-[#3a3a48]">
        <div className="font-bebas tracking-wider text-lg">AI BATTLE ARENA</div>
        <div className="flex flex-col items-end gap-1">
          <div>© 2026 Akshat</div>
          <a href="https://github.com/Akshvt" target="_blank" rel="noopener noreferrer" className="hover:text-[#c8f525] transition-colors flex items-center gap-1 text-[12px]">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            @Akshvt
          </a>
        </div>
      </footer>
    </div>
  );
};

const SolutionCard = ({ fighter, content, isWinner, delay, stats }) => {
  const isA = fighter === 'A';
  const color = isA ? '#4a90d9' : '#d94a6e';
  const name = isA ? 'FIGHTER A' : 'FIGHTER B';
  const modelName = isA ? 'MistralAI (Medium/Large)' : 'Google Gemini (Flash)';

  return (
    <div
      className={`card-base animate-enter opacity-0 flex flex-col h-full`}
      style={{
        borderLeft: `4px solid ${color}`,
        animationDelay: `${delay}ms`
      }}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="badge-tag" style={{ background: color, color: '#fff' }}>SOLUTION {fighter}</div>
        {isWinner && <div className="badge-tag animate-winner" style={{ background: '#c8f525', color: '#0d0d14' }}>WINNER</div>}
      </div>

      <div className="mb-4">
        <h3 className="font-bebas text-3xl tracking-wide text-white mb-1">{name}</h3>
        <p className="font-inter text-xs text-white/50">{modelName}</p>
      </div>

      <div className="font-inter text-[15px] text-[#e4e4e7] leading-relaxed flex-1 markdown-body">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
      </div>

      <div className="mt-6 pt-4 border-t border-[#3a3a48] flex justify-between text-[#aaaabc] text-xs font-inter uppercase tracking-widest font-bold">
        <span>Tokens: {stats?.tokens || Math.floor(Math.random() * 300) + 150}</span>
        <span>Time: {stats?.time ? stats.time.toFixed(2) : (Math.random() * 2 + 1).toFixed(2)}s</span>
      </div>
    </div>
  );
};

const LoadingCard = ({ fighter }) => {
  const isA = fighter === 'A';
  const color = isA ? '#4a90d9' : '#d94a6e';

  return (
    <div className="card-base h-full overflow-hidden relative" style={{ borderLeft: `4px solid ${color}`, boxShadow: `0 0 15px ${color}40` }}>
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-[#c8f525] to-transparent animate-[scan_2s_linear_infinite] z-10" style={{ top: '-100%' }}></div>
      <div className="relative z-20">
        <div className="badge-tag mb-6" style={{ background: color, color: '#fff' }}>SOLUTION {fighter}</div>
        <div className="h-8 w-48 bg-[#2a2a35] rounded-sm mb-6 animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-4 bg-[#2a2a35] rounded-sm w-[90%] animate-pulse" style={{ animationDelay: '100ms' }}></div>
          <div className="h-4 bg-[#2a2a35] rounded-sm w-[95%] animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="h-4 bg-[#2a2a35] rounded-sm w-[80%] animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="h-4 bg-[#2a2a35] rounded-sm w-[85%] animate-pulse" style={{ animationDelay: '400ms' }}></div>
          <div className="h-4 bg-[#2a2a35] rounded-sm w-[60%] animate-pulse" style={{ animationDelay: '500ms' }}></div>
        </div>
      </div>
    </div>
  );
};

const JudgeCard = ({ winner, reasoning, delay }) => {
  return (
    <div className="card-base w-full mt-6 animate-enter opacity-0" style={{ borderTop: '4px solid #c8f525', animationDelay: `${delay}ms` }}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="badge-tag flex items-center gap-1">
            <GavelIcon /> JUDGE'S VERDICT
          </div>
          <p className="font-inter text-xs text-white/50 mt-2">Llama 3.3 / DeepSeek V4</p>
        </div>
      </div>

      <div className="font-inter text-[15px] text-[#e4e4e7] leading-relaxed mb-8 border-l-2 border-[#3a3a48] pl-4 markdown-body">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{reasoning}</ReactMarkdown>
      </div>

      <div className="bg-[#0d0d14] border border-[#3a3a48] p-6 flex flex-col md:flex-row items-center gap-6 rounded-sm">
        <div className="flex-1">
          <span className="font-inter text-[11px] font-bold text-[#aaaabc] uppercase tracking-widest mb-1 block">ULTIMATE WINNER</span>
          <h3 className="font-bebas text-4xl tracking-wide" style={{ color: winner === 'A' ? '#4a90d9' : '#d94a6e' }}>
            FIGHTER {winner}
          </h3>
        </div>
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#1a1a22] border-2 border-[#c8f525] shadow-[0_0_20px_rgba(200,245,37,0.3)] animate-winner" style={{ animationDelay: `${delay + 300}ms` }}>
          <TrophyIcon />
        </div>
      </div>

      {/* Yay Mascot for winner */}
      <div className="absolute -top-16 -right-8 opacity-0 animate-[slideUpFade_0.5s_ease-out_forwards]" style={{ animationDelay: `${delay + 600}ms` }}>
        <motion.img
          src="/power_yay.png"
          className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(200,245,37,0.6)]"
          animate={{
            y: [0, -10, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

const MessageUnit = ({ message }) => {
  if (message.status === 'loading') {
    return (
      <div className="mb-12">
        <div className="flex justify-end mb-6">
          <div className="bg-[#2a2a35] border-l-4 border-[#c8f525] p-5 rounded-sm max-w-[85%] md:max-w-[70%] relative">
            <div className="text-[11px] font-inter font-bold text-[#c8f525] tracking-widest uppercase absolute -top-2 bg-[#1a1a22] px-2 left-4 border border-[#3a3a48]">YOUR PROMPT</div>
            <p className="font-inter text-white mt-1 leading-relaxed">{message.prompt}</p>
          </div>
        </div>

        {/* VS Divider */}
        <div className="relative h-14 flex items-center mb-6 my-8">
          <div className="w-1/2 h-full bg-[#4a90d9] flex flex-col items-center justify-center">
            <span className="font-bebas text-white tracking-widest text-lg leading-none">FIGHTER A</span>
            <span className="font-inter text-[10px] text-white/60 leading-none mt-1">MistralAI</span>
          </div>
          <div className="w-1/2 h-full bg-[#d94a6e] flex flex-col items-center justify-center">
            <span className="font-bebas text-white tracking-widest text-lg leading-none">FIGHTER B</span>
            <span className="font-inter text-[10px] text-white/60 leading-none mt-1">Gemini</span>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-[#c8f525] rounded-full border-4 border-[#0d0d14] flex items-center justify-center z-10">
            <span className="font-bebas text-[#0d0d14] text-[22px] tracking-wider pt-1">VS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LoadingCard fighter="A" />
          <LoadingCard fighter="B" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex justify-end mb-6">
        <div className="bg-[#2a2a35] border-l-4 border-[#c8f525] p-5 rounded-sm max-w-[85%] md:max-w-[70%] relative">
          <div className="text-[11px] font-inter font-bold text-[#c8f525] tracking-widest uppercase absolute -top-2 bg-[#1a1a22] px-2 left-4 border border-[#3a3a48]">YOUR PROMPT</div>
          <p className="font-inter text-white mt-1 leading-relaxed">{message.prompt}</p>
        </div>
      </div>

      {/* VS Divider */}
      <div className="relative h-14 flex items-center mb-8 mt-10">
        <div className="w-1/2 h-full bg-[#4a90d9] flex flex-col items-center justify-center">
          <span className="font-bebas text-white tracking-widest text-lg leading-none">FIGHTER A</span>
          <span className="font-inter text-[10px] text-white/60 leading-none mt-1">MistralAI</span>
        </div>
        <div className="w-1/2 h-full bg-[#d94a6e] flex flex-col items-center justify-center">
          <span className="font-bebas text-white tracking-widest text-lg leading-none">FIGHTER B</span>
          <span className="font-inter text-[10px] text-white/60 leading-none mt-1">Gemini</span>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-[#c8f525] rounded-full border-4 border-[#0d0d14] flex items-center justify-center z-10">
          <span className="font-bebas text-[#0d0d14] text-[22px] tracking-wider pt-1">VS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <SolutionCard fighter="A" content={message.solutionA} isWinner={message.winner === 'A'} delay={0} stats={message.statsA} />
        <SolutionCard fighter="B" content={message.solutionB} isWinner={message.winner === 'B'} delay={80} stats={message.statsB} />
      </div>

      <JudgeCard winner={message.winner} reasoning={message.reasoning} delay={160} />
    </div>
  );
};

const ArenaPage = ({ onEnterArena }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [flash, setFlash] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const promptText = inputValue;
    const msgId = Date.now();

    const newMsg = {
      id: msgId,
      prompt: promptText,
      status: 'loading'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputValue('');

    try {
      const response = await fetch(`${API_URL}/api/battle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: promptText })
      });

      if (!response.ok) throw new Error('Battle failed');

      const result = await response.json();

      // Trigger flash effect
      setFlash(true);
      setTimeout(() => setFlash(false), 800);

      setMessages(prev => prev.map(msg => {
        if (msg.id === msgId) {
          const winner = result.judge.solution_1_score >= result.judge.solution_2_score ? 'A' : 'B';
          return {
            ...msg,
            status: 'complete',
            solutionA: result.solution_1,
            solutionB: result.solution_2,
            statsA: result.solution_1_stats,
            statsB: result.solution_2_stats,
            winner: winner,
            reasoning: `FIGHTER ${winner} takes the win. ${winner === 'A' ? result.judge.solution_1_reasoning : result.judge.solution_2_reasoning}`
          };
        }
        return msg;
      }));
    } catch (error) {
      console.error('Error during battle:', error);
      setMessages(prev => prev.map(msg => {
        if (msg.id === msgId) {
          return { ...msg, status: 'complete', solutionA: 'Error: Failed to fetch response from arena.', solutionB: 'Error: Failed to fetch response from arena.', reasoning: 'The battle was interrupted by a connection error.' };
        }
        return msg;
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen bg-[#0d0d14] flex flex-col overflow-hidden ink-bg relative">
      {flash && <div className="fixed inset-0 bg-[#c8f525] mix-blend-overlay z-[100] animate-flash pointer-events-none"></div>}

      <Navbar onEnterArena={onEnterArena} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[280px] bg-[#1a1a22] border-r border-[#3a3a48] hidden lg:flex flex-col flex-shrink-0">
          <div className="p-6 pb-2">
            <h3 className="font-bebas text-xl text-[#c8f525] tracking-wider mb-6">CASE FILES</h3>
            <motion.button
              whileHover={{ scale: 1.15, rotate: -1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="btn-secondary w-full text-base py-3 mb-6"
              onClick={() => setMessages([])}
            >
              NEW BATTLE +
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="space-y-2">
              <div className="bg-[#2a2a35] p-4 border-l-2 border-[#c8f525] cursor-pointer rounded-sm">
                <p className="font-inter text-sm text-white truncate font-medium">React useEffect cleanup...</p>
                <p className="font-inter text-xs text-[#6a6a7a] mt-2">Active Session</p>
              </div>
              <div className="p-4 border-l-2 border-transparent hover:bg-[#2a2a35] hover:border-[#3a3a48] cursor-pointer transition-colors rounded-sm">
                <p className="font-inter text-sm text-[#aaaabc] truncate">Center a div in CSS...</p>
                <p className="font-inter text-xs text-[#6a6a7a] mt-2">Yesterday</p>
              </div>
              <div className="p-4 border-l-2 border-transparent hover:bg-[#2a2a35] hover:border-[#3a3a48] cursor-pointer transition-colors rounded-sm">
                <p className="font-inter text-sm text-[#aaaabc] truncate">Write a python scraper for...</p>
                <p className="font-inter text-xs text-[#6a6a7a] mt-2">Oct 12, 2026</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {messages.length === 0 && (
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none -translate-x-4 z-20">
              <div className="pointer-events-auto">
                <InteractiveMascot state="waiting" />
              </div>
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <div className="max-w-[900px] mx-auto w-full pb-32">
              {messages.length === 0 ? (
                <div className="h-full min-h-[50vh] flex flex-col items-center justify-center text-center mt-20 relative z-10">
                  <h2 className="font-bebas text-4xl text-[#aaaabc] mb-2 mt-4 relative z-10">THE ARENA IS EMPTY</h2>
                  <p className="font-inter text-[#6a6a7a] max-w-md relative z-10">Enter a prompt below to summon the fighters.</p>
                </div>
              ) : (
                messages.map(msg => <MessageUnit key={msg.id} message={msg} />)
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a22] border-t border-[#3a3a48] p-4 md:p-6 shadow-[0_-10px_40px_rgba(13,13,20,0.8)] z-20">
            <div className="max-w-[900px] mx-auto w-full">
              <div className="flex flex-col md:flex-row gap-4 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="ENTER YOUR PROMPT... THE ARENA AWAITS"
                  className="input-style flex-1 resize-none min-h-[60px] md:min-h-[52px] max-h-[160px] leading-relaxed pt-[15px]"
                  rows="1"
                ></textarea>
                <motion.button
                  whileHover={!inputValue.trim() ? {} : { scale: 1.15, rotate: 2 }}
                  whileTap={!inputValue.trim() ? {} : { scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`btn-clip bg-[#c8f525] text-[#0d0d14] font-bebas text-xl px-8 py-3 font-bold tracking-widest uppercase transition-colors duration-150 origin-bottom ${!inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#9fc01a]'}`}
                >
                  SEND TO ARENA →
                </motion.button>
              </div>
              <div className="text-center md:text-left mt-3 font-inter text-[11px] text-[#6a6a7a] uppercase tracking-widest font-bold">
                ENTER to send · SHIFT+ENTER for new line
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  return (
    <>
      {currentView === 'home' ? (
        <LandingPage onEnterArena={setCurrentView} />
      ) : (
        <ArenaPage onEnterArena={setCurrentView} />
      )}
    </>
  );
};

export default App;