import { useState, useRef, useEffect, TouchEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from "@/hooks/use-mobile";
import React from 'react';
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import { ScrollArea } from "@/components/ui/scroll-area";
import BlogPostCard from "@/components/BlogPostCard";

const projects = [
  {
    id: 1,
    title: "Transformation critique de l'infrastructure IT de la Police Judiciaire",
    brand: "Police Judiciaire",
    description: "De l'obsolescence à l'excellence - Performance réseau x10, sécurité militaire et disponibilité 99.9% pour les missions critiques.",
    tags: ["Réseau", "Sécurité IT", "Infrastructure", "Kinshasa"],
    imageUrl: "/lovable-uploads/img/police.png",
    isFeatured: true,
    link: "/projects/realisations/police-judiciaire",
  },
  {
    id: 2,
    title: "Sécurisation intelligente du Centre Diagnostic EYANO",
    brand: "Centre de diagnostic EYANO",
    description: "Infrastructure HIKVISION de grade professionnel - Couverture 70m² sans angle mort et surveillance IA 24/7.",
    tags: ["Vidéosurveillance", "Sécurité", "Hikvision", "Santé"],
    imageUrl: "/lovable-uploads/img/Eyano.png",
    link: "/projects/realisations/eyano-security"
  },
  {
    id: 3,
    title: "Système de vidéosurveillance intelligent pour Credit Shop Africa",
    brand: "Credit Shop Africa",
    description: "Déploiement CP+ haute performance avec couverture 360°, zéro angle mort et monitoring temps réel centralisé.",
    tags: ["Vidéosurveillance", "Sécurité", "CP+", "Finance"],
    imageUrl: "/lovable-uploads/img/credit-shop-africa.png",
    link: "/projects/realisations/credit-shop-africa"
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const projectsRef = useRef(null);
  const carouselRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const isMobile = useIsMobile();

  const minSwipeDistance = 50;

  useEffect(() => {
    if (isInView && !isHovering) {
      const interval = setInterval(() => {
        setActiveProject(prev => (prev + 1) % projects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, projects.length]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    }, {
      threshold: 0.2
    });
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setActiveProject(prev => (prev + 1) % projects.length);
    } else if (isRightSwipe) {
      setActiveProject(prev => (prev - 1 + projects.length) % projects.length);
    }
  };

  const getCardAnimationClass = (index) => {
    if (index === activeProject) return "scale-100 opacity-100 z-20";
    if (index === (activeProject + 1) % projects.length) return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (index === (activeProject - 1 + projects.length) % projects.length) return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "scale-90 opacity-0";
  };
  
  return (
    <section id="projects" ref={projectsRef} className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-[50px] w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`text-center mb-10 max-w-3xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4 px-5 py-2 bg-white/80 backdrop-blur-sm text-gray-900 rounded-full text-sm font-bold border border-gray-200/50 shadow-md">
            Nos réalisations
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Ce que nous avons accompli
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Découvrez comment nos solutions informatiques ont transformé les infrastructures et les opérations de nos clients, en apportant performance, sécurité et innovation.
          </p>
          {isMobile && (
            <div className="flex items-center justify-center mt-4 animate-pulse-slow">
              <div className="flex items-center text-gray-700">
                <ChevronLeft size={16} />
                <p className="text-sm mx-1">Balayez pour naviguer</p>
                <ChevronRight size={16} />
              </div>
            </div>
          )}
        </div>
        
        <div 
          className="relative h-[550px] overflow-hidden" 
          onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(index)}`} 
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Card className="overflow-hidden h-[500px] border border-gray-200/50 shadow-xl hover:shadow-2xl flex flex-col bg-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 group">
                  <div 
                    className="relative bg-gray-900 p-6 flex items-center justify-center h-48 overflow-hidden group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${project.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'grayscale(100%)'
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.style.backgroundImage = `url('https://placehold.co/400x192/4a4a4a/f5f5f5?text=Image+de+projet')`;
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30"></div>
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{project.brand.toUpperCase()}</h3>
                      <div className="w-12 h-1 bg-white mb-2"></div>
                      <p className="text-white/90 text-sm font-medium">{project.title}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex flex-col flex-grow bg-white/90 backdrop-blur-sm">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1 text-gray-900 group-hover:text-gray-700 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-semibold">{project.brand}</p>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 flex-grow leading-relaxed">{project.description}</p>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200/50" 
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link 
                        to={project.link} 
                        className="text-gray-900 font-semibold flex items-center hover:text-gray-700 relative overflow-hidden group/link"
                        onClick={() => {
                          if (project.link.startsWith('/')) {
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        <span className="relative z-10">Découvrir davantage</span>
                        <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover/link:translate-x-1" />
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover/link:w-full"></span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {projects.length > 1 && !isMobile && (
            <>
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white z-30 shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200/50" 
                onClick={() => setActiveProject(prev => (prev - 1 + projects.length) % projects.length)}
                aria-label="Projet précédent"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 hover:bg-white z-30 shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200/50" 
                onClick={() => setActiveProject(prev => (prev + 1) % projects.length)}
                aria-label="Projet suivant"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          {projects.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
              {projects.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-300 ${activeProject === idx ? 'bg-gray-900 w-8 shadow-lg' : 'bg-gray-400 hover:bg-gray-600 w-2'}`} 
                  onClick={() => setActiveProject(idx)}
                  aria-label={`Aller au projet ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
