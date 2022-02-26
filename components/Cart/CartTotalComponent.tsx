import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {List, Title, useTheme} from 'react-native-paper';

export interface CartTotalComponentProps {
  total: number;
}

const CartTotalComponent: React.FC<CartTotalComponentProps> = ({total}) => {
  const {colors} = useTheme();
  return (
    <List.Item
      title="Total"
      right={(props) => (
        <Title
          style={{
            ...styles.pricingText,
            color: colors.primary,
            borderColor: colors.primary,
          }}>
          {total.toFixed(2)}
        </Title>
      )}
    />
  );
};

export default CartTotalComponent;

const styles = StyleSheet.create({
  pricingText: {
    padding: Dimensions.get('screen').width * 0.03,
    borderWidth: 2,
  },
});
