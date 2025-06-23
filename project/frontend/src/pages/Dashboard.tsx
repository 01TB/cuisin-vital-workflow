import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { TrendingUp, Package, Clock, AlertTriangle } from 'lucide-react';
import axios from 'axios';

interface DashboardStats {
  commandesEnCours: number;
  revenusJour: number;
  revenusMois: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    commandesEnCours: 0,
    revenusJour: 0,
    revenusMois: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, ordersResponse] = await Promise.all([
          axios.get('http://localhost:3001/dashboard/stats'),
          axios.get('http://localhost:3001/dashboard/recent-orders'),
        ]);
        
        setStats(statsResponse.data);
        setRecentOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

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
        <div className="text-gray-600">
          Votre journal d'opération pour Cuisine Vital'
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Commandes en cours</p>
                <p className="text-3xl font-bold text-gray-900">{stats.commandesEnCours}</p>
                <p className="text-sm text-gray-500">Actives et en progression</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% depuis hier
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus journaliers</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.revenusJour)}</p>
                <p className="text-sm text-gray-500">Revenus d'aujourd'hui</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5%
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus mensuels</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.revenusMois)}</p>
                <p className="text-sm text-gray-500">Ce mois-ci</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8%
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Dishes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Plats les plus vendus</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { name: 'Ravitoto au coco sy Hena kisoa', orders: 550 },
                  { name: 'Ravitoto au coco sy Hena kisoa', orders: 480 },
                  { name: 'Ravitoto au coco sy Hena kisoa', orders: 420 },
                  { name: 'Ravitoto au coco sy Hena kisoa', orders: 390 },
                  { name: 'Ravitoto au coco sy Hena kisoa', orders: 310 },
                ].map((dish, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <div className="h-6 w-6 rounded bg-orange-500"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{dish.name}</p>
                      <p className="text-sm text-gray-500">{dish.orders} Commandes</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kitchen Workflow */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Workflow en cuisine</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">En préparation</span>
                    <span className="text-sm text-gray-500">12 commandes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Prêtes</span>
                    <span className="text-sm text-gray-500">5 commandes, en attentes de leur livreur</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;