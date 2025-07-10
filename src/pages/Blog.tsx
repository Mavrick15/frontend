import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { blogPosts } from '@/data/blogPosts'; // Corrected import path and syntax
import BlogPostCard from '@/components/BlogPostCard'; // Assuming this component is available
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";


// Constants for the Blog component
const TEXT_CONSTANTS = {
  LOADING_PROGRESS_INTERVAL_MS: 200,
  INITIAL_LOADING_PROGRESS_STEP: 5,
  MAX_LOADING_PROGRESS: 95,
  POSTS_PER_PAGE: 6,
  FEATURED_POST_ID: '4', // ID du post à la une

  HEADER_TITLE: "Actualités & informations",
  HEADER_DESCRIPTION: "Explorez les dernières actualités et les innovations proposées par Zetoun Labs, votre référence en services IT et formation.",
  FEATURED_BADGE: "À la une",
  FEATURED_POST_DATE_PREFIX: "Publié le:",
  READ_MORE_BUTTON: "Continuer la lecture",
  PAGINATION_PREVIOUS: "Précédent",
  PAGINATION_NEXT: "Suivant",
  LOADING_FALLBACK_TEXT: "Chargement...",
  SEO_TITLE: "Les dernières actualités technologiques - Zetoun Labs",
  SEO_DESCRIPTION: "Explorez les dernières actualités et les innovations proposées par Zetoun Labs, votre référence en services IT et formation.",
  LOADING_SPINNER_ALT: "Animation de chargement",
  FEATURED_IMAGE_ALT: "[Image de l'article à la une]",
};

const SEO_KEYWORDS = [
  'support tech', 'assistance info', 'ingénierie réseau', 'conception réseau', 'installation réseau', 'vidéosurveillance', 'sécurité vidéo', 'conception web',
  'création site', 'infogérance IT', 'maintenance IT', 'supervision système', 'installation solaire', 'système solaire', 'formation Linux', 'admin Linux', 'serveurs Linux',
  'formation Windows', 'admin Windows', 'formation réseau', 'Cisco routage', 'Cisco switching', 'maintenance PC', 'dépannage info', 'formation virtualisation', 'VMware formation', 'ITIL formation',
  'cybersécurité formation', 'startup tech', 'innovation numérique', 'solutions IT', 'expert IT', 'consulting IT', 'Zetoun Labs'
];

const Blog = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Effect for loading progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress < TEXT_CONSTANTS.MAX_LOADING_PROGRESS) {
          return prevProgress + TEXT_CONSTANTS.INITIAL_LOADING_PROGRESS_STEP;
        }
        return prevProgress;
      });
    }, TEXT_CONSTANTS.LOADING_PROGRESS_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  // Find the featured post and filter other posts
  const featuredPost = blogPosts.find(post => post.id === TEXT_CONSTANTS.FEATURED_POST_ID) || blogPosts[0];
  const allOtherPosts = blogPosts.filter(post => post.id !== featuredPost?.id);

  // Calculate pagination details
  const indexOfLastPost = currentPage * TEXT_CONSTANTS.POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - TEXT_CONSTANTS.POSTS_PER_PAGE;
  const currentPosts = allOtherPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(allOtherPosts.length / TEXT_CONSTANTS.POSTS_PER_PAGE);

  // Function to change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Framer Motion variants for animations
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-gray-800 border-b-gray-800 border-l-gray-400 border-r-gray-400 dark:border-t-white dark:border-b-white dark:border-l-gray-400 dark:border-r-gray-400 animate-spin"></div>
          <div
            className="absolute inset-2 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center"
            style={{
              clipPath: `inset(${100 - loadingProgress}% 0 0 0)`,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              transition: 'clip-path 0.2s ease-out'
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-900 dark:text-white text-2xl font-bold">
            {loadingProgress}%
          </div>
        </div>
      </div>
    }>
      <PageLayout>
        <SEO
          title={TEXT_CONSTANTS.SEO_TITLE}
          description={TEXT_CONSTANTS.SEO_DESCRIPTION}
          imageUrl={featuredPost?.imageUrl}
          keywords={SEO_KEYWORDS}
          type="website"
        />

        {/* Header section with animated title and description */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="w-full pt-24 pb-12 bg-gradient-to-b from-black to-gray-900 text-white rounded-b-3xl shadow-xl"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                variants={textVariants}
                className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
              >
                {TEXT_CONSTANTS.HEADER_TITLE}
              </motion.h1>
              <motion.p
                variants={textVariants}
                className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto"
              >
                {TEXT_CONSTANTS.HEADER_DESCRIPTION}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Main content section with featured post and other posts */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="container mx-auto px-4 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPost && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="col-span-1 md:col-span-2 lg:col-span-3"
              >
                <Link to={`/blog/${featuredPost.slug}`} className="h-full block">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="grid md:grid-cols-2 h-full">
                      <div
                        className="bg-cover bg-center h-64 md:h-full p-8 flex items-center justify-center rounded-l-xl relative"
                        style={{
                          backgroundImage: `url('${featuredPost.imageUrl}')`,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                      >
                        {/* Image fallback with alt text */}
                        <img
                          src={featuredPost.imageUrl}
                          alt={TEXT_CONSTANTS.FEATURED_IMAGE_ALT}
                          className="absolute inset-0 w-full h-full object-cover opacity-0" // Hidden by default, shown on error
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://placehold.co/600x400/000000/FFFFFF?text=${featuredPost.title.split(' ').map(n => n[0]).join('')}`;
                            e.currentTarget.classList.remove('opacity-0');
                          }}
                        />
                        <div className="text-white text-center bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                          <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium inline-block mb-4">{TEXT_CONSTANTS.FEATURED_BADGE}</span>
                          <h3 className="text-2xl md:text-3xl font-bold">{featuredPost.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-8">
                        <div>
                          <p className="text-gray-500 text-sm mb-2">{TEXT_CONSTANTS.FEATURED_POST_DATE_PREFIX} {featuredPost.date}</p>
                          <p className="text-gray-700 mb-6">
                            {featuredPost.excerpt}
                          </p>
                        </div>
                        <Button variant="outline" className="group">
                          {TEXT_CONSTANTS.READ_MORE_BUTTON}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )}

            {/* Render other blog posts using BlogPostCard component */}
            {currentPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <BlogPostCard
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.imageUrl}
                  date={post.date}
                  slug={post.slug}
                  category={post.category}
                />
              </motion.div>
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <Pagination className="my-8">
              <PaginationContent className="flex flex-wrap justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      paginate(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {/* Pagination pour les écrans mobiles (condensée) */}
                <div className="flex sm:hidden flex-wrap justify-center gap-2">
                  {/* Page 1 */}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); paginate(1); }}
                      isActive={currentPage === 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  {/* Ellipse gauche (si la page actuelle n'est pas 1 ou 2) */}
                  {totalPages > 2 && currentPage > 2 && (
                    <PaginationItem>
                      <span className="px-3 py-1.5 text-gray-500">...</span>
                    </PaginationItem>
                  )}

                  {/* Page actuelle (si elle n'est ni la première ni la dernière) */}
                  {currentPage !== 1 && currentPage !== totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => { e.preventDefault(); paginate(currentPage); }}
                        isActive={true} // La page actuelle est toujours active
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Ellipse droite (si la page actuelle n'est pas totalPages ou totalPages-1) */}
                  {totalPages > 2 && currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <span className="px-3 py-1.5 text-gray-500">...</span>
                    </PaginationItem>
                  )}

                  {/* Dernière page (si différente de la page 1) */}
                  {totalPages > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => { e.preventDefault(); paginate(totalPages); }}
                        isActive={currentPage === totalPages}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                </div>

                {/* Pagination pour les écrans desktop (complète) */}
                <div className="hidden sm:flex flex-wrap justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i + 1}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => { e.preventDefault(); paginate(i + 1); }}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </div>

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      paginate(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </motion.div>
      </PageLayout>
    </Suspense>
  );
};

export default Blog;
