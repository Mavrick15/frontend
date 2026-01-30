import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface ServicePageLayoutProps {
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  title: string;
  description: string;
  children: React.ReactNode;
  heroImage?: string;
  heroImageAlt?: string;
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({
  icon: Icon,
  iconColor = 'text-gray-900',
  iconBg = 'bg-gray-100',
  title,
  description,
  children,
  heroImage,
  heroImageAlt
}) => {
  return (
    <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center group text-gray-600 hover:text-gray-900 mb-8 transition-all duration-300 font-medium hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Retour à l'accueil
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center mb-6 space-x-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                className={`${iconBg} p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group/icon`}
              >
                <Icon className={`h-8 w-8 ${iconColor} group-hover/icon:scale-110 transition-transform duration-300`} />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 font-space leading-tight">
                {title}
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 max-w-4xl border border-gray-200/50"
          >
            {description}
          </motion.p>

          {heroImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full h-64 md:h-80 lg:h-96 mb-12 overflow-hidden rounded-2xl shadow-2xl relative group"
            >
              <img
                src={heroImage}
                alt={heroImageAlt || title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/1200x600/e2e8f0/64748b?text=${title}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              ></div>
            </motion.div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default ServicePageLayout;
