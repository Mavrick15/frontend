import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

// Constantes pour le composant BlogPostCard
const TEXT_CONSTANTS = {
  PLACEHOLDER_IMAGE_URL: (category: string) => `https://placehold.co/400x200/1a1a1a/ffffff?text=${encodeURIComponent(category)}`,
  IMAGE_ALT: (title: string, category: string) => `Illustration : ${category} - ${title}`,
  READ_MORE_BUTTON_TEXT: "Continuer la lecture",
};

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  slug: string;
  category: string;
}

const BlogPostCard = ({
  title,
  excerpt,
  imageUrl,
  date,
  slug,
  category
}: BlogPostCardProps) => {
  return (
    <Link to={`/blog/${slug}`} className="h-full block group">
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full rounded-2xl border border-gray-200/50 bg-white/90 backdrop-blur-sm hover:-translate-y-2 flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={TEXT_CONSTANTS.IMAGE_ALT(title, category)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = TEXT_CONSTANTS.PLACEHOLDER_IMAGE_URL(category);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center p-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold text-white border border-white/30 shadow-lg">
              {category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <CardContent className="p-6 flex flex-col flex-1">
          <p className="text-gray-600 text-sm mb-3 font-semibold">
            {date}
          </p>
          <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900">
            {title}
          </h3>
          <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed flex-1">
            {excerpt}
          </p>
          <Button variant="outline" className="group mt-auto bg-gray-900 text-white border-0 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
            {TEXT_CONSTANTS.READ_MORE_BUTTON_TEXT}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogPostCard;
