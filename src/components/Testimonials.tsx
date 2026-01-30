import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ENDPOINTS } from '@/config/api.config';
import { getNetworkErrorMessage, parseApiResponse } from '@/utils/apiMessages';
import { Quote, Star } from 'lucide-react';
import type { Testimonial, TestimonialsResponse } from '@/types/api';

const TEXT_CONSTANTS = {
  TITLE: "Ce que disent nos clients",
  SUBTITLE: "Découvrez les témoignages de nos clients satisfaits",
  LOADING: "Chargement des témoignages...",
  ERROR: "Erreur lors du chargement des témoignages",
  NO_TESTIMONIALS: "Aucun témoignage disponible",
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${ENDPOINTS.TESTIMONIALS.LIST}?featured=true&limit=6`);
      const { ok, data, errorMessage } = await parseApiResponse(response);

      if (!ok) {
        setError(errorMessage || TEXT_CONSTANTS.ERROR);
        return;
      }

      const res = data as TestimonialsResponse;
      setTestimonials(res.testimonials || []);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : getNetworkErrorMessage());
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'text-gray-900 fill-gray-900'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">{TEXT_CONSTANTS.LOADING}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return null; // Ne rien afficher si erreur ou pas de témoignages
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            >
              {TEXT_CONSTANTS.TITLE}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              {TEXT_CONSTANTS.SUBTITLE}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial._id}
                variants={itemVariants}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 hover:-translate-y-2"
              >
                <div className="flex items-start mb-4">
                  <Quote className="w-8 h-8 text-gray-400 mr-2 flex-shrink-0" />
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 italic line-clamp-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  {testimonial.clientAvatar ? (
                    <img
                      src={testimonial.clientAvatar}
                      alt={testimonial.clientName}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200 shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                      {testimonial.clientName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.clientName}</p>
                    {testimonial.clientRole && (
                      <p className="text-sm text-gray-600 font-medium">{testimonial.clientRole}</p>
                    )}
                    {testimonial.clientCompany && (
                      <p className="text-sm text-gray-500">{testimonial.clientCompany}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
