import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Separator } from '@/components/ui/separator';
import SEO from '../components/SEO';
import { blogPosts } from '@/data/blogPosts';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, MessageSquare, Share, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const TEXT_CONSTANTS = {
  WORDS_PER_MINUTE: 200,
  MIN_READING_TIME: 1,

  ARTICLE_NOT_FOUND_TITLE: "Article non trouvé",
  ARTICLE_NOT_FOUND_DESCRIPTION: "Nous n'avons pas pu trouver l'article que vous recherchez.",
  BADGE_ICON_SIZE: 14,
  AUTHOR_ICON_SIZE: 18,
  READING_TIME_UNIT: "min de lecture",
  AUTHOR_PREFIX: "Par",
  CATEGORY_PREFIX: "Catégorie:",
  QUOTE_ICON_SIZE: 20,
  SHARE_BUTTON_TEXT: "Partager l'article",
  SHARE_TOAST_SUCCESS_TITLE: "Lien copié !",
  SHARE_TOAST_SUCCESS_DESCRIPTION: "Le lien de l'article a été copié dans votre presse-papiers.",
};

const CSS_CLASSES = {
  HEADER_BASE: "w-full pt-32 pb-16 relative",
  HEADER_SENSOR_BG: "bg-black text-white",
  HEADER_DEFAULT_BG: "bg-gradient-to-b from-gray-900 to-black text-white",
  HEADER_OVERLAY_SENSOR: "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9))",
  HEADER_OVERLAY_DEFAULT: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8))",
  BADGE_SECONDARY: "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 flex items-center gap-1.5",
  BADGE_OUTLINE: "border-white/10 text-white/80 backdrop-blur-sm flex items-center gap-1.5",
  PROSE_BASE: "prose prose-lg max-w-none",
  PARAGRAPH_CLASS: "text-gray-700 mb-4 leading-relaxed",
  HEADING_CONTAINER: "flex items-center gap-3 mt-12 mb-6",
  HEADING_DECORATOR: "w-1.5 h-7 bg-purple-500 rounded-full",
  HEADING_TEXT: "text-2xl font-bold text-gray-900",
  SUBHEADING_CONTAINER: "text-xl font-bold mt-8 mb-3 text-gray-800 flex items-center gap-2",
  SUBHEADING_DECORATOR: "w-2 h-2 bg-purple-400 rounded-full",
  LIST_CLASS: "list-disc pl-5 my-4 space-y-2",
  LIST_ITEM_CLASS: "text-gray-700",
  QUOTE_CLASS: "border-l-4 border-purple-500 pl-5 py-2 my-8 bg-purple-50 rounded-r-lg italic text-gray-700",
  QUOTE_ICON_CLASS: "text-purple-500 mr-3 mt-1 flex-shrink-0",
  FOOTER_INFO_CLASS: "flex flex-col sm:flex-row items-center justify-between py-6 bg-gray-50 rounded-lg p-6 shadow-sm",
  FOOTER_TEXT_CLASS: "text-sm text-gray-600 font-medium",
};

const formatDateForISO = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
};

const extractKeywords = (post) => {
  const baseKeywords = [post.category];
  const titleWords = post.title.toLowerCase().split(' ').filter(word => word.length > 3);
  const contentKeywords = post.excerpt ? post.excerpt.toLowerCase().split(' ').slice(0, 5) : [];
  return [...new Set([...baseKeywords, ...titleWords, ...contentKeywords])];
};

const BlogPostDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = () => {
    const articleUrl = window.location.href;
    const el = document.createElement('textarea');
    el.value = articleUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    toast({
      title: TEXT_CONSTANTS.SHARE_TOAST_SUCCESS_TITLE,
      description: TEXT_CONSTANTS.SHARE_TOAST_SUCCESS_DESCRIPTION,
    });
  };

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 min-h-[50vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">{TEXT_CONSTANTS.ARTICLE_NOT_FOUND_TITLE}</h1>
          <p>{TEXT_CONSTANTS.ARTICLE_NOT_FOUND_DESCRIPTION}</p>
          <Link to="/blog" className="mt-4 text-blue-600 hover:underline">
            Retour au blog
          </Link>
        </div>
      </PageLayout>
    );
  }

  const isSensorPost = post.category === 'Capteurs';
  const wordCount = post.content.reduce((count, section) => {
    if (section.content) return count + section.content.split(/\s+/).length;
    if (section.items) return count + section.items.join(' ').split(/\s+/).length;
    return count;
  }, 0);
  const readingTime = Math.max(TEXT_CONSTANTS.MIN_READING_TIME, Math.ceil(wordCount / TEXT_CONSTANTS.WORDS_PER_MINUTE));
  const absoluteImageUrl = post.imageUrl.startsWith('/') ? post.imageUrl : `/${post.imageUrl}`;

  return (
    <PageLayout>
      <SEO
        title={`${post.title} - Zetoun Labs`}
        description={post.excerpt}
        imageUrl={absoluteImageUrl}
        type="article"
        isBlogPost={true}
        publishDate={formatDateForISO(post.date)}
        modifiedDate={formatDateForISO(post.date)}
        author={post.author}
        category={post.category}
        keywords={extractKeywords(post)}
      />

      <div
        className={cn(
          CSS_CLASSES.HEADER_BASE,
          isSensorPost ? CSS_CLASSES.HEADER_SENSOR_BG : CSS_CLASSES.HEADER_DEFAULT_BG
        )}
        style={{
          backgroundImage: isSensorPost
            ? `${CSS_CLASSES.HEADER_OVERLAY_SENSOR}, url('${absoluteImageUrl}')`
            : `${CSS_CLASSES.HEADER_OVERLAY_DEFAULT}, url('${absoluteImageUrl}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary" className={CSS_CLASSES.BADGE_SECONDARY}>
                <Tag size={TEXT_CONSTANTS.BADGE_ICON_SIZE} />
                {post.category}
              </Badge>
              <Badge variant="outline" className={CSS_CLASSES.BADGE_OUTLINE}>
                <Calendar size={TEXT_CONSTANTS.BADGE_ICON_SIZE} />
                {post.date}
              </Badge>
              <Badge variant="outline" className={CSS_CLASSES.BADGE_OUTLINE}>
                <Clock size={TEXT_CONSTANTS.BADGE_ICON_SIZE} />
                {readingTime} {TEXT_CONSTANTS.READING_TIME_UNIT}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center text-gray-300">
              <BookOpen size={TEXT_CONSTANTS.AUTHOR_ICON_SIZE} className="mr-2" />
              <span>{TEXT_CONSTANTS.AUTHOR_PREFIX} {post.author}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={CSS_CLASSES.PROSE_BASE}
          >
            {post.content.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className={cn("mb-8", section.type === 'quote' && "my-10")}
              >
                {section.type === 'paragraph' && <p className={CSS_CLASSES.PARAGRAPH_CLASS}>{section.content}</p>}
                {section.type === 'heading' && (
                  <div className={CSS_CLASSES.HEADING_CONTAINER}>
                    <div className={CSS_CLASSES.HEADING_DECORATOR}></div>
                    <h2 className={CSS_CLASSES.HEADING_TEXT}>{section.content}</h2>
                  </div>
                )}
                {section.type === 'subheading' && (
                  <h3 className={CSS_CLASSES.SUBHEADING_CONTAINER}>
                    <div className={CSS_CLASSES.SUBHEADING_DECORATOR}></div>
                    {section.content}
                  </h3>
                )}
                {section.type === 'list' && (
                  <ul className={CSS_CLASSES.LIST_CLASS}>
                    {section.items?.map((item, itemIndex) => (
                      <li key={itemIndex} className={CSS_CLASSES.LIST_ITEM_CLASS}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.type === 'quote' && (
                  <blockquote className={CSS_CLASSES.QUOTE_CLASS}>
                    <div className="flex">
                      <MessageSquare size={TEXT_CONSTANTS.QUOTE_ICON_SIZE} className={CSS_CLASSES.QUOTE_ICON_CLASS} />
                      <p className="text-lg m-0">{section.content}</p>
                    </div>
                  </blockquote>
                )}
              </motion.div>
            ))}
          </motion.div>

          <Separator className="my-8" />

          <div className={CSS_CLASSES.FOOTER_INFO_CLASS}>
            <div>
              <p className={CSS_CLASSES.FOOTER_TEXT_CLASS}>{TEXT_CONSTANTS.CATEGORY_PREFIX} {post.category}</p>
            </div>
            <Button
              variant="outline"
              onClick={handleShare}
              className="mt-4 sm:mt-0 flex items-center gap-2"
            >
              <Share size={16} />
              {TEXT_CONSTANTS.SHARE_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPostDetail;
