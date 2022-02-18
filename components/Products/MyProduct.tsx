import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {
  Button,
  Dialog,
  List,
  Paragraph,
  Portal,
  useTheme,
} from 'react-native-paper';
import {MyProductsNavigatorType} from '../../types/my-products-navigator.type';
import {ProductModel} from '../../models/product.model';
import * as productService from './../../services/products.service';
import {DeleteProductDto} from '../../dtos/products/delete-product.dto';
import {useIsConnected} from 'react-native-offline';

type Props = {
  product: ProductModel;
};

/**
 * Component responsible for displaying singular user products
 * and let them interact with them with operations like updating and deleting.
 * @param product Product model with data.
 */
const MyProductComponent: React.FC<Props> = ({product}) => {
  const isConnected = useIsConnected();
  // Navigation Hook
  const navigation = useNavigation<MyProductsNavigatorType>();

  // Theme config hook
  const theme = useTheme();

  // State hook for setting the visibility of the modal
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <List.Accordion
        title={product.title}
        left={(props) => <List.Icon {...props} icon="cart" />}>
        <List.Item
          title="Title"
          description={product.title}
          left={(props) => <List.Icon {...props} icon="format-title" />}
        />
        <List.Item
          title="Description"
          description={product.description}
          left={(props) => <List.Icon {...props} icon="card-text" />}
        />
        <List.Item
          title="Price"
          description={product.cost}
          left={(props) => <List.Icon {...props} icon="currency-usd" />}
        />
        <List.Item
          titleStyle={{color: theme.colors.primary}}
          title="Edit"
          left={(props) => (
            <List.Icon {...props} color={theme.colors.primary} icon="pen" />
          )}
          onPress={
            isConnected
              ? () => {
                  // Navigate to the Product Form page with values filled in
                  // for this specific product.
                  navigation.navigate('ProductForm', {
                    product: product,
                    edit: true,
                  });
                }
              : () => {}
          }
        />
        <List.Item
          titleStyle={{color: theme.colors.primary}}
          title="Delete"
          left={(props) => (
            <List.Icon
              {...props}
              color={theme.colors.primary}
              icon="trash-can"
            />
          )}
          onPress={isConnected ? () => setVisible(true) : () => {}}
        />
      </List.Accordion>
      <Portal>
        <Dialog
          visible={visible}
          dismissable
          onDismiss={() => setVisible(false)}>
          <Dialog.Title>Delete Confirmation</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to delete your product with name{' '}
              {product.title} ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={async () => {
                const deleteProductDto = new DeleteProductDto();
                deleteProductDto.id = product.id;

                await productService.deleteProduct(deleteProductDto);
                setVisible(false);
              }}>
              Yes
            </Button>
            <Button onPress={() => setVisible(false)}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default MyProductComponent;
