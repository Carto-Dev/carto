import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import {
  Button,
  Dialog,
  List,
  Paragraph,
  Portal,
  useTheme,
} from 'react-native-paper';
import routes from '../../constants/routes';
import * as ProductUtils from '../../utils/products';

/**
 * Component responsible for displaying singular user products
 * and let them interact with them with operations like updating and deleting.
 * @param id ID for the product.
 * @param title Title for the product.
 * @param description Description for the product.
 * @param cost Cost of the product.
 * @param categories Categories the product belongs to.
 * @param imgLinks Links of images of the product.
 */
const MyProductComponent = ({
  id,
  title,
  description,
  cost,
  categories,
  imgLinks,
}) => {

  // Navigation Hook
  const navigation = useNavigation();

  // Theme config hook
  const theme = useTheme();

  // State hook for setting the visibility of the modal
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <List.Accordion
        title={title}
        left={(props) => <List.Icon {...props} icon="cart" />}>
        <List.Item
          title="Title"
          description={title}
          left={(props) => <List.Icon {...props} icon="format-title" />}
        />
        <List.Item
          title="Description"
          description={description}
          left={(props) => <List.Icon {...props} icon="card-text" />}
        />
        <List.Item
          title="Price"
          description={cost}
          left={(props) => <List.Icon {...props} icon="currency-usd" />}
        />
        <List.Item
          titleStyle={{ color: theme.colors.primary }}
          title="Edit"
          left={(props) => (
            <List.Icon {...props} color={theme.colors.primary} icon="pen" />
          )}
          onPress={() => {

            // Navigate to the Product Form page with values filled in
            // for this specific product.
            navigation.navigate(routes.pages.product_form_page, {
              action: 'edit',
              data: {
                id: id,
                title: title,
                description: description,
                cost: cost,
                categories: categories,
                imageUris: imgLinks,
              },
            });
          }}
        />
        <List.Item
          titleStyle={{ color: theme.colors.primary }}
          title="Delete"
          left={(props) => (
            <List.Icon
              {...props}
              color={theme.colors.primary}
              icon="trash-can"
            />
          )}
          onPress={() => setVisible(true)}
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
              Are you sure you want to delete your product with name {title} ?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={async () => {
                await ProductUtils.deleteProduct(id);
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
