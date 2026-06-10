import React from 'react';

export const Input = ({ 
  label, 
  icon, 
  error, 
  helper,
  className = '',
  ...props 
}) => {
  return (
    <div className="mb-md">
      {label && (
        <label className="block text-sm font-medium text-secondary mb-sm">
          {label}
        </label>
      )}
      <div className="input-group-premium">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          className={`input-premium ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-danger mt-sm">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-tertiary mt-sm">{helper}</p>
      )}
    </div>
  );
};

export const Select = ({ 
  label, 
  options = [], 
  error, 
  helper,
  className = '',
  ...props 
}) => {
  return (
    <div className="mb-md">
      {label && (
        <label className="block text-sm font-medium text-secondary mb-sm">
          {label}
        </label>
      )}
      <select
        className={`input-premium ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-danger mt-sm">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-tertiary mt-sm">{helper}</p>
      )}
    </div>
  );
};

export const TextArea = ({ 
  label, 
  error, 
  helper,
  className = '',
  rows = 4,
  ...props 
}) => {
  return (
    <div className="mb-md">
      {label && (
        <label className="block text-sm font-medium text-secondary mb-sm">
          {label}
        </label>
      )}
      <textarea
        className={`input-premium ${error ? 'border-red-500' : ''} ${className}`}
        rows={rows}
        {...props}
      />
      {error && (
        <p className="text-sm text-danger mt-sm">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-tertiary mt-sm">{helper}</p>
      )}
    </div>
  );
};
