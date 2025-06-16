import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const controls = useAnimation();

  const formatOutput = (text, type = 'default') => {
    switch (type) {
      case 'title':
        return `${text}`;
      case 'section':
        return `${text}`;
      case 'success':
        return `${text}`;
      case 'error':
        return `${text}`;
      default:
        return text;
    }
  };

  const commands = {
    help: () => ({
      output: formatOutput('Available Commands:', 'title') + `

${formatOutput('Info Commands:', 'section')}
  about         - About me
  skills        - My technical skills
  contact       - Contact information
  social        - Social media links

${formatOutput('Fun Stuff:', 'section')}
  ascii         - Show my ASCII art logo
  matrix        - Start Matrix animation
  joke          - Tell a programming joke
  clear         - Clear terminal`
    }),
    
    about: () => ({
      output: formatOutput(`
┌─────────────────────────────────┐
│             Shease              │
├─────────────────────────────────┤
│  Hobby Web Developer            │
│  Based in Germany               │
│  Passionate about Linux & Web   │
│  Love creating cool stuff       │
└─────────────────────────────────┘`, 'success')
    }),

    skills: () => ({
      output: formatOutput(`
🚀 Main Skills:
   ├── Frontend: React, Next.js, TailwindCSS
   ├── Backend: Node.js, Express
   ├── Database: MySQL
   └── Tools: Git, Linux, VS Code`, 'success')
    }),

    contact: () => ({
      output: formatOutput(`
📧 Get in touch:
   ├── Email: contact@shease.de
   ├── Discord: https://discord.com/users/shease.
   └── GitHub: github.com/lsheasel`, 'success')
    }),

    social: () => ({
      output: `🌐 Find me around the web:
• GitHub: github.com/lsheasel
• Discord: discord.com/users/shease.
• Email: contact@shease.de`
    }),

    ascii: () => ({
      output: formatOutput(`
   _____  _                          
  / ____|| |                         
 | (___  | |__    ___   __ _  ___  ___ 
  \\___ \\ | '_ \\  / _ \\ / _\` |/ __|/ _ \\
  ____) || | | ||  __/| (_| |\\__ \\  __/
 |_____/ |_| |_| \\___| \\__,_||___/\\___|
                                        
`, 'success')
    }),

    matrix: () => {
      const interval = setInterval(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        const randomChar = () => chars[Math.floor(Math.random() * chars.length)];
        setHistory(prev => [...prev, { 
          type: 'output', 
          content: Array(40).fill(0).map(randomChar).join(' '),
          style: 'text-green-500 opacity-75'
        }]);
      }, 100);

      setTimeout(() => clearInterval(interval), 5000);
      return { output: 'Starting Matrix... (Will stop after 5 seconds)' };
    },

    joke: () => {
      const jokes = [
        "Why do Linux users prefer dark mode? Because light attracts bugs! 🐛",
        "What's a web developer's favorite snack? Cookies! 🍪",
        "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25! 🎃",
        "How do you comfort a JavaScript bug? You console it! 🤗"
      ];
      return {
        output: jokes[Math.floor(Math.random() * jokes.length)]
      };
    },

    clear: () => {
      setHistory([]);
      return { output: '' };
    }
  };

  const handleCommand = (cmd) => {
    const [command, ...args] = cmd.trim().toLowerCase().split(' ');
    const commandFn = commands[command];
    
    if (commandFn) {
      const result = commandFn(args);
      setHistory(prev => [...prev, 
        { type: 'command', content: cmd }, 
        { type: 'output', content: result.output }
      ]);
    } else if (command) {
      setHistory(prev => [...prev, 
        { type: 'command', content: cmd },
        { type: 'error', content: `Command not found: ${command}. Type 'help' for available commands.` }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  // Behalte nur den scroll-to-bottom Effect für die Terminal-Historie
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <motion.div
      className="bg-[#0f172a] rounded-lg border border-[#60a5fa]/20 overflow-hidden shadow-xl shadow-[#60a5fa]/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-gray-400 text-sm ml-2">terminal</span>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 font-mono text-sm h-96 overflow-auto whitespace-pre-wrap"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-[#60a5fa] mb-4">
          Welcome! Type 'help' to see available commands.
        </div>

        {history.map((entry, i) => (
          <div 
            key={i} 
            className={`mb-2 ${
              entry.type === 'error' ? 'text-red-400' : 
              entry.type === 'command' ? 'text-[#60a5fa]' : 
              entry.style || 'text-gray-300'
            }`}
          >
            {entry.type === 'command' && <span className="text-green-400">➜ </span>}
            {entry.content}
          </div>
        ))}

        <div className="flex items-center">
          <span className="text-green-400">➜ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[#60a5fa] ml-2"
            spellCheck="false"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;