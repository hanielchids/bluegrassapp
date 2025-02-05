import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/slices/cartSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type ProductsListingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductsListing'
>;

type Props = {
  navigation: ProductsListingNavigationProp;
};

const categories = ['All', 'Beef', 'Fish', 'Pork', 'Poultry'];
const products = [
  {
    id: '1',
    name: 'Wagyu steak medallions',
    price: 289.9,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry2-0725.jpg',
    category: 'Beef',
  },
  {
    id: '2',
    name: 'Rump steak',
    price: 289.9,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry2-0628.jpg',
    category: 'Beef',
  },
  {
    id: '3',
    name: 'Wagyu steak medallions',
    price: 230.0,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry2-0649.jpg',
    category: 'Poultry',
  },
  {
    id: '4',
    name: 'Rump steak',
    price: 230.0,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry2-0393.jpg',
    category: 'Fish',
  },
  {
    id: '5',
    name: 'Wagyu steak medallions',
    price: 289.9,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry2-0218.jpg',
    category: 'Pork',
  },
  {
    id: '6',
    name: 'Rump steak',
    price: 289.9,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry1-6109.jpg',
    category: 'Pork',
  },
  {
    id: '7',
    name: 'Wagyu steak medallions',
    price: 289.9,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry2-0649.jpg',
    category: 'Poultry',
  },
  {
    id: '8',
    name: 'Rump steak',
    price: 289.9,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry2-0649.jpg',
    category: 'Beef',
  },
  {
    id: '9',
    name: 'Wagyu steak medallions',
    price: 289.9,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry2-0393.jpg',
    category: 'Fish',
  },
  {
    id: '10',
    name: 'Rump steak',
    price: 289.9,
    image: 'https://pantry.co.za/wp-content/uploads/2023/10/pantry2-0393.jpg',
    category: 'Pork',
  },
];

const ProductsListing: React.FC<Props> = ({navigation}) => {
  const [selectedCategories, setSelectedCategories] = useState(['All']);

  const toggleCategory = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
      return;
    }

    setSelectedCategories(prev => {
      let newSelection = prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category];

      if (newSelection.length === categories.length - 1) {
        return ['All'];
      }

      return newSelection.filter(cat => cat !== 'All');
    });
  };

  const filteredProducts = selectedCategories.includes('All')
    ? products
    : products.filter(product => selectedCategories.includes(product.category));

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.backButtonRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#566546" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => navigation.goBack()}>
            <Text style={styles.exploreText}>Filter</Text>
            <Ionicons name="options-outline" size={24} color="#566546" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>Meat</Text>
        </View>
      </View>

      <View style={styles.headerDivider} />

      <View style={styles.categories}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => toggleCategory(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(category) &&
                  styles.activeCategoryText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Based on your selection</Text>
      <Text style={styles.sectionSubtitle}>Our products</Text>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <Image source={{uri: item.image}} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.priceSection}>
              <Text style={styles.productPrice}>R {item.price}</Text>
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => dispatch(addToCart(item))}>
                <AntDesign name="shoppingcart" size={14} color="#566546" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.productGrid}
      />

      <View style={styles.bottomNav}>
        {[
          {name: 'storefront', Icon: MaterialIcon},
          {name: 'heart', Icon: FeatherIcon},
          {name: 'search', Icon: FeatherIcon},
          {name: 'shoppingcart', Icon: AntDesign},
          {name: 'user', Icon: SimpleIcon},
        ].map(({name, Icon}) => (
          <View key={name} style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{opacity: name === 'storefront' ? 1 : 0.4}}
              onPress={() =>
                name === 'shoppingcart' && navigation.navigate('Cart')
              }>
              <Icon name={name} size={24} color="#FAFAF8" />
            </TouchableOpacity>
            {name === 'storefront' && (
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#FAFAF8',
                  marginTop: 4,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9F5',
  },
  backButtonRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
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
  headerDivider: {
    height: 15,
    backgroundColor: '#566546',
    marginHorizontal: 28,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryText: {
    fontSize: 14,
    color: '#9A9A9A',
  },
  activeCategoryText: {
    color: '#566546',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Avenir',
    fontWeight: '400',
    color: '#54634B',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  exploreText: {
    fontFamily: 'Avenir',
    fontWeight: 400,
    fontSize: 14,
    color: '#54634B',
    marginHorizontal: 8,
  },
  sectionSubtitle: {
    fontSize: 30,
    fontFamily: 'Adobe Garamond Pro',
    fontWeight: '700',
    color: '#566546',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  productGrid: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingBottom: 80,
  },
  productCard: {
    flex: 1,
    margin: 6,
    borderRadius: 6,
    padding: 4,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 163,
    borderRadius: 6,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    color: '#54634B',
    textAlign: 'left',
    marginTop: 8,
    marginBottom: 3,
    opacity: 0.8,
  },
  priceSection: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '900',
    color: '#54634B',
  },
  cartButton: {
    width: 20,
    height: 20,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#566546',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#566546',
  },
});

export default ProductsListing;
