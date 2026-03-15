import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";

actor {
  // Product Type and Category
  type Category = {
    #clothes;
    #sunglasses;
    #watches;
    #caps;
  };

  type Product = {
    name : Text;
    category : Category;
    price : Text;
    description : Text;
  };

  // Review Type
  type Review = {
    customerName : Text;
    reviewText : Text;
  };

  // Persistent Storage
  let productStore = Map.empty<Text, Product>();
  let reviewStore = Map.empty<Text, Review>();

  // Initialize with some products and reviews
  public shared ({ caller }) func initializeStore() : async () {
    let products : [(Text, Product)] = [
      (
        "Polo Shirt",
        {
          name = "Polo Shirt";
          category = #clothes;
          price = "$29.99";
          description = "High-quality cotton polo shirt, available in multiple colors.";
        },
      ),
      (
        "Aviator Sunglasses",
        {
          name = "Aviator Sunglasses";
          category = #sunglasses;
          price = "$49.99";
          description = "Classic aviator sunglasses with UV protection.";
        },
      ),
      (
        "Chronograph Watch",
        {
          name = "Chronograph Watch";
          category = #watches;
          price = "$199.99";
          description = "Stylish chronograph with leather strap.";
        },
      ),
      (
        "Baseball Cap",
        {
          name = "Baseball Cap";
          category = #caps;
          price = "$19.99";
          description = "Adjustable fit baseball cap with logo.";
        },
      ),
    ];

    let reviews : [(Text, Review)] = [
      (
        "JohnDoeReview",
        {
          customerName = "John Doe";
          reviewText = "Great quality products and fast shipping!";
        },
      ),
      (
        "JaneSmithReview",
        {
          customerName = "Jane Smith";
          reviewText = "Loved the sunglasses, perfect fit.";
        },
      ),
    ];

    products.forEach(func((key, value)) { productStore.add(key, value) });
    reviews.forEach(func((key, value)) { reviewStore.add(key, value) });
  };

  // Get all products
  public query ({ caller }) func getAllProducts() : async [Product] {
    productStore.values().toArray();
  };

  // Get products by category
  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    productStore.values().toArray().filter(
      func(product) {
        product.category == category;
      }
    );
  };

  // Get all reviews
  public query ({ caller }) func getAllReviews() : async [Review] {
    reviewStore.values().toArray();
  };
};
