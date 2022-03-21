import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {Title} from 'react-native-paper';
import EmptyDataAnimation from '../../components/Lottie/EmptyDataAnimation';
import LoadingAnimation from '../../components/Lottie/LoadingAnimation';
import OrderItemComponent from '../../components/Order/OrderItemComponent';
import {Connectivity} from '../../enum/connectivity-error.enum';
import {OrderModel} from '../../models/order. model';
import ErrorAnimation from '../Lottie/ErrorAnimation';
import * as orderService from './../../services/order.service';

const OrderComponent: React.FC = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const loadOrders = (mounted: boolean) =>
    orderService
      .fetchOrders()
      .then((orders) => (mounted ? setOrders(orders) : null))
      .catch((error) => {
        if (error.message === Connectivity.OFFLINE.toString()) {
          setErrorMessage('You are offline');
        } else {
          console.log(error);
          setErrorMessage('Something went wrong, please try again later');
        }

        setError(true);
      })
      .finally(() => (mounted ? setLoading(false) : null));

  useEffect(() => {
    let mounted = true;

    loadOrders(mounted);

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return <ErrorAnimation message={errorMessage} />;
  }

  return (
    <View style={styles.rootView}>
      {loading ? (
        <LoadingAnimation message="Loading orders" />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => loadOrders(true)}
              refreshing={loading}
            />
          }
          centerContent={true}
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(order) => <OrderItemComponent order={order.item} />}
          ListEmptyComponent={
            <EmptyDataAnimation message="No orders present" />
          }
          ListHeaderComponent={<Title style={styles.titleText}>Orders</Title>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  titleText: {
    margin: Dimensions.get('screen').width * 0.04,
    fontSize: Dimensions.get('screen').height * 0.04,
  },
});

export default OrderComponent;
