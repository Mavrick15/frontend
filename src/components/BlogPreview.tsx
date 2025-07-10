import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogPostCard from '@/components/BlogPostCard';
import { blogPosts } from '@/data/blogPosts';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { cn } from '@/lib/utils';

const TEXT_CONSTANTS = {
  SECTION_TITLE_ICON_ALT: "Icône d'actualités",
  SECTION_CATEGORY: "Actualités",
  SECTION_HEADER: "Dernières mises à jour",
  SECTION_DESCRIPTION: "Explorez nos dernières réflexions sur la technologie, les tendances de l'industrie et l'innovation.",
  VIEW_ALL_ARTICLES_BUTTON: "Voir tous les articles",
  PLACEHOLDER_IMAGE_URL: "/placeholder.svg",
};

const BlogPreview = () => {
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section id="blog" className="py-12 md:py-24 px-4 md:px-12 bg-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Newspaper size={20} className="text-gray-900" aria-label={TEXT_CONSTANTS.SECTION_TITLE_ICON_ALT} />
              <span className="text-gray-900 font-medium">
                {TEXT_CONSTANTS.SECTION_CATEGORY}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {TEXT_CONSTANTS.SECTION_HEADER}
            </h2>
            <p className="text-gray-700 max-w-xl text-justify">
              {TEXT_CONSTANTS.SECTION_DESCRIPTION}
            </p>
          </div>
          <Link to="/blog" className="mt-4 md:mt-0">
            <Button variant="outline" className="group border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
              {TEXT_CONSTANTS.VIEW_ALL_ARTICLES_BUTTON}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          <ScrollArea className="w-full">
            <div className="flex gap-6 pb-4 md:hidden overflow-x-auto snap-x snap-mandatory pl-1">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex-none w-[85%] snap-center">
                  <BlogPostCard
                    title={post.title}
                    excerpt={post.excerpt}
                    imageUrl={post.imageUrl || TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL}
                    date={post.date}
                    slug={post.slug}
                    category={post.category}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                imageUrl={post.imageUrl || TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL}
                date={post.date}
                slug={post.slug}
                category={post.category}
              />
            ))}
          </div>

          <div className="mt-4 flex justify-center md:hidden">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn("h-1.5 rounded-full", {
                    "w-6 bg-gray-800": i === 0,
                    "w-2 bg-gray-400": i !== 0,
                  })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
