import React from 'react';
import { motion } from 'framer-motion';
const CategoryGrid = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-section">
      <h3>Categorias</h3>
      <div className="category-grid">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.name || (cat.id === 'todos' && !selectedCategory);
          
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`category-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id === 'todos' ? null : cat.name)}
            >
              <div className="category-icon">
                <Icon size={24} />
              </div>
              <span>{cat.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
