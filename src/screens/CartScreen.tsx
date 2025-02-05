import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {removeFromCart} from '../redux/slices/cartSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type CartNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

type Props = {
  navigation: CartNavigationProp;
};

const CartScreen: React.FC<Props> = ({navigation}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const renderItem = ({item}: any) => (
    <View>
      <View style={styles.itemContainer}>
        <Image source={{uri: item.image}} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>R {item.price.toFixed(2)}</Text>
          <View style={styles.itemActions}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => dispatch(removeFromCart(item.id))}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
            <View style={styles.quantityControl}>
              <TouchableOpacity style={styles.roundButton}>
                <Icon name="minus" size={18} color="#566546" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>1</Text>
              <TouchableOpacity style={styles.roundButton}>
                <Icon name="plus" size={18} color="#566546" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.itemDivider} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View>
          {/* Back Button Row */}
          <View style={styles.backButtonRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#566546" />
            </TouchableOpacity>
          </View>

          {/* Title Row */}
          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>Cart</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.headerDivider} />

        {/* Cart Items */}
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.cartList}
        />

        {/* Promo Code Input */}
        <View style={styles.promoContainer}>
          <TextInput
            placeholder="Add your promo code"
            style={styles.promoInput}
            placeholderTextColor="#566546"
          />
          <View style={styles.verticalDivider} />
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summaryBox}>
        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Sub total</Text>
            <Text style={[styles.summaryText, {fontSize: 16, fontWeight: 800}]}>
              R 289.00
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery</Text>
            <Text style={[styles.summaryText, {fontSize: 16, fontWeight: 800}]}>
              R 28.00
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>R 317.00</Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topSection: {
    backgroundColor: '#F9F9F7',
    paddingVertical: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEAE4',
  },
  backButtonRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titleRow: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
    fontFamily: 'Adobe Garamond Pro Bold',
    color: '#566546',
  },
  divider: {
    height: 1,
    backgroundColor: '#566546',
    marginVertical: 8,
  },
  headerDivider: {
    height: 15,
    backgroundColor: '#566546',
    marginHorizontal: 28,
  },
  cartList: {
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F7',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Adobe Garamond Pro',
    fontWeight: 400,
    fontStyle: 'italic',
    color: '#566546',
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Adobe Garamond Pro',
    fontWeight: 700,
    fontStyle: 'italic',
    color: '#566546',
    marginBottom: 8,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    borderWidth: 2,
    borderColor: '#566546',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  removeText: {
    fontSize: 14,
    fontFamily: 'Avenir',
    fontWeight: 400,
    color: '#566546',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#566546',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
    color: '#566546',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#566546',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#566546',
    borderRadius: 24,
    backgroundColor: '#F9F9F7',
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginVertical: 14,
    height: 40,
    shadowColor: '#54634B',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  promoInput: {
    flex: 1,
    fontSize: 12,
    color: '#3D3D3D',
    fontWeight: '400',
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#566546',
    marginHorizontal: 8,
  },
  promoButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#566546',
  },
  summaryBox: {
    marginTop: 16,
    paddingVertical: 16,
    backgroundColor: '#EBEAE4',
  },
  summaryContainer: {
    marginHorizontal: 16,
    // marginTop: 16,
    paddingVertical: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  summaryText: {
    fontFamily: 'Avenir',
    color: '#54634B',
    fontSize: 16,
  },
  totalText: {
    fontFamily: 'Adobe Garamond Pro Bold',
    fontSize: 20,
    color: '#54634B',
  },
  checkoutButton: {
    backgroundColor: '#566546',
    borderRadius: 24,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CartScreen;

//styleName: header/h1/bold;
// font-family: Adobe Garamond Pro;
// font-size: 40px;
// font-style: italic;
// font-weight: 700;
// line-height: 50px;
// text-align: left;
// text-underline-position: from-font;
// text-decoration-skip-ink: none;
