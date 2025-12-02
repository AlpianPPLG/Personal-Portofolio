import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '1rem',
  rounded = false,
  lines = 1
}) => {
  const skeletonClass = `
    bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
    dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
    animate-pulse
    ${rounded ? 'rounded-full' : 'rounded'}
    ${className}
  `;

  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => (
          <motion.div
            key={i}
            className={skeletonClass}
            style={{
              width: i === lines - 1 ? '60%' : width,
              height
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={skeletonClass}
      style={{ width, height }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
};

export const PortfolioCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <Skeleton height="200px" className="rounded-none" />
      <div className="p-6">
        <Skeleton width="80%" height="1.5rem" className="mb-3" />
        <Skeleton lines={3} height="1rem" className="mb-4" />
        <div className="flex gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width="60px" height="24px" rounded />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Skeleton width="100px" height="36px" rounded />
          <Skeleton width="100px" height="36px" rounded />
        </div>
      </div>
    </div>
  );
};

export const TestimonialSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <Skeleton lines={4} height="1rem" className="mb-4" />
      <div className="flex items-center space-x-4">
        <Skeleton width="50px" height="50px" rounded />
        <div className="flex-1">
          <Skeleton width="120px" height="1rem" className="mb-1" />
          <Skeleton width="80px" height="0.875rem" />
        </div>
      </div>
    </div>
  );
};

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <Skeleton width="60px" height="60px" rounded className="mx-auto mb-4" />
      <Skeleton width="150px" height="1.5rem" className="mx-auto mb-3" />
      <Skeleton lines={3} height="1rem" className="mb-4" />
      <Skeleton width="120px" height="36px" rounded className="mx-auto" />
    </div>
  );
};

export const TimelineSkeleton: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="relative flex items-start space-x-6 pb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <Skeleton width="32px" height="32px" rounded />
          <div className="flex-1">
            <Skeleton width="200px" height="1.25rem" className="mb-2" />
            <Skeleton width="150px" height="1rem" className="mb-3" />
            <Skeleton lines={2} height="0.875rem" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
