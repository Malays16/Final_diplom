import { SupportRequest } from '@/types/chat';
import React from 'react';
import './RequestList.scss';
import { formatDateTime } from '@/utils/dateUtils';

interface RequestListProps {
  requests: SupportRequest[];
  activeTab: string;
  handleRequestClick: (requestId: string) => void;
  isLoading: boolean;
}

const RequestList: React.FC<RequestListProps> = ({
  requests,
  activeTab,
  handleRequestClick,
  isLoading
}) => {
  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="no-requests">
        {activeTab === 'active'
          ? 'Нет активных запросов в техподдержку'
          : 'Нет закрытых запросов в техподдержку'}
      </div>
    );
  }

  return (
    <ul className="request-list">
      {requests.map(request => (
        <li
          key={request._id}
          className="request-item"
          onClick={() => handleRequestClick(request._id)}>
          <div className="request-info">
            <span className="request-id">Запрос #{request._id}</span>
            <span className="request-date">Создан: {formatDateTime(request.createdAt)}</span>
          </div>
          <div className="request-messages">Сообщений: {request.messages.length}</div>
        </li>
      ))}
    </ul>
  );
};

export default RequestList;