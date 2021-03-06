import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ProfileMetrics = ({
  likes,
  project_count,
  projects,
  viewed,
  comments
}) => {
  const metrics = [{
    text: 'Liked',
    class: 'profile-metric-icon-top',
    icon: ['fas', 'heart'],
    data: likes || 0
  },{
    text: 'Viewed',
    class: 'profile-metric-icon',
    icon: ['fas', 'laptop'],
    data: viewed || 0
  },{
    text: 'Total Projects',
    class: 'profile-metric-icon-right',
    icon: ['fas', 'chart-pie'],
    data: project_count || 0
  },{
    text: 'Commented',
    class: 'profile-metric-icon-right',
    icon: ['far', 'thumbs-up'],
    data: comments || 0
  },{
    text: 'Owned',
    class: 'profile-metric-icon',
    icon: ['fas', 'tasks'],
    data: projects || 0
  }];
  return (
    <div className="profile-metrics-container">
       { metrics.map((metric, index) => {
         return (
          <div key={index} className="profile-metrics-wrapper">
          <div className={metric.class}>
            <FontAwesomeIcon icon={metric.icon} />
          </div>
  
          <div className="profile-metric-content">
            <p>{metric.data}</p>
            <p className="profile-metrics-text">{metric.text}</p>
          </div>
        </div>
         )
       })
       }
    </div>
  );
};
