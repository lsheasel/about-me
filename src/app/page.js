'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaDiscord, FaEnvelope, FaReact, FaNodeJs, FaCode } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMysql, SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useInView } from 'react-intersection-observer';
import Terminal from '../components/Terminal/Terminal';
import ImpressSection from '../components/ImpressSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#60a5fa] origin-left z-50"
      style={{ scaleX: scrollProgress }}
    />
  );
};

export default function Home() {
  // Hooks in konsistenter Reihenfolge
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImpressVisible, setIsImpressVisible] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Scroll-Progress für Sektionen
  const skillsProgress = useScrollProgress(skillsRef);
  const projectsProgress = useScrollProgress(projectsRef);

  // Animation für inView
  useEffect(() => {
    if (inView) {
      ref.current?.classList.add('visible');
    }
  }, [inView, ref]);

  // Lade-Animation
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const scrollAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const skills = [
    { name: 'React', icon: FaReact, level: 90 },
    { name: 'JavaScript', icon: SiJavascript, level: 85 },
    { name: 'TypeScript', icon: SiTypescript, level: 80 },
    { name: 'Node.js', icon: FaNodeJs, level: 75 },
    { name: 'Next.js', icon: SiNextdotjs, level: 85 },
    { name: 'MongoDB', icon: SiMysql, level: 75 },
    { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90 },
  ];

  const projects = [
    {
      title: "Portfolio Website",
      going: "Ongoing",
      description: "Modern portfolio built with Next.js, featuring smooth animations, dynamic content loading, and responsive design.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/lsheasel/about-me",
      image: "/projects/portfolio.png",
    },
    {
      title: "Poker Game",
      going: "Finished",
      description: "Poker game application with real-time multiplayer functionality, built using React and Node.js.",
      tech: ["React", "Node.js", "Supabase", "Socket.io", "Tailwind CSS"],
      github: "https://github.com/lsheasel/poker-app",
      image: "/projects/poker-game.png",
    },
    {
      title: "CoralSMP",
      going: "Ongoing",
      description: "A german Minecraft server with a SMP like experience, featuring custom plugins and a vibrant community.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      github: "https://coralsmp.de",
      
      image: "/projects/coralsmp.png",
    },
  ];

  const friends = [
    {
      name: "Shynygamy",
      role: "Cybersecurity Enthusiast",
      image: "/friends/shynygamy.png",
      github: "https://github.com/shynygamy69",
      skills: ["Java", "Bash", "Cybersecurity"],
    },
    {
      name: "Danji",
      role: "Gamer",
      image: "/friends/danji.jpg",
      skills: ["Gaming", "Funny", "Windows"],
    },
  ];

  const scrollToSection = (sectionId) => {
    if (sectionId === 'impress') {
      setIsImpressVisible(true);
    } else {
      setIsImpressVisible(false);
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    }
  };

  const FriendsSection = () => {
    return (
      <section id="friends" className="py-20 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1120] via-transparent to-[#0a1120]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto px-4 relative w-full"
        >
          <motion.h2
            className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent"
          >
            Amazing Friends & Colleagues
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0 place-items-center">
            <div className="col-span-full lg:col-span-3 flex flex-wrap justify-center gap-6 w-full">
              {friends.map((friend, index) => (
                <motion.div
                  key={friend.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative group w-full max-w-sm ${
                    friends.length === 1 ? 'lg:max-w-md' :
                    friends.length === 2 ? 'sm:w-[calc(50%-12px)]' :
                    'sm:w-[calc(33.333%-16px)]'
                  }`}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#60a5fa]/20">
                        {friend.image ? (
                          <img
                            src={friend.image}
                            alt={friend.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center">
                            <span className="text-2xl text-white font-bold">
                              {friend.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold text-[#60a5fa]">{friend.name}</h3>
                        <p className="text-gray-400 text-sm">{friend.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                      {friend.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs rounded-full bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    );
  };

  if (isLoading) {
    return (
      <motion.div 
        className="h-screen flex items-center justify-center bg-[#0f172a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative">
          <motion.div
            className="flex items-center gap-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-[#60a5fa]"
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
                borderRadius: ["50%", "25%", "50%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.span
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#60a5fa] to-[#3b82f6]"
              animate={{
                backgroundPosition: ["0%", "100%"],
                opacity: [0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Shease
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1120] text-white">
      <ScrollProgress />
      <nav className="fixed w-full bg-gradient-to-b from-[#0a1120] to-[#0f172a]/95 backdrop-blur-lg z-50 border-b border-[#60a5fa]/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div className="text-2xl font-bold text-[#60a5fa]">
              Shease
            </motion.div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-[#60a5fa] transition-colors"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-around"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  className="w-full h-0.5 bg-current transition-all"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-full h-0.5 bg-current transition-all"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  className="w-full h-0.5 bg-current transition-all"
                />
              </motion.div>
            </button>
            <motion.div className="hidden md:flex items-center gap-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Projects', id: 'projects' },
                { name: 'Terminal', id: 'terminal' },
                { name: 'Friends', id: 'friends' },
                { name: 'Contact', id: 'contact' },
              ].map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ 
                    color: '#60a5fa',
                    scale: 1.1,
                    textShadow: '0 0 8px #60a5fa'
                  }}
                  className="text-gray-300 hover:text-[#60a5fa] transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4"
              >
                <div className="flex flex-col gap-4">
                  {[
                    { name: 'Home', id: 'home' },
                    { name: 'Projects', id: 'projects' },
                    { name: 'Terminal', id: 'terminal' },
                    { name: 'Friends', id: 'friends' },
                    { name: 'Contact', id: 'contact' },
                  ].map((item) => (
                    <motion.button
                      key={item.name}
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMenuOpen(false);
                      }}
                      whileHover={{ color: '#60a5fa' }}
                      className="text-gray-300 hover:text-[#60a5fa] transition-colors py-2 text-center"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center">
          <div className="max-w-2xl mx-auto w-full flex flex-col items-center text-center">
            <motion.h1
  initial={{ opacity: 0, scale: 1 }} // Skalierung entfernt
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent select-none relative" // Gradienten vereinfacht
  style={{
    letterSpacing: '1px', // Reduziertes Letter Spacing
    backfaceVisibility: 'hidden', // Rendering verbessern
    transform: 'translateZ(0)',
    // textShadow entfernt
  }}
>
  <span className="relative inline-block select-none" data-text="Shease">
    I'm Shease
  </span>
</motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold mb-8 text-[#60a5fa]"
            >
              I build things for the web and other Stuff
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-gray-300 max-w-xl mb-10 leading-relaxed"
            >
              I'm passionate about creating modern web applications and constantly exploring new technologies. As a programming student, I focus on software development with a special interest in Linux and open-source technologies. I love turning complex problems into elegant solutions through code.
            </motion.p>
            <motion.button
              whileHover={{
                scale: 1.07,
                background: "linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)",
                boxShadow: "0 0 20px #60a5fa55"
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 rounded-lg transition-all font-mono font-semibold bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white shadow shadow-[#60a5fa]/20 border-0"
            >
              See My Projects
            </motion.button>
          </div>
        </section>

        <section id="projects" ref={projectsRef} className="py-16">
          <motion.div
            className="max-w-6xl mx-auto px-4"
            style={{
              transform: `scale(${0.95 + (projectsProgress * 0.05)}) translateY(${30 - (projectsProgress * 30)}px)`,
              opacity: projectsProgress,
              transition: 'all 0.5s cubic-bezier(0.4,0.08,0.23,0.96)'
            }}
          >
            <motion.h2
              className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent"
              style={{
                letterSpacing: `${projectsProgress * 2}px`,
                filter: `blur(${(1 - projectsProgress) * 2}px)`,
                transition: 'all 0.5s cubic-bezier(0.4,0.08,0.23,0.96)'
              }}
            >
              <span className="text-[#60a5fa]">My</span> Projects
            </motion.h2>
            <div className="flex flex-row gap-6 justify-center w-full">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  style={{
                    opacity: Math.max(0, projectsProgress * 2 - (index * 0.2)),
                    transform: `scale(${0.97 + (projectsProgress * 0.03)}) translateY(${20 - (projectsProgress * 20)}px)`,
                    boxShadow: projectsProgress > 0.9
                      ? '0 0 24px 0 #60a5fa66'
                      : '0 1px 4px 0 rgba(96,165,250,0.08)',
                    transition: 'all 0.5s cubic-bezier(0.4,0.08,0.23,0.96)'
                  }}
                  className="relative group w-full max-w-[360px] bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#60a5fa]/10 transition-all"
                >
                  {/* Project Image or Placeholder */}
                  <div className="relative h-48 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center">
                        <FaCode className="text-2xl text-white/50" />
                      </div>
                    )}
                    <div className=''>
                      <span className="absolute top-2 right-2 bg-[#60a5fa]/10 text-[#60a5fa] px-2 py-1 text-xs rounded-full border border-[#60a5fa]/20 backdrop-blur-sm">
                        {project.going === "Ongoing" ? (
                          <span className="text-green-400">Ongoing</span>
                        ) : (
                          <span className="text-red-400">Finished</span>
                        )}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent opacity-60" />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-[#60a5fa]">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#60a5fa] transition-all duration-300 hover:scale-110"
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> 
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-[#60a5fa] transition-all duration-300 hover:scale-110"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 10 4.84c.85 0 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.67.94.67 1.89v2.8c0 .26.18.57.69.48A10 10 0 0 0 10 0z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="terminal" ref={ref} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1120] via-transparent to-[#0a1120]" />
          <div className="max-w-4xl mx-auto px-4 relative">
            <Terminal />
          </div>
        </section>

        <FriendsSection />

        <section id="contact" className="py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scrollAnimation}
            className="max-w-6xl mx-auto px-4"
          >
            <motion.h2 
              variants={scrollAnimation}
              className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent"
            >
              Let's Connect
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.a
                href="mailto:contact@shease.de"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl hover:shadow-lg hover:shadow-[#60a5fa]/10 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                variants={scrollAnimation}
              >
                <div className="p-4 bg-[#60a5fa]/10 rounded-full mb-4 group-hover:bg-[#60a5fa]/20 transition-colors">
                  <FaEnvelope className="text-3xl text-[#60a5fa]" />
                </div>
                <h3 className="text-xl font-bold text-[#60a5fa] mb-2">Email</h3>
                <p className="text-gray-400 text-center">contact@shease.de</p>
              </motion.a>
              <motion.a
                href="https://github.com/lsheasel"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl hover:shadow-lg hover:shadow-[#60a5fa]/10 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                variants={scrollAnimation}
              >
                <div className="p-4 bg-[#60a5fa]/10 rounded-full mb-4 group-hover:bg-[#60a5fa]/20 transition-colors">
                  <FaGithub className="text-3xl text-[#60a5fa]" />
                </div>
                <h3 className="text-xl font-bold text-[#60a5fa] mb-2">GitHub</h3>
                <p className="text-gray-400 text-center">@lsheasel</p>
              </motion.a>
              <motion.a
                href="https://discord.com/users/shease."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl hover:shadow-lg hover:shadow-[#60a5fa]/10 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                variants={scrollAnimation}
              >
                <div className="p-4 bg-[#60a5fa]/10 rounded-full mb-4 group-hover:bg-[#60a5fa]/20 transition-colors">
                  <FaDiscord className="text-3xl text-[#60a5fa]" />
                </div>
                <h3 className="text-xl font-bold text-[#60a5fa] mb-2">Discord</h3>
                <p className="text-gray-400 text-center">shease.</p>
              </motion.a>
            </div>
            <motion.p
              variants={scrollAnimation}
              className="text-center text-gray-400 mt-12 max-w-2xl mx-auto"
            >
              Feel free to reach out through any of these platforms. I'm always interested in hearing about new projects and opportunities!
            </motion.p>
          </motion.div>
        </section>

        <AnimatePresence>
          {isImpressVisible && <ImpressSection onClose={() => setIsImpressVisible(false)} />}
        </AnimatePresence>
      </main>

      <footer className="bg-gradient-to-b from-[#0f172a] to-[#181c1f] py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              Shease
              <p className="text-gray-400">Building modern web experiences</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Links</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Home', id: 'home' },
                  { name: 'Projects', id: 'projects' },
                  { name: 'Terminal', id: 'terminal' },
                  { name: 'Friends', id: 'friends' },
                  { name: 'Contact', id: 'contact' },
                  { name: 'Impress', id: 'impress' },
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-[#60a5fa] transition-colors"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <a 
                href="mailto:contact@shease.de"
                className="text-gray-400 hover:text-[#60a5fa] transition-colors"
              >
                contact@shease.de
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} Shease. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function SkillIcon({ icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.13, 
        filter: "drop-shadow(0 0 10px #60a5fa)"
      }}
      animate={{
        scale: 1,
        filter: 'drop-shadow(0 0 8px #60a5fa33)'
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl flex items-center justify-center p-8 shadow-lg shadow-[#60a5fa]/10"
    >
      <Icon className="text-5xl md:text-6xl" style={{ color: color || "#60a5fa" }} />
    </motion.div>
  );
}