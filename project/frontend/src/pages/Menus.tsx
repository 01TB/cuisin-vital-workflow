import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import axios from 'axios';

interface Menu {
  id: number;
  nom: string;
  description: string;
  prix_carte: number;
  temps_preparation: number;
  disponible: boolean;
  photo_url?: string;
}

const Menus: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:3001/menus');
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const filteredMenus = menus.filter(menu =>
    menu.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Gestion du Menu</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un plat
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un plat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenus.map((menu) => (
            <div key={menu.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {menu.photo_url ? (
                  <img
                    src={menu.photo_url}
                    alt={menu.nom}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">Pas d'image</span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    menu.disponible 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {menu.disponible ? 'Disponible' : 'Indisponible'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{menu.nom}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{menu.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(menu.prix_carte)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {menu.temps_preparation} min
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </button>
                  <button className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-md hover:bg-green-100 transition-colors flex items-center justify-center">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </button>
                  <button className="bg-red-50 text-red-600 px-3 py-2 rounded-md hover:bg-red-100 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMenus.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun plat trouvé</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Menus;