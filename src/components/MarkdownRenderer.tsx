'use client';

import { ComponentProps, useMemo } from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// Types
interface MarkdownRendererProps {
  content: string;
}

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

interface CopyButtonProps {
  onCopy: () => void;
  className?: string;
}

// Constants
const LANGUAGE_LABELS: Record<string, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  js: 'JavaScript',
  ts: 'TypeScript',
  jsx: 'React JSX',
  tsx: 'React TSX',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  markdown: 'Markdown',
  md: 'Markdown',
  bash: 'Shell',
  shell: 'Shell',
  sh: 'Shell',
  python: 'Python',
  py: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  csharp: 'C#',
  cs: 'C#',
  php: 'PHP',
  ruby: 'Ruby',
  go: 'Go',
  rust: 'Rust',
  swift: 'Swift',
  kotlin: 'Kotlin',
  scala: 'Scala',
  r: 'R',
  sql: 'SQL',
  graphql: 'GraphQL',
  dockerfile: 'Dockerfile',
  docker: 'Docker',
  gitignore: 'Git Ignore',
  env: 'Environment Variables',
  ini: 'INI',
  toml: 'TOML',
  xml: 'XML',
  svg: 'SVG',
  diff: 'Diff',
  patch: 'Patch',
  log: 'Log',
  txt: 'Text',
};

// Utility functions
const extractTextContent = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractTextContent).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return extractTextContent(node.props.children);
  }
  return '';
};

const getLanguageDisplayName = (language: string): string => {
  return LANGUAGE_LABELS[language.toLowerCase()] || language;
};

// Components
const CopyButton: React.FC<CopyButtonProps> = ({ onCopy, className = '' }) => {
  const handleClick = async () => {
    try {
      await onCopy();

      // Visual feedback
      const button = document.activeElement as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent;
        const originalClasses = button.className;

        button.textContent = 'Copied!';
        button.className = `${originalClasses} text-green-600 bg-green-50 border-green-200`;

        setTimeout(() => {
          button.textContent = originalText;
          button.className = originalClasses;
        }, 2000);
      }
    } catch (error) {
      console.warn('Copy failed:', error);
      // Fallback: show error feedback
      const button = document.activeElement as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Failed';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded border border-transparent px-2 py-1 text-xs text-gray-500 transition-all duration-200 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700 ${className}`}
      title="Copy code to clipboard"
    >
      Copy
    </button>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const displayName = getLanguageDisplayName(language);
  const textContent = extractTextContent(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textContent);
    } catch (error) {
      // Fallback for older browsers or when clipboard API fails
      const textArea = document.createElement('textarea');
      textArea.value = textContent;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
      } catch (fallbackError) {
        console.error('Copy fallback failed:', fallbackError);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="code-block">
      {displayName && (
        <div className="code-header">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {displayName}
          </span>
          <CopyButton onCopy={handleCopy} />
        </div>
      )}
      <div className="code-content">
        <code className={`hljs ${className || ''}`}>{children}</code>
      </div>
    </div>
  );
};

// Main component
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const languageLabel = useMemo(() => LANGUAGE_LABELS, []);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        // Code blocks
        code: ({
          className,
          children,
          ...props
        }: ComponentProps<'code'> & { inline?: boolean }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = props.inline;

          if (isInline || !match) {
            return (
              <code
                className="rounded bg-slate-100 px-2 py-1 font-mono text-sm text-slate-800 dark:bg-gray-800 dark:text-gray-100"
                {...props}
              >
                {children}
              </code>
            );
          }

          return <CodeBlock className={className}>{children}</CodeBlock>;
        },

        // Headings with better spacing
        h1: ({ children, ...props }) => (
          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            className="mb-4 mt-8 text-2xl font-semibold text-gray-800 dark:text-gray-200"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            className="mb-3 mt-6 text-xl font-semibold text-gray-700 dark:text-gray-300"
            {...props}
          >
            {children}
          </h3>
        ),

        // Links with better styling
        a: ({ href, children, ...props }) => (
          <a
            href={href}
            className="text-primary-600 underline decoration-primary-300 transition-colors duration-200 hover:text-primary-700 hover:decoration-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
          >
            {children}
          </a>
        ),

        // Lists with better spacing
        ul: ({ children, ...props }) => (
          <ul className="mb-4 ml-6 list-disc space-y-1 text-gray-700 dark:text-gray-300" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol
            className="mb-4 ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300"
            {...props}
          >
            {children}
          </ol>
        ),

        // Blockquotes with better styling
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="mb-4 border-l-4 border-primary-300 bg-primary-50/30 pl-4 italic text-gray-700 dark:border-primary-600 dark:bg-primary-900/20 dark:text-gray-300"
            {...props}
          >
            {children}
          </blockquote>
        ),

        // Tables with better styling
        table: ({ children, ...props }) => (
          <div className="mb-6 overflow-x-auto">
            <table
              className="min-w-full border-collapse border border-gray-300 dark:border-gray-600"
              {...props}
            >
              {children}
            </table>
          </div>
        ),
        th: ({ children, ...props }) => (
          <th
            className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
            {...props}
          >
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td
            className="border border-gray-300 px-4 py-2 text-gray-700 dark:border-gray-600 dark:text-gray-300"
            {...props}
          >
            {children}
          </td>
        ),

        // Horizontal rule
        hr: () => <hr className="my-8 border-gray-300 dark:border-gray-600" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
