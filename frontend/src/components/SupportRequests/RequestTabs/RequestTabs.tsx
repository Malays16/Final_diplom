import React from 'react';
import './RequestTabs.scss';
import { SupportRequest } from '@/types/chat';

type ActiveTab = 'active' | 'closed';
interface RequestTabsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeRequests: SupportRequest[];
  closedRequests: SupportRequest[];
}

const RequestTabs: React.FC<RequestTabsProps> = ({
  activeTab,
  setActiveTab,
  activeRequests,
  closedRequests
}) => {
  return (
    <div className="request-tabs">
      <button
        className={`tab-button ${activeTab === 'active' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('active')}>
        Активные запросы ({activeRequests.length})
      </button>
      <button
        className={`tab-button ${activeTab === 'closed' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('closed')}>
        Закрытые запросы ({closedRequests.length})
      </button>
    </div>
  );
};

export default RequestTabs;