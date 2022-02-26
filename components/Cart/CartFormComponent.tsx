import {useFormik} from 'formik';
import React from 'react';
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  Surface,
  TextInput,
} from 'react-native-paper';
import * as yup from 'yup';

export interface CardFormComponentProps {
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  onSubmit: (quantity: number) => Promise<void>;
}

const CartFormComponent: React.FC<CardFormComponentProps> = ({
  isOpen,
  onClose,
  quantity = 1,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      quantity: quantity,
    },
    validationSchema: yup.object().shape({
      quantity: yup.number().min(1).max(10).required(),
    }),
    onSubmit: async (values: {quantity: number}) => {
      await onSubmit(values.quantity);
    },
  });

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={onClose} dismissable>
        <Surface>
          <Dialog.Title>Add To Cart</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Quantity"
              value={formik.values.quantity.toString()}
              onChangeText={formik.handleChange('quantity')}
              onBlur={() => formik.setFieldTouched('quantity')}
              autoCapitalize="none"
              keyboardType="default"
            />
            <HelperText
              type="error"
              visible={
                formik.touched.quantity &&
                (formik.errors.quantity ? true : false)
              }>
              {formik.errors.quantity}
            </HelperText>
            <Button mode="contained" icon="plus" onPress={formik.handleSubmit}>
              Add To Cart
            </Button>
          </Dialog.Content>
        </Surface>
      </Dialog>
    </Portal>
  );
};

export default CartFormComponent;
