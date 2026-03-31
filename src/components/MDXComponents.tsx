import { MDXRemoteProps } from 'next-mdx-remote/rsc';

export const mdxComponents: MDXRemoteProps['components'] = {
  h1: (props) => (
    <h1 className="text-4xl md:text-5xl font-serif font-bold text-heading mt-12 mb-6 leading-tight" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading mt-10 mb-5 leading-snug" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-2xl md:text-3xl font-serif font-bold text-heading mt-8 mb-4 leading-snug" {...props} />
  ),
  p: (props) => (
    <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-sans" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 text-xl md:text-2xl italic font-serif text-heading bg-card-bg/20 rounded-r-lg" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 mb-6 text-lg md:text-xl text-foreground space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-6 text-lg md:text-xl text-foreground space-y-2" {...props} />
  ),
  a: (props) => (
    <a className="text-accent hover:text-red-500 underline underline-offset-4 transition-colors font-medium" {...props} />
  ),
  img: (props) => (
    <div className="relative w-full aspect-video my-10 rounded-xl overflow-hidden bg-black/20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="object-cover w-full h-full rounded-xl" {...props} alt={props.alt || ''} />
    </div>
  ),
};
