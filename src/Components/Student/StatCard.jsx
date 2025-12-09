import React from 'react';
import {
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const StatsCards = () => {
  const stats = [
    {
      title: 'Enrolled Courses',
      value: '8',
      icon: BookOpenIcon,
      change: '+2 this month',
      trend: 'up',
      color: 'danger'
    },
    {
      title: 'Completed',
      value: '24',
      icon: CheckCircleIcon,
      change: '+4 this month',
      trend: 'up',
      color: 'success'
    },
    {
      title: 'In Progress',
      value: '5',
      icon: ClockIcon,
      change: '2 due soon',
      trend: 'neutral',
      color: 'warning'
    },
    {
      title: 'Avg. Score',
      value: '87.5%',
      icon: ChartBarIcon,
      change: '+2.1% from last month',
      trend: 'up',
      color: 'primary'
    }
  ];

  return (
    <div className="row g-4">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-muted mb-2">{stat.title}</h6>
                  <h2 className="fw-bold mb-0">{stat.value}</h2>
                  <div className="d-flex align-items-center mt-2">
                    {stat.trend === 'up' && <ArrowUpIcon className="h-4 w-4 text-success me-1" />}
                    {stat.trend === 'down' && <ArrowDownIcon className="h-4 w-4 text-danger me-1" />}
                    <small className={`text-${stat.trend === 'up' ? 'success' : stat.trend === 'down' ? 'danger' : 'warning'}`}>
                      {stat.change}
                    </small>
                  </div>
                </div>
                <div className={`bg-${stat.color}-subtle p-3 rounded-circle`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;