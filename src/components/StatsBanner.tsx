import React from 'react';
import { Award, FileSearch, Users, Database } from 'lucide-react';

const StatsBanner = () => {
  const stats = [
    {
      icon: <FileSearch size={48} className="text-yellow-400" />,
      value: "85000",
      label: "Offres publiées"
    },
    {
      icon: <Award size={48} className="text-yellow-400" />,
      value: "32000",
      label: "Attributions"
    },
    {
      icon: <Users size={48} className="text-yellow-400" />,
      value: "12500",
      label: "Acheteurs publics"
    },
    {
      icon: <Database size={48} className="text-yellow-400" />,
      value: "15",
      label: "Sources de données"
    }
  ];

  return (<div className="w-full bg-gradient-to-br from-primary to-primary-dark relative py-16 mt-12 px-4 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-15 bg-cover bg-center"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <h2 className="text-white text-center text-4xl font-bold mb-12">NOS CHIFFRES CLÉS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center group">
            <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
              {stat.icon}
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-3 font-display">
              {stat.value}
            </div>
            <div className="text-lg text-white/90 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default StatsBanner;