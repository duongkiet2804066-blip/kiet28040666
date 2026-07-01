import React, { useEffect, useState } from 'react';

interface IconSaxProps {
  name: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export const IconSax: React.FC<IconSaxProps> = ({ name, className = '', onClick, style }) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    let active = true;
    const cleanName = name.toLowerCase().trim();
    fetch(`/assets/icons/${cleanName}.svg`)
      .then((res) => {
        if (!res.ok) throw new Error('Icon not found');
        return res.text();
      })
      .then((text) => {
        if (active) {
          // Remove scripts or security-sensitive content
          if (text.includes('Content-Security-Policy')) {
            setSvgContent('');
          } else {
            setSvgContent(text);
          }
        }
      })
      .catch((err) => {
        console.error(`Failed to load iconsax: ${name}`, err);
      });

    return () => {
      active = false;
    };
  }, [name]);

  return (
    <i
      className={`iconsax ${className}`}
      data-icon={name}
      onClick={onClick}
      style={style}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
