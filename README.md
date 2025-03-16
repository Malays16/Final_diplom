# Сервис по бронированию гостиниц

## Структура проекта

### Backend:

Проект содержит различные модули, каждый из которых отвечает за разные функции. Ниже представлено общее описание ключевых модулей и их API:

#### Auth (Авторизация)

- **auth.controller.ts**: Контроллер для управления авторизацией.
- Декораторы, гварды и стратегии для системы аутентификации с ролями и JWT.

#### Hotel API

- **hotel-api.controller.ts**: Управляет данными и операциями, связанными с гостиницами.

#### Hotel Room API

- **hotel-room-api-common.controller.ts**: Для общей работы с номерами гостиниц.
- **hotel-room-api-admin.controller.ts**: Управление номерами для администратора.

#### Reservation API

- **reservation-api-client.controller.ts**: Управление бронированием номеров для клиентов.
- **reservation-api-manager.controller.ts**: Управление бронированием номеров для менеджеров.

#### User API

- **user-api-admin.controller.ts**: Управление пользовательскими данными для администраторов.
- **user-api-manager.controller.ts**: Управление пользовательскими данными для менеджеров.

#### User Module

- **User Controller (`user.controller.ts`)**: Управляет конечными точками API, связанными с пользователями.
- **User Service (`user.service.ts`)**: Содержит бизнес-логику, связанную с управлением пользователями.

#### Reservation Module

- **Reservation Controller (`reservation.controller.ts`)**: Обрабатывает API вызовы, связанные с бронированиями.
- **Reservation Service (`reservation.service.ts`)**: Включает основную логику обработки бронирований.

#### Support Chat Module

- **Support Chat Controller (`chat.controller.ts`)**: Обрабатывает API вызовы, связанные с чатом тех поддержки.
- **Support Chat Services**:
- `chat.service.ts`: Управляет запросами чата тех поддержки.
- `chat.gateway.ts`: Обрабатывает соединения сокетов и события для чата тех поддержки.

#### Hotel Module

- **Hotel Controller and Service**: Осуществляют функции, связанные с гостиницами, такие как управление гостиницами и номерами через API.

### Frontend

#### Основные страницы приложения

- **`src/pages/AllHotels.tsx`**: Страница, на которой выводится список всех гостиниц.
- **`src/pages/HotelDetail.tsx`**: Страница с детальной информацией о выбранной гостинице.
- **`src/pages/HotelEdit.tsx`**: Страница для редактирования информации о гостинице.
- **`src/pages/HotelRoomEdit.tsx`**: Страница для редактирования информации о номерах гостиниц.
- **`src/pages/UsersPage.tsx`**: Страница для просмотра списка пользователей и управления ими.
- **`src/pages/UserReservations.tsx`**: Страница для просмотра бронирований пользователя.
- **`src/pages/SupportChatPage.tsx`**: Страница для общения менеджера с клиентом через чат поддержки.
- **`src/pages/SupportRequestsPage.tsx`**: Страница списка запросов в чат тех поддержки.
- **`src/components/Chat/ClientChat/ClientChat.tsx`**: Компонент чата клиента для общения с менеджером.

## Установка и запуск с использованием docker и docker-compose

```bash
$ docker-compose up --build
# После запуска проект будет доступен по адресу http://localhost

# Пересборка и перезапуск контейнеров
$ docker-compose down && docker-compose up --build
```

## Установка и запуск без использования docker

### Установка backend

```bash
$ cd backend
$ npm install
```

Если возникнут проблемы с установкой, использовать флаг `--legacy-peer-deps`

```bash
$ npm install --legacy-peer-deps
```

### Запуск бэкенд

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Установка frontend

```bash
$ cd ../frontend
$ npm install
```

### Запуск фронтенд

```bash
# development
$ npm run dev

# production mode
$ npm run build
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

### React + TypeScript + Vite

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh