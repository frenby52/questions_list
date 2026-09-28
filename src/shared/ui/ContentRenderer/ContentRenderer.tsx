import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';

interface ContentRendererProps {
  content?: string | null;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  if (!content || typeof content !== 'string') return null;
  const sanitized = DOMPurify.sanitize(content, { ADD_ATTR: ['style'] });

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {sanitized}
    </ReactMarkdown>
  );
}
