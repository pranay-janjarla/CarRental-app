import { db } from "./firebase";
import { doc, setDoc, collection } from "firebase/firestore";

export async function addCityWithProperties() {
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
          features: [
            "Manual Transmission",
            "Bluetooth Connectivity",
            "Sunroof",
          ],
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
          features: [
            "Manual Transmission",
            "Bluetooth Connectivity",
            "Sunroof",
          ],
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

  for (const city of data) {
    const cityRef = doc(db, "cities", city.place);

    // Add city data
    await setDoc(cityRef, {
      place: city.place,
      placeImage: city.placeImage,
      shortDescription: city.shortDescription,
    });

    // Reference to the properties sub-collection
    const propertiesRef = collection(cityRef, "properties");

    for (const property of city.properties) {
      const propertyRef = doc(propertiesRef, property.name);

      // Add property data
      await setDoc(propertyRef, {
        name: property.name,
        image: property.image,
        milage: property.milage,
        oldprice: property.oldprice,
        newPrice: property.newPrice,
        colors: property.colors,
        features: property.features,
      });

      // Reference to the ratings subcollection under the current property
      const ratingsRef = collection(propertyRef, "ratings");

      for (const rating of property.ratings) {
        await setDoc(doc(ratingsRef), {
          user: rating.user,
          comment: rating.comment,
          rating: rating.rating,
        });
      }
    }
  }
}
