import React, {useState} from 'react';
import {List, Text} from 'react-native-paper';
import {OrderModel} from '../../models/order. model';

export interface OrderItemComponentProps {
  order: OrderModel;
}

const OrderItemComponent: React.FC<OrderItemComponentProps> = ({order}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <List.Accordion
      expanded={visible}
      onPress={() => setVisible(!visible)}
      title={`Order booked on ${order.createdAt.toDateString()}`}>
      {order.orders.map((orderItem) => (
        <List.Item
          title={`${orderItem.product.title} x${orderItem.quantity}`}
          description={`Cost: Rs.${orderItem.product.cost}`}
          right={(props) => (
            <Text>Rs.{orderItem.quantity * orderItem.product.cost}</Text>
          )}
        />
      ))}
    </List.Accordion>
  );
};

export default OrderItemComponent;
