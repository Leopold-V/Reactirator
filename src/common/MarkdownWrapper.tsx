import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
// eslint-disable-next-line import/no-unresolved
import './markdown.css';

const components = {
  code({
    node,
    inline,
    className,
    children,
    ...props
  }: {
    node: any;
    inline: any;
    className: string;
    children: ReactNode;
  }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export const MarkdownWrapper = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      className="markdown py-0"
      remarkPlugins={[gfm]}
      children={content}
      //@ts-ignore
      components={components}
    />
  );
};
