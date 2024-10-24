// Define types for the product, images, reviews, and users
type ProductImage = {
  color: string;
  colorCode: string;
  image: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string; // Ensure the image is a valid path or URL
  hashedPassword: string | null;
  createdAt: string;
  updatedAt: string;
  role: 'ADMIN' | 'USER';
};

type Review = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: User;
};

// Define the Product type with all its properties
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: ProductImage[];
  reviews: Review[];
};

// Correct product data
export const product: Product = {
  id: "648437b38c44d52b9542e340",
  name: "AirPods 12, 64GB",
  description:
    'The product is refurbished, fully functional, and in excellent condition. Backed by the 90-day E~Shop Renewed Guarantee.\n- This pre-owned product has been professionally inspected, tested and cleaned by Amazon qualified vendors. It is not certified by Apple.\n- This product is in "Excellent condition". The screen and body show no signs of cosmetic damage visible from 12 inches away.\n- This product will have a battery that exceeds 80% capacity relative to new.\n- Accessories may not be original, but will be compatible and fully functional. Product may come in generic box.\n- Product will come with a SIM removal tool, a charger and a charging cable. Headphone and SIM card are not included.\n- This product is eligible for a replacement or refund within 90-day of receipt if it does not work as expected.\n- Refurbished phones are not guaranteed to be waterproof.',
  price: 40,
  brand: "Apple",
  category: "Phone",
  inStock: true,
  images: [
    {
      color: "Black",
      colorCode: "#000000",
      image: "/images/airpods-max.png", // Assuming image now from public folder
    },
    {
      color: "Blue",
      colorCode: "#0000FF",
      image: "/images/apple-tv-4k-wifi.png", // Assuming image now from public folder
    },
    {
      color: "Red",
      colorCode: "#FF0000",
      image: "/images/apple-tv-4k-wifi.png", // Assuming image now from public folder
    },
  ],
  reviews: [
    {
      id: "6499b4887402b0efd394d8f3",
      userId: "6499b184b0e9a8c8709821d3",
      productId: "648437b38c44d52b9542e340",
      rating: 4,
      comment:
        "good enough. I like the camera and casing. the delivery was fast too.",
      createdDate: "2024-10-20T15:53:44.483Z",
      user: {
        id: "6499b184b0e9a8c8709821d3",
        name: "Chaoo",
        email: "example1@gmail.com",
        emailVerified: null,
        image: "/images/avatar.png", // Set a default avatar image if no user image is available
        hashedPassword: null,
        createdAt: "2024-10-20T15:40:52.558Z",
        updatedAt: "2024-10-20T15:40:52.558Z",
        role: "USER",
      },
    },
    {
      id: "6499a110efe4e4de451c7edc",
      userId: "6475af156bad4917456e6e1e",
      productId: "648437b38c44d52b9542e340",
      rating: 5,
      comment: "I really liked it!!",
      createdDate: "2024-10-20T14:30:40.998Z",
      user: {
        id: "6475af156bad4917456e6e1e",
        name: "Charles",
        email: "example@gmail.com",
        emailVerified: null,
        image: "/images/avatar.png", // Set a default avatar image if no user image is available
        hashedPassword: null,
        createdAt: "2024-10-20T08:08:53.979Z",
        updatedAt: "2024-10-20T08:08:53.979Z",
        role: "ADMIN",
      },
    },
  ],
};
