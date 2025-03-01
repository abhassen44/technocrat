import { motion } from "framer-motion";
import MerchLogo from "@/components/ui/MerchLogo";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    } 
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

// Mock merchandise data
const merchItems = [
  {
    id: 1,
    title: "Circuit Board T-Shirt",
    description: "100% cotton t-shirt with a stylish circuit board pattern design.",
    price: 24.99,
    image: "/merch/tshirt.jpg"
  },
  {
    id: 2,
    title: "Arduino Starter Kit",
    description: "Complete starter kit with Arduino Uno, breadboard, components, and tutorial guide.",
    price: 49.99,
    image: "/merch/arduino-kit.jpg"
  },
  {
    id: 3,
    title: "Tech Enthusiast Hoodie",
    description: "Comfortable hoodie with embroidered tech design and kangaroo pocket.",
    price: 39.99,
    image: "/merch/hoodie.jpg"
  },
  {
    id: 4,
    title: "Raspberry Pi 4 Kit",
    description: "Raspberry Pi 4 with case, power supply, and pre-loaded SD card.",
    price: 69.99,
    image: "/merch/raspberry-pi.jpg"
  },
  {
    id: 5,
    title: "Electronics Lab Notebook",
    description: "Graph paper notebook perfect for circuit sketches and project notes.",
    price: 12.99,
    image: "/merch/notebook.jpg"
  },
  {
    id: 6,
    title: "Tech Sticker Pack",
    description: "Pack of 10 high-quality vinyl stickers featuring tech and programming themes.",
    price: 9.99,
    image: "/merch/stickers.jpg"
  }
];

export default function Merch() {
  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Hero Section with MerchLogo */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <MerchLogo width={220} height={70} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tech Merch Store</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Show your tech passion with our high-quality merchandise featuring electronics-inspired designs.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {merchItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-muted overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400 text-sm">[Product Image: {item.title}]</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
