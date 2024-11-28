export default interface INotification {
  // id: string;
  userId?: string;
  type: string;
  message: string;
  date: string;
  isRead: boolean;
}
