import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import React from 'react';
import '@testing-library/jest-dom';

// Mock LikeDislikeButton component
jest.mock('./LikeDislikeButton', () => ({
  __esModule: true,
  default: ({ productId, initialLikes }) => (
    <div>
      <button data-testid={`like-button-${productId}`}>
        Like {initialLikes}
      </button>
    </div>
  ),
}));

describe('ProductCard', () => {
  const props = {
    id: 1,
    imageUrl: 'https://example.com/product.jpg',
    likes: 100,
  };

  it('should render product image correctly', () => {
    render(<ProductCard {...props} />);
    
    // Check if the image is rendered with the correct URL
    const productImage = screen.getByRole('img');
    expect(productImage).toHaveAttribute('src', props.imageUrl);
    expect(productImage).toHaveAttribute('alt', 'Supreme Product');
  });

  it('should render LikeDislikeButton with correct props', () => {
    render(<ProductCard {...props} />);
    
    // Check if LikeDislikeButton receives the correct props
    const likeButton = screen.getByTestId(`like-button-${props.id}`);
    expect(likeButton).toBeInTheDocument();
    expect(likeButton).toHaveTextContent(`Like ${props.likes}`);
  });
});
