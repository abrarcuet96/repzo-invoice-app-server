interface IItem {
  userId?: string;
  itemId?: string;
  itemNo?: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: string;
}
export default IItem;
