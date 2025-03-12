export default function authHeader(): Record<string, string> {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  if (user?.access_token) {
    return { Authorization: 'Bearer ' + user.access_token };
  } else {
    return {};
  }
}