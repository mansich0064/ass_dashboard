import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updateBiggestChangesTab } from '../../store/slices/analyticsSlice';

const BiggestChanges = () => {
  const dispatch = useDispatch();
  const { biggestChanges } = useSelector((state) => state.analytics);

  const tabs = ['Campaigns', 'Ad Groups', 'Keywords', 'Ads'];

  const getBarColor = (color) => {
    switch (color) {
      case 'orange':
        return '#FF6B35';
      case 'yellow':
        return '#FFD700';
      default:
        return '#d1d5db';
    }
  };

  return (
    <motion.div
      className="widget-card fill-column"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Tabs */}
      <div className="flex space-x-6 mb-6">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            className={`text-sm font-medium pb-2 relative ${
              biggestChanges.activeTab === tab
                ? 'text-gray-dark tab-active'
                : 'text-gray-light hover:text-gray-dark'
            }`}
            onClick={() => dispatch(updateBiggestChangesTab(tab))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              color: biggestChanges.activeTab === tab ? '#2D3748' : '#718096',
            }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Table with Bar Charts */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-600">
                Campaign
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-600 flex items-center">
                Spend
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {biggestChanges.campaigns.map((campaign, index) => (
              <motion.tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-4 flex items-center">
                  <div
                    className="w-2 h-2 rounded-full mr-3"
                    style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      backgroundColor: '#48BB78',
                    }}
                  ></div>
                  <span className="text-sm font-medium text-gray-dark">
                    {campaign.name}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-4">
                    {/* Bar Chart */}
                    <div className="flex-1 max-w-32">
                      <motion.div
                        className="bar-chart-bar"
                        style={{
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: getBarColor(campaign.barColor),
                          width: '0%',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${campaign.barLength}%` }}
                        transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                      />
                    </div>

                    {/* Values */}
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-dark">
                        {campaign.spend}
                      </div>
                      <div className="text-xs text-green-positive">
                        {campaign.spendChange}
                      </div>
                    </div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default BiggestChanges;
