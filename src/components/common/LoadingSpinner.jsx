import React from 'react';
import './LoadingSpinner.css'; // 我们将在这里定义样式

/**
 * 一个简单的 CSS 驱动的加载指示器组件。
 */
const LoadingSpinner = ({ size = '40px', color = '#0d6efd', thickness = '4px' }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    borderWidth: thickness,
    borderTopColor: color,
    // 可以根据需要添加其他样式变量
  };

  return (
    <div className="spinner-container" aria-live="polite" aria-label="内容加载中">
      <div className="spinner" style={spinnerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
