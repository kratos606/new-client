
import React from 'react';
import { motion } from 'framer-motion';
import { DataSource } from '../types/procurement';

interface DataSourcesCarouselProps {
  sources: DataSource[];
}

const DataSourceCarousel: React.FC<DataSourcesCarouselProps> = ({ sources }) => {
  if (!sources.length) return null;

  // Duplicate sources to create a seamless infinite effect
  const duplicatedSources = [...sources, ...sources];
  
  return (
    <div className="w-full my-8 overflow-hidden">
      <h3 className="text-xl font-medium mb-4 text-center">Sources de données</h3>
      <div className="relative">
        <div className="flex py-3 overflow-hidden">
          <motion.div
            className="flex space-x-6 min-w-max"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedSources.map((source, index) => (
              <div
                key={`${source.id}-${index}`}
                className="flex-shrink-0 w-48 h-16 bg-card border border-border rounded-lg shadow-sm flex items-center justify-center overflow-hidden"
              >
                {source.image ? (
                  <img
                    src={source.image}
                    alt={source.title}
                    className="h-10 object-contain"
                  />
                ) : (
                  <h4 className="text-lg font-semibold text-center">{source.title}</h4>
                )}
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default DataSourceCarousel;
