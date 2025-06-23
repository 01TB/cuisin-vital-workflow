import React, { useState } from 'react';
import { Search, ShoppingCart, Star, Clock, Plus, Minus } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  prepTime: number;
  category: string;
}

const ClientPortal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Ravitoto au coco sy Hena kisoa',
      description: 'Plat traditionnel malgache avec feuilles de manioc et porc',
      price: 15.50,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      rating: 4.8,
      prepTime: 25,
      category: 'traditional'
    },
    {
      id: 2,
      name: 'Romazava',
      description: 'Bouillon de viande avec brèdes mafana',
      price: 14.00,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      rating: 4.6,
      prepTime: 30,
      category: 'traditional'
    },
    {
      id: 3,
      name: 'Vary amin\'anana',
      description: 'Riz aux brèdes, plat végétarien savoureux',
      price: 12.00,
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      rating: 4.4,
      prepTime: 20,
      category: 'vegetarian'
    },
    {
      id: 4,
      name: 'Henakisoa sy voanio',
      description: 'Porc au coco, spécialité de la côte',
      price: 16.50,
      image: 'https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg',
      rating: 4.7,
      prepTime: 35,
      category: 'traditional'
    },
    {
      id: 5,
      name: 'Salade de fruits tropicaux',
      description: 'Mélange de fruits frais de saison',
      price: 8.50,
      image: 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg',
      rating: 4.3,
      prepTime: 10,
      category: 'dessert'
    },
    {
      id: 6,
      name: 'Akoho sy voanio',
      description: 'Poulet au lait de coco et épices',
      price: 15.00,
      image: 'https://images.pexels.com/photos/1640778/pexels-photo-1640778.jpeg',
      rating: 4.5,
      prepTime: 28,
      category: 'traditional'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les plats' },
    { id: 'traditional', name: 'Plats traditionnels' },
    { id: 'vegetarian', name: 'Végétarien' },
    { id: 'dessert', name: 'Desserts' }
  ];

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 rounded-full p-2">
                <span className="text-white font-bold text-lg">CV</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Cuisine Vital'</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un plat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCart className="h-6 w-6" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenue, Apex Innovations</h1>
          <p className="text-gray-600">Découvrez notre sélection de plats pour votre abonnement Silver</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">1,289</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">45</p>
                <p className="text-sm text-gray-600">Pending Orders</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">1,244</p>
                <p className="text-sm text-gray-600">Completed Orders</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-blue-600">
                    {item.price.toFixed(2)} €
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.prepTime} min
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  {cart[item.id] > 0 ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-gray-100 text-gray-600 p-1 rounded-md hover:bg-gray-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-medium">{cart[item.id]}</span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="bg-blue-600 text-white p-1 rounded-md hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Ajouter
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {getCartItemCount() > 0 && (
          <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-64">
            <h3 className="font-semibold text-gray-900 mb-2">Panier</h3>
            <div className="space-y-2 mb-3">
              {Object.entries(cart).filter(([_, quantity]) => quantity > 0).map(([itemId, quantity]) => {
                const item = menuItems.find(item => item.id === parseInt(itemId));
                if (!item) return null;
                return (
                  <div key={itemId} className="flex justify-between text-sm">
                    <span>{item.name} x{quantity}</span>
                    <span>{(item.price * quantity).toFixed(2)} €</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-2 mb-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{getCartTotal().toFixed(2)} €</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Commander
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;