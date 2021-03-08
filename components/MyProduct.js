import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {List, useTheme} from 'react-native-paper';
import routes from './../constants/routes';
import * as ProductUtils from './../utils/products';

const MyProductComponent = ({
  id,
  title,
  description,
  cost,
  categories,
  imgLinks,
}) => {
  const navigation = useNavigation();
  const theme = useTheme();

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
          titleStyle={{color: theme.colors.primary}}
          title="Edit"
          left={(props) => (
            <List.Icon {...props} color={theme.colors.primary} icon="pen" />
          )}
          onPress={() => {
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
          titleStyle={{color: theme.colors.primary}}
          title="Delete"
          left={(props) => (
            <List.Icon
              {...props}
              color={theme.colors.primary}
              icon="trash-can"
            />
          )}
          onPress={async () => {
            await ProductUtils.deleteProduct(id);
          }}
        />
      </List.Accordion>
    </View>
  );
};

export default MyProductComponent;
