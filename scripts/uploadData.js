import { firestore } from "./firebaseConfig";

const data = [
  {
    id: "0",
    place: "Banglore",
    placeImage: "https://dummyimage.com/300x200/000/fff",
    shortDescription: "City in Karnataka, India",
    properties: [
      {
        id: "10",
        name: "Baleno",
        image: "https://picsum.photos/200",
        milage: "22.5 kmpl",
        oldprice: 4600,
        newPrice: 3100,
        colors: [{ color1: "Red" }, { color2: "Blue" }, { color3: "Green" }],
        features: [
          "Air Conditioning",
          "Automatic Transmission",
          "GPS Navigation",
        ],
        ratings: [
          { user: "John Doe", comment: "Great car!", rating: 4.5 },
          {
            user: "Jane Smith",
            comment: "Comfortable and smooth ride.",
            rating: 4.7,
          },
        ],
      },
      {
        id: "9",
        name: "Swift",
        image: "https://picsum.photos/200",
        milage: "20.5 kmpl",
        oldprice: 2600,
        newPrice: 1100,
        colors: [{ color1: "Red" }, { color2: "Blue" }, { color3: "Green" }],
        features: ["Manual Transmission", "Bluetooth Connectivity", "Sunroof"],
        ratings: [
          {
            user: "Alice Brown",
            comment: "Good value for money.",
            rating: 4.2,
          },
          { user: "Bob White", comment: "A decent car.", rating: 4.0 },
        ],
      },
    ],
  },
  {
    id: "1",
    place: "Hyderabad",
    placeImage: "https://dummyimage.com/300x200/000/fff",
    shortDescription: "City in Karnataka, India",
    properties: [
      {
        id: "8",
        name: "Baleno",
        image: "https://picsum.photos/200",
        milage: "22.5 kmpl",
        oldprice: 4600,
        newPrice: 3100,
        colors: [{ color1: "Red" }, { color2: "Blue" }, { color3: "Green" }],
        features: [
          "Air Conditioning",
          "Automatic Transmission",
          "GPS Navigation",
        ],
        ratings: [
          { user: "John Doe", comment: "Great car!", rating: 4.5 },
          {
            user: "Jane Smith",
            comment: "Comfortable and smooth ride.",
            rating: 4.7,
          },
        ],
      },
      {
        id: "7",
        name: "Swift",
        image: "https://picsum.photos/200",
        milage: "20.5 kmpl",
        oldprice: 2600,
        newPrice: 1100,
        colors: [{ color1: "Red" }, { color2: "Blue" }, { color3: "Green" }],
        features: ["Manual Transmission", "Bluetooth Connectivity", "Sunroof"],
        ratings: [
          {
            user: "Alice Brown",
            comment: "Good value for money.",
            rating: 4.2,
          },
          { user: "Bob White", comment: "A decent car.", rating: 4.0 },
        ],
      },
    ],
  },
];

// Function to save data
const uploadData = async () => {
  const batch = firestore.batch();

  data.forEach((city) => {
    const cityRef = firestore.collection("cities").doc(city.id);
    batch.set(cityRef, {
      place: city.place,
      placeImage: city.placeImage,
      shortDescription: city.shortDescription,
    });

    city.properties.forEach((property) => {
      const propertyRef = cityRef.collection("properties").doc(property.id);
      batch.set(propertyRef, {
        name: property.name,
        image: property.image,
        milage: property.milage,
        oldprice: property.oldprice,
        newPrice: property.newPrice,
        colors: property.colors,
        features: property.features,
      });

      property.ratings.forEach((rating, index) => {
        const ratingRef = propertyRef
          .collection("ratings")
          .doc(`rating${index}`);
        batch.set(ratingRef, rating);
      });
    });
  });

  try {
    await batch.commit();
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data: ", error);
  }
};

// Call saveData function to upload data
uploadData();
