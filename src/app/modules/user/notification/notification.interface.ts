export default interface INotification {
  userId?: string;
  type: string;
  message: string;
  date: string;
  isRead: boolean;
}
