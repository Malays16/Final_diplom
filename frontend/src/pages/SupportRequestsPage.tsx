import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatService } from '../services/chat/chatService';
import { SupportRequest } from '../types/chat';
import RequestList from '@/components/SupportRequests/RequestList';
import RequestTabs from '@/components/SupportRequests/RequestTabs';

const SupportRequestsPage: React.FC = () => {
  const [activeRequests, setActiveRequests] = useState<SupportRequest[]>([]);
  const [closedRequests, setClosedRequests] = useState<SupportRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);

        const active = await chatService.getEmployeeChats(true);
        const closed = await chatService.getEmployeeChats(false);
        setActiveRequests(active);
        setClosedRequests(closed);
      } catch (err) {
        console.error('Error fetching support requests:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [navigate]);

  const filterRequests = activeTab === 'active' ? activeRequests : closedRequests;

  const handleRequestClick = (requestId: string) => {
    navigate(`/support-chat/${requestId}`);
  };

  return (
    <div className="page">
      <div className="requests-page">
        <h1 className="page-title">Запросы в техподдержку</h1>
        <RequestTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeRequests={activeRequests}
          closedRequests={closedRequests}
        />
        <RequestList
          requests={filterRequests}
          activeTab={activeTab}
          handleRequestClick={handleRequestClick}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SupportRequestsPage;