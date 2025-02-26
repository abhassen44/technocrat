import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Arduino Starter Kit T-Shirt",
    price: 24.99,
    description: "Comfortable cotton t-shirt with Arduino circuit design",
    image: "https://placehold.co/300x400",
    category: "Apparel"
  },
  {
    id: 2,
    name: "Circuit Board Sticker Pack",
    price: 9.99,
    description: "Set of 5 high-quality vinyl stickers",
    image: "https://placehold.co/300x400",
    category: "Stickers"
  },
  {
    id: 3,
    name: "Raspberry Pi Hoodie",
    price: 39.99,
    description: "Warm hoodie with Raspberry Pi logo",
    image: "https://placehold.co/300x400",
    category: "Apparel"
  },
  {
    id: 4,
    name: "Electronics Engineer Mug",
    price: 14.99,
    description: "Ceramic mug with circuit diagram",
    image: "https://placehold.co/300x400",
    category: "Accessories"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export default function Merch() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="container py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Merch Store
      </motion.h1>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            layoutId={`product-${product.id}`}
          >
            <Card className="h-full overflow-hidden">
              <div className="aspect-square overflow-hidden bg-muted">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{product.name}</span>
                  <span className="text-lg font-normal">${product.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
