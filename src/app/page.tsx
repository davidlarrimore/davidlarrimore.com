import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Welcome to My Personal Website</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-xl">
            I&apos;m a developer passionate about building web applications with modern technologies.
            This site showcases my projects and experiments with LLMs and other technologies.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">AI Chat Assistant</h3>
              <p className="mb-4">An interactive chat application powered by LLM APIs.</p>
              <Link href="/projects/ai-chat" className="text-blue-500 hover:text-blue-700">
                View Project →
              </Link>
            </div>
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-2">Project Portfolio</h3>
              <p className="mb-4">Collection of my past and current projects.</p>
              <Link href="/projects" className="text-blue-500 hover:text-blue-700">
                View All Projects →
              </Link>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Latest Blog Posts</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-medium">Getting Started with Next.js and LLMs</h3>
              <p className="text-gray-600">Posted on March 5, 2025</p>
              <Link href="/blog/getting-started-nextjs-llms" className="text-blue-500 hover:text-blue-700">
                Read more →
              </Link>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-medium">Setting Up Docker for Next.js Applications</h3>
              <p className="text-gray-600">Posted on February 28, 2025</p>
              <Link href="/blog/docker-nextjs-setup" className="text-blue-500 hover:text-blue-700">
                Read more →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
