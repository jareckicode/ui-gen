import React from 'react';

interface {{componentName}}Props {
  children?: React.ReactNode;
  className?: string;
  // Add your custom props here
}

export const {{componentName}}: React.FC<{{componentName}}Props> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <{{htmlTag}}
      className={`{{defaultClasses}} ${className}`}
      {...props}
    >
      {children}
    </{{htmlTag}}>
  );
};

export default {{componentName}}; 