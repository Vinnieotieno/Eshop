import Image from 'next/image';

// Define a TypeScript interface for Product
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: { image: string }[]; // Update images to be an array of objects
  reviews: Review[];
}

interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string; // Ensure this has a valid image or a default placeholder
    hashedPassword: string | null;
    createdAt: string;
    updatedAt: string;
    role: string;
  };
}

export const products: Product[] = [
  {
    id: "64a654593e91b8e73a351e9b",
    name: "iPhone 14",
    description: "Short description",
    price: 2999,
    brand: "Apple",
    category: "Phone",
    inStock: true,
    images: [{ image: "/images/airpods-max.png" }], // Converted to array of objects
    reviews: [],
  },
  {
    id: "64a4ebe300900d44bb50628a",
    name: "Logitech MX Keys Advanced Wireless Illuminated Keyboard",
    description:
      "PERFECT STROKE KEYS - Spherically-dished keys match the shape of your fingertips...",
    price: 102.99,
    brand: "Logitech",
    category: "Accessories",
    inStock: true,
    images: [{ image: "/images/apple-tv-4k-wifi.png" }],
    reviews: [
      {
        id: "64a65a6158b470c6e06959ee",
        userId: "6475af156bad4917456e6e1e",
        productId: "64a4ebe300900d44bb50628a",
        rating: 5,
        comment: "Good",
        createdDate: "2023-07-06T06:08:33.067Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image: " ", // Could provide a default image path
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
  {
    id: "648437b38c44d52b9542e340",
    name: "Apple iPhone 12, 64GB",
    description:
      "The product is refurbished, fully functional, and in excellent condition...",
    price: 40,
    brand: "Apple",
    category: "Phone",
    inStock: true,
    images: [{ image: "/images/apple-watch-series-9-aluminum.png" }],
    reviews: [
      {
        id: "6499b4887402b0efd394d8f3",
        userId: "6499b184b0e9a8c8709821d3",
        productId: "648437b38c44d52b9542e340",
        rating: 4,
        comment: "Good enough. I like the camera and casing. The delivery was fast too.",
        createdDate: "2023-06-26T15:53:44.483Z",
        user: {
          id: "6499b184b0e9a8c8709821d3",
          name: "Chaoo",
          email: "example1@gmail.com",
          emailVerified: null,
          image: " ",
          hashedPassword: null,
          createdAt: "2023-06-26T15:40:52.558Z",
          updatedAt: "2023-06-26T15:40:52.558Z",
          role: "USER",
        },
      },
      {
        id: "6499a110efe4e4de451c7edc",
        userId: "6475af156bad4917456e6e1e",
        productId: "648437b38c44d52b9542e340",
        rating: 5,
        comment: "I really liked it!!",
        createdDate: "2023-06-26T14:30:40.998Z",
        user: {
          id: "6475af156bad4917456e6e1e",
          name: "Charles",
          email: "example@gmail.com",
          emailVerified: null,
          image: " ",
          hashedPassword: null,
          createdAt: "2023-05-30T08:08:53.979Z",
          updatedAt: "2023-05-30T08:08:53.979Z",
          role: "ADMIN",
        },
      },
    ],
  },
  {
    id: "64a4e9e77e7299078334019f",
    name: "Logitech MX Master 2S Wireless Mouse",
    description:
      "Cross computer control: Game changing capacity to navigate seamlessly on 3 computers...",
    price: 70,
    brand: "Logitech",
    category: "Accessories",
    inStock: true,
    images: [{ image: "/images/15-inch-macbook-air-2tb-midnight.png" }],
    reviews: [],
  },
  {
    id: "649d775128b6744f0f497040",
    name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof',
    description:
      "Bluetooth Call and Message Reminder: The smart watch is equipped with HD speaker...",
    price: 50,
    brand: "Nerunsa",
    category: "Watch",
    inStock: true,
    images: [{ image: "/images/airpods-max.png" }],
    reviews: [],
  },
];
