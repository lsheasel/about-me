import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import Image from 'next/image';

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="relative group"
    >
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#2563eb] rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
      
      {/* Card content */}
      <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden">
        {/* Project image */}
        <div className="relative h-48 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#4f46e5] to-[#2563eb] flex items-center justify-center">
              <FaCode className="text-4xl text-white/50" />
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
        </div>

        <div className="p-6">
          {/* Project title and links */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#4f46e5] to-[#2563eb] bg-clip-text text-transparent">
              {project.title}
            </h3>
            <div className="flex gap-4">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#4f46e5] transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub size={20} />
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#2563eb] transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt size={20} />
                </motion.a>
              )}
            </div>
          </div>

          {/* Project description */}
          <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium rounded-full 
                         bg-gradient-to-r from-[#4f46e5]/10 to-[#2563eb]/10 
                         text-[#4f46e5] border border-[#4f46e5]/20
                         hover:border-[#4f46e5]/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Additional details */}
          {project.date && (
            <div className="mt-4 pt-4 border-t border-gray-800 text-sm text-gray-500">
              {project.date}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}