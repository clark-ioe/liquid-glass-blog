import {
  Code,
  BookOpen,
  Target,
  Mail,
  Github,
  Twitter,
  Linkedin,
  Lightbulb,
  Users2,
  Rocket,
} from 'lucide-react';

export default function AboutPage() {
  const techStack = [
    { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { name: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'Redis'] },
    { name: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Figma'] },
    { name: 'Learning', items: ['Rust', 'Go', 'Machine Learning', 'System Design'] },
  ];

  const learningGoals = [
    {
      title: 'Deep Understanding',
      description: 'Master core concepts and best practices',
      icon: BookOpen,
    },
    {
      title: 'Hands-on Projects',
      description: 'Learn by building real-world projects',
      icon: Code,
    },
    { title: 'Continuous Learning', description: 'Stay up-to-date with tech trends', icon: Target },
  ];

  const contactInfo = [
    {
      type: 'Email',
      value: 'clark@intentoriented.com',
      icon: Mail,
      href: 'mailto:clark@intentoriented.com',
    },
    {
      type: 'GitHub',
      value: 'clark-ioe/liquid-glass-blog',
      icon: Github,
      href: 'https://github.com/clark-ioe/liquid-glass-blog',
    },
    { type: 'X (Twitter)', value: '@clark_ioe', icon: Twitter, href: 'https://x.com/clark_ioe' },
    {
      type: 'LinkedIn',
      value: 'Clark',
      icon: Linkedin,
      href: 'https://linkedin.com/in/clark-ioe',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Page title */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-5xl font-bold text-slate-900 text-transparent dark:text-gray-100">
              About
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-gray-400">
              Hi! I am Clark, a developer passionate about building useful products and sharing
              knowledge.
            </p>
          </div>

          {/* My Story - uses the same header style as Tag Cloud */}
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 dark:text-gray-100">
            <span className="inline-block rounded-full bg-gradient-to-r from-primary-100 to-accent-100 px-6 py-2 dark:from-primary-900 dark:to-accent-900">
              My Story
            </span>
          </h2>
          <div className="card mb-16 p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-4 leading-relaxed text-slate-600 dark:text-gray-400">
                I was fascinated by programming from the moment I wrote my first line of code. Every
                project is a journey of problem-solving and craftsmanship.
              </p>
              <p className="leading-relaxed text-slate-600 dark:text-gray-400">
                Here I share technical insights, learning notes, and project experiences. Let’s grow
                together.
              </p>
            </div>
          </div>

          {/* Tech stack */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-2 dark:from-gray-700 dark:to-gray-600">
                Tech Stack
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {techStack.map((category) => (
                <div key={category.name} className="card p-6">
                  <h3 className="mb-4 text-center text-lg font-semibold text-slate-900 dark:text-gray-100">
                    {category.name}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center space-x-2 text-sm text-slate-600 dark:text-gray-400"
                      >
                        <span className="h-2 w-2 rounded-full bg-primary-500"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning goals */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-2 dark:from-gray-700 dark:to-gray-600">
                Learning Goals
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {learningGoals.map((goal) => (
                <div
                  key={goal.title}
                  className="card p-6 text-center transition-all duration-300 hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200 dark:bg-gray-700 dark:ring-gray-700/60">
                    <goal.icon size={22} className="text-slate-700 dark:text-gray-200" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {goal.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                    {goal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Blog goals */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-2 dark:from-gray-700 dark:to-gray-600">
                Blog Goals
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="card p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200 dark:bg-gray-700 dark:ring-gray-700/60">
                  <Lightbulb size={22} className="text-slate-700 dark:text-gray-200" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  Share Insights
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Document ideas and discoveries.
                </p>
              </div>
              <div className="card p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200 dark:bg-gray-700 dark:ring-gray-700/60">
                  <Users2 size={22} className="text-slate-700 dark:text-gray-200" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  Learn Together
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Grow with the community.</p>
              </div>
              <div className="card p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200 dark:bg-gray-700 dark:ring-gray-700/60">
                  <Rocket size={22} className="text-slate-700 dark:text-gray-200" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  Drive Innovation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contribute to the ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-4">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-2 dark:from-gray-700 dark:to-gray-600">
                Contact
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((contact) => (
                <a
                  key={contact.type}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex flex-col items-center justify-center space-y-3 p-6 text-center transition-colors duration-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 ring-1 ring-inset ring-gray-200 dark:bg-gray-700 dark:ring-gray-700/60">
                    <contact.icon size={22} className="text-slate-700 dark:text-gray-200" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{contact.type}</div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
