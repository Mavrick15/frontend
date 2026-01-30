import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { blogPosts } from '@/data/blogPosts';
import BlogPostCard from '@/components/BlogPostCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const TEXT_CONSTANTS = {
  POSTS_PER_PAGE: 6,
  FEATURED_POST_ID: '4',

  HEADER_TITLE: "Actualités & informations",
  HEADER_DESCRIPTION: "Explorez les dernières actualités et les innovations proposées par Zetoun Labs, votre référence en services IT et formation.",
  HEADER_INTRO: "Cybersécurité, cloud, IA, réseaux, développement… Retrouvez ici nos articles pour rester à jour sur les technologies qui transforment votre entreprise.",
  FEATURED_BADGE: "À la une",
  FEATURED_POST_DATE_PREFIX: "Publié le:",
  READ_MORE_BUTTON: "Continuer la lecture",
  SEO_TITLE: "Les dernières actualités technologiques - Zetoun Labs",
  SEO_DESCRIPTION: "Explorez les dernières actualités et les innovations proposées par Zetoun Labs, votre référence en services IT et formation.",
  FEATURED_IMAGE_ALT: (title: string, category: string) => `Illustration : ${category} - ${title}`,
};

const SEO_KEYWORDS = [
  'support tech', 'assistance info', 'ingénierie réseau', 'conception réseau', 'installation réseau', 'vidéosurveillance', 'sécurité vidéo', 'conception web',
  'création site', 'infogérance IT', 'maintenance IT', 'supervision système', 'installation solaire', 'système solaire', 'formation Linux', 'admin Linux', 'serveurs Linux',
  'formation Windows', 'admin Windows', 'formation réseau', 'Cisco routage', 'Cisco switching', 'maintenance PC', 'dépannage info', 'formation virtualisation', 'VMware formation', 'ITIL formation',
  'cybersécurité formation', 'startup tech', 'innovation numérique', 'solutions IT', 'expert IT', 'consulting IT', 'Zetoun Labs'
];

const SVG_PATTERN = {
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
};

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = blogPosts.find(post => post.id === TEXT_CONSTANTS.FEATURED_POST_ID) || blogPosts[0];
  const allOtherPosts = blogPosts.filter(post => post.id !== featuredPost?.id);

  const indexOfLastPost = currentPage * TEXT_CONSTANTS.POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - TEXT_CONSTANTS.POSTS_PER_PAGE;
  const currentPosts = allOtherPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(allOtherPosts.length / TEXT_CONSTANTS.POSTS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <PageLayout>
      <SEO
        title={TEXT_CONSTANTS.SEO_TITLE}
        description={TEXT_CONSTANTS.SEO_DESCRIPTION}
        imageUrl={featuredPost?.imageUrl}
        keywords={SEO_KEYWORDS}
        type="website"
      />

      <motion.div
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="w-full pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-b-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30" style={SVG_PATTERN} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              variants={textVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg text-white"
            >
              {TEXT_CONSTANTS.HEADER_TITLE}
            </motion.h1>
            <motion.p
              variants={textVariants}
              className="text-xl md:text-2xl text-gray-200 mb-3 max-w-2xl mx-auto leading-relaxed"
            >
              {TEXT_CONSTANTS.HEADER_DESCRIPTION}
            </motion.p>
            <motion.p
              variants={textVariants}
              className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              {TEXT_CONSTANTS.HEADER_INTRO}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-white via-gray-50 to-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredPost && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="col-span-1 md:col-span-2 lg:col-span-3"
            >
              <Link to={`/blog/${featuredPost.slug}`} className="h-full block group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full rounded-2xl border border-gray-200/50 bg-white/90 backdrop-blur-sm hover:-translate-y-2">
                  <div className="grid md:grid-cols-2 h-full">
                    <div className="relative h-64 md:h-full overflow-hidden group-hover:scale-105 transition-transform duration-700">
                      <img
                        src={featuredPost.imageUrl}
                        alt={TEXT_CONSTANTS.FEATURED_IMAGE_ALT(featuredPost.title, featuredPost.category)}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://placehold.co/600x400/1a1a1a/ffffff?text=${encodeURIComponent(featuredPost.category)}`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center p-8">
                        <div className="text-white text-center bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold inline-block mb-4 border border-white/30">{TEXT_CONSTANTS.FEATURED_BADGE}</span>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-space">{featuredPost.title}</h3>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <CardContent className="p-8 bg-white/80 backdrop-blur-sm flex flex-col justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-4 font-semibold">{TEXT_CONSTANTS.FEATURED_POST_DATE_PREFIX} {featuredPost.date}</p>
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                          {featuredPost.excerpt}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="group bg-gray-900 text-white border-0 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                      >
                        {TEXT_CONSTANTS.READ_MORE_BUTTON}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )}

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

        {totalPages > 1 && (
          <Pagination className="my-12">
            <PaginationContent className="flex flex-wrap justify-center gap-3">
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

              <div className="flex sm:hidden flex-wrap justify-center gap-2">
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => { e.preventDefault(); paginate(1); }}
                    isActive={currentPage === 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {totalPages > 2 && currentPage > 2 && (
                  <PaginationItem>
                    <span className="px-3 py-1.5 text-gray-500">...</span>
                  </PaginationItem>
                )}

                {currentPage !== 1 && currentPage !== totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => { e.preventDefault(); paginate(currentPage); }}
                      isActive={true}
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {totalPages > 2 && currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <span className="px-3 py-1.5 text-gray-500">...</span>
                  </PaginationItem>
                )}

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
  );
};

export default Blog;
