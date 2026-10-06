import DOMPurify from 'dompurify';

interface ContentRendererProps {
  content?: string | null;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  if (!content || typeof content !== 'string') return null;
  const sanitized = DOMPurify.sanitize(content, { ADD_ATTR: ['style'] });

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
