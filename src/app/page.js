'use client';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaDiscord, FaEnvelope, FaReact, FaNodeJs, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMysql, SiTailwindcss, SiNextdotjs, SiFedora } from 'react-icons/si';
import ProjectCard from '../components/ProjectCard';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useInView } from 'react-intersection-observer';
import Terminal from '../components/Terminal/Terminal';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;

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
  // Füge refs für die Sektionen hinzu
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);

  // Get scroll progress for each section
  const skillsProgress = useScrollProgress(skillsRef);
  const projectsProgress = useScrollProgress(projectsRef);

  const [isLoading, setIsLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState(0);

  // Add this near your other refs and state
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const controls = useAnimation();

  // Add this effect
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // Loading Animation
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

  const skills = [
    { name: 'React', icon: FaReact, level: 90 },
    { name: 'JavaScript', icon: SiJavascript, level: 85 },
    { name: 'TypeScript', icon: SiJavascript, level: 80 },
    { name: 'Node.js', icon: FaNodeJs, level: 75 },
    { name: 'Next.js', icon: SiNextdotjs, level: 85 },
    { name: 'MongoDB', icon: SiMysql, level: 75 },
    { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90 },
  ];

  const projects = [
    {
      title: "Portfolio Website",
      description: "Modern portfolio built with Next.js, featuring smooth animations, dynamic content loading, and responsive design.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://shease.de",
      image: "/projects/portfolio.png"
    },
    {
      title: "Poker Game",
      description: "Poker game application with real-time multiplayer functionality, built using React and Node.js.",
      tech: ["React", "Node.js", "Supabase", "Socket.io", "Tailwind CSS"],
      github: "https://github.com/lsheasel/poker-app",
      image: "/projects/poker-game.png"
    },
    
  ];

  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInScale = {
    initial: { 
      scale: 0.8, 
      opacity: 0 
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const projectCardVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const titleAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.08, 0.23, 0.96],
        delay: index * 0.2
      }
    })
  };

  const scrollAnimation = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scrollScaleAnimation = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const friends = [
    {
      name: "Shynygamy",
      role: "Cybersecurity Enthusiast",
      image: "/friends/shynygamy.png", // Add friend images to public/friends/
      github: "https://github.com/shynygamy69",
      skills: ["Java", "Bash", "Cybersecurity"],
    },
    {
      name: "Danji",
      role: "Gamer",
      image: "/friends/danji.jpg",
      skills: ["Gaming", "Funny", "Windows"]
    },
    // Add more friends here
  ];

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

          {/* Updated grid container with center justification */}
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Subtract header height
        behavior: 'smooth'
      });
    }
  };

  const commands = [
    { text: '> exploring new technologies...', delay: 0 },
    { text: '> loading passion for coding...', delay: 1 },
    { text: '> initializing creativity...', delay: 2 },
    { text: '> ready to build something amazing!', delay: 3 }
  ];

  return (
    <div className="min-h-screen bg-[#0a1120] text-white"> {/* Noch dunkler */}
      <ScrollProgress />
      {/* Updated Navbar */}
      <nav className="fixed w-full bg-gradient-to-b from-[#0a1120] to-[#0f172a]/95 backdrop-blur-lg z-50 border-b border-[#60a5fa]/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <motion.div className="flex flex-col sm:flex-row justify-between items-center">
            <motion.div className="text-2xl font-bold text-[#60a5fa] mb-4 sm:mb-0">
              Shease
            </motion.div>
            <motion.div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Projects', id: 'projects' },
                { name: 'Terminal', id: 'terminal' },
                { name: 'Friends', id: 'friends' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ 
                    color: '#60a5fa',
                    scale: 1.1,
                    textShadow: '0 0 8px #60a5fa'
                  }}
                  className="relative text-gray-300 hover:text-[#60a5fa] transition-colors px-2 py-1"
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-20">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Linke Seite: Text */}
            <div>
              <motion.p 
                custom={0}
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                className="inline-block bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-[#60a5fa] px-3 py-1 rounded mb-6 text-sm font-mono font-semibold tracking-wide shadow shadow-[#60a5fa]/10"
              >
                Hobby Developer & Linux Enthusiast
              </motion.p>
              <motion.h1 
                custom={1}
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#60a5fa] via-[#3b82f6] to-[#1e293b] bg-clip-text text-transparent"
              >
                I'm Shease
              </motion.h1>
              <motion.h2
                custom={2}
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent"
              >
                I build things for the web and other Stuff
              </motion.h2>
              <motion.p 
                custom={3}
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                className="text-gray-300 max-w-2xl mb-8 leading-relaxed"
              >
                I'm passionate about creating modern web applications and constantly exploring new technologies. 
                As a programming student, I focus on software development with a special interest in Linux 
                and open-source technologies. I love turning complex problems into elegant solutions through code.
              </motion.p>
              <motion.button
                custom={4}
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)",
                  boxShadow: "0 0 20px #60a5fa55"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 rounded-lg transition-all font-mono font-semibold bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-white shadow shadow-[#60a5fa]/20 border-0"
              >
                Contact Me
              </motion.button>
            </div>
            {/* Rechte Seite: Skills-Icons */}
            <div className="flex justify-center items-center">
              <div className="relative">
                {/* Glow-Effekt - kleiner, dezenter */}
                <div className="absolute -inset-4 rounded-3xl opacity-10 blur-xl z-0" />
                <div className="relative z-10 flex flex-col gap-6 bg-transparent">
                  {/* Obere Reihe: 2 Icons zentriert */}
                  <div className="flex justify-center gap-6">
                    <SkillIcon icon={skills[0].icon} color="#60a5fa" />
                    <SkillIcon icon={skills[1].icon} color="#60a5fa" />
                  </div>
                  {/* Mittlere Reihe: 3 Icons, Fedora in der Mitte */}
                  <div className="flex justify-center gap-6">
                    <SkillIcon icon={skills[2].icon} color="#60a5fa" />
                    <SkillIcon icon={SiFedora} color="#51A2DA" />
                    <SkillIcon icon={skills[3].icon} color="#60a5fa" />
                  </div>
                  {/* Untere Reihe: 2 Icons zentriert */}
                  <div className="flex justify-center gap-6">
                    <SkillIcon icon={skills[4].icon} color="#60a5fa" />
                    <SkillIcon icon={skills[5].icon} color="#60a5fa" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-16">
          <motion.div
            className="max-w-6xl mx-auto px-4"
            style={{
              transform: `
                scale(${0.95 + (projectsProgress * 0.05)})
                translateY(${30 - (projectsProgress * 30)}px)
              `,
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
              <div className="col-span-full lg:col-span-3 flex flex-wrap justify-center gap-6 w-full">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    style={{
                      opacity: Math.max(0, projectsProgress * 2 - (index * 0.2)),
                      transform: `
                        scale(${0.97 + (projectsProgress * 0.03)})
                        translateY(${20 - (projectsProgress * 20)}px)
                      `,
                      boxShadow: projectsProgress > 0.9
                        ? '0 0 24px 0 #60a5fa66'
                        : '0 1px 4px 0 rgba(96,165,250,0.08)',
                      transition: 'all 0.5s cubic-bezier(0.4,0.08,0.23,0.96)'
                    }}
                    className={`relative group w-full max-w-sm ${
                      projects.length === 1 ? 'lg:max-w-md' : 
                      projects.length === 2 ? 'sm:w-[calc(50%-12px)]' : 
                      'sm:w-[calc(33.333%-16px)]'
                    } bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#60a5fa]/10 transition-all`}
                  >
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
                          <FaGithub size={20} />
                        </a>
                        
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Terminal Experience */}
        <section id="terminal" ref={ref} className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1120] via-transparent to-[#0a1120]" />
          <div className="max-w-4xl mx-auto px-4 relative">
            <Terminal />
          </div>
        </section>

        {/* Friends Section */}
        <FriendsSection />

        {/* Contact Section */}
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
                href="https://discord.com/users/shease." // Ersetze mit deiner Discord ID
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
      </main>

      {/* Footer auch dunkler */}
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
                  { name: 'Contact', id: 'contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={`#${item.id}`}
                      className="text-gray-400 hover:text-[#60a5fa] transition-colors"
                    >
                      {item.name}
                    </a>
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

// Hilfs-Komponente für einheitliche Animation und Style
function SkillIcon({ icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.13, 
        filter: "drop-shadow(0 0 10px #60a5fa)" // Blauer Glow statt grün
      }}
      animate={{
        scale: 1,
        filter: 'drop-shadow(0 0 8px #60a5fa33)' // Blauer Glow statt grün
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl flex items-center justify-center p-8 shadow-lg shadow-[#60a5fa]/10"
    >
      <Icon className="text-5xl md:text-6xl" style={{ color: color || "#60a5fa" }} />
    </motion.div>
  );
}
