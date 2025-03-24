import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Star, 
  Tag, 
  Plus, 
  Minus, 
  Share,
  Heart,
  Truck,
  ShieldCheck,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/components/shop/CartContext";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.4,
      staggerChildren: 0.1,
    } 
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
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

// Mock merchandise data - in a real app, this would come from an API
const merchItems = [
  {
    id: 1,
    title: "Circuit Board T-Shirt",
    description: "100% cotton t-shirt with a stylish circuit board pattern design.",
    longDescription: "This premium quality t-shirt features an intricate circuit board design that showcases your passion for electronics and technology. Made from 100% organic cotton, it's comfortable for all-day wear and machine washable. The circuit traces glow slightly in the dark for an extra cool effect.",
    price: 24.99,
    image: "/merch/tshirt.jpg",
    featured: true,
    category: "Clothing",
    tags: ["T-Shirt", "Cotton", "Unisex"],
    variants: ["S", "M", "L", "XL", "XXL"],
    stock: 28,
    ratings: { average: 4.7, count: 42 },
    specifications: [
      { name: "Material", value: "100% Organic Cotton" },
      { name: "Care", value: "Machine Wash Cold" },
      { name: "Fit", value: "Regular Fit" },
      { name: "Print", value: "Screen Print" }
    ],
    relatedProducts: [3, 6]
  },
  {
    id: 2,
    title: "Arduino Starter Kit",
    description: "Complete starter kit with Arduino Uno, breadboard, components, and tutorial guide.",
    longDescription: "Begin your electronics journey with our comprehensive Arduino Starter Kit. Perfect for beginners, this kit contains everything you need to start building your own electronic projects. The included step-by-step guide walks you through 15 projects with increasing complexity, from blinking LEDs to creating interactive sensors.",
    price: 49.99,
    image: "/merch/arduino-kit.jpg",
    featured: false,
    category: "Electronics",
    tags: ["Arduino", "DIY", "Educational"],
    stock: 15,
    ratings: { average: 4.9, count: 87 },
    specifications: [
      { name: "Includes", value: "Arduino Uno, Breadboard, Jumper Wires, Resistors, LEDs, Sensors" },
      { name: "Difficulty", value: "Beginner to Intermediate" },
      { name: "Projects", value: "15+ Projects Included" },
      { name: "Power", value: "USB Powered (Cable Included)" }
    ],
    relatedProducts: [4, 5]
  },
  {
    id: 3,
    title: "Tech Enthusiast Hoodie",
    description: "Comfortable hoodie with embroidered tech design and kangaroo pocket.",
    longDescription: "Stay warm while showing off your tech passion with our premium Tech Enthusiast Hoodie. The embroidered circuit design on the back creates a subtle yet distinctive look. With a warm fleece lining, adjustable drawstring hood, and convenient kangaroo pocket, it's perfect for cooler days in the lab or office.",
    price: 39.99,
    image: "/merch/hoodie.jpg",
    featured: true,
    category: "Clothing",
    tags: ["Hoodie", "Cotton", "Unisex"],
    variants: ["S", "M", "L", "XL", "XXL"],
    stock: 22,
    ratings: { average: 4.5, count: 34 },
    specifications: [
      { name: "Material", value: "80% Cotton, 20% Polyester" },
      { name: "Care", value: "Machine Wash Cold" },
      { name: "Features", value: "Kangaroo Pocket, Adjustable Hood" },
      { name: "Design", value: "Embroidered Circuit Pattern" }
    ],
    relatedProducts: [1, 6]
  },
  {
    id: 4,
    title: "Raspberry Pi 4 Kit",
    description: "Raspberry Pi 4 with case, power supply, and pre-loaded SD card.",
    longDescription: "Our Raspberry Pi 4 Kit is the perfect way to get started with this powerful single-board computer. The kit includes the latest Raspberry Pi 4 (4GB RAM), a protective case with built-in cooling, official power supply, and 32GB SD card pre-loaded with Raspberry Pi OS. Whether you're building a media center, learning programming, or creating IoT devices, this kit provides everything you need.",
    price: 69.99,
    image: "/merch/raspberry-pi.jpg",
    featured: false,
    category: "Electronics",
    tags: ["Raspberry Pi", "DIY", "Starter Kit"],
    stock: 8,
    ratings: { average: 4.8, count: 56 },
    specifications: [
      { name: "Model", value: "Raspberry Pi 4 Model B (4GB RAM)" },
      { name: "Includes", value: "Case, Power Supply, 32GB SD Card, Heat Sinks" },
      { name: "OS", value: "Pre-loaded Raspberry Pi OS" },
      { name: "Connectivity", value: "WiFi, Bluetooth, Ethernet, USB 3.0" }
    ],
    relatedProducts: [2, 5]
  },
  {
    id: 5,
    title: "Electronics Lab Notebook",
    description: "Graph paper notebook perfect for circuit sketches and project notes.",
    longDescription: "Document your electronic projects and circuit designs with our specialized Electronics Lab Notebook. Featuring high-quality graph paper with 5mm grid spacing, this durable hardcover notebook includes 120 pages of acid-free paper. The special binding allows the notebook to lay flat while you work, and the built-in component reference guides and conversion tables make it an essential tool for any electronics enthusiast.",
    price: 12.99,
    image: "/merch/notebook.jpg",
    featured: false,
    category: "Accessories",
    tags: ["Notebook", "Stationery", "Graph Paper"],
    stock: 45,
    ratings: { average: 4.3, count: 28 },
    specifications: [
      { name: "Pages", value: "120 Pages (5mm Grid)" },
      { name: "Size", value: "8.5\" x 11\"" },
      { name: "Binding", value: "Lay-flat Hardcover Binding" },
      { name: "Features", value: "Component Reference Guides, Conversion Tables" }
    ],
    relatedProducts: [2, 6]
  },
  {
    id: 6,
    title: "Tech Sticker Pack",
    description: "Pack of 10 high-quality vinyl stickers featuring tech and programming themes.",
    longDescription: "Personalize your laptop, notebook, or water bottle with our collection of 10 high-quality vinyl stickers. Each sticker features unique tech and programming themed designs created by our in-house artists. Made from durable, waterproof vinyl with UV protection to prevent fading, these stickers are perfect for showcasing your tech interests wherever you go.",
    price: 9.99,
    image: "/merch/stickers.jpg",
    featured: false,
    category: "Accessories",
    tags: ["Stickers", "Vinyl", "Laptop"],
    stock: 72,
    ratings: { average: 4.6, count: 95 },
    specifications: [
      { name: "Quantity", value: "10 Unique Designs" },
      { name: "Material", value: "Waterproof Vinyl with UV Protection" },
      { name: "Size", value: "Varies (2-3 inches)" },
      { name: "Adhesive", value: "Removable, Residue-free" }
    ],
    relatedProducts: [1, 5]
  }
];

// Type definitions
interface Product {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  image: string;
  featured: boolean;
  category: string;
  tags?: string[];
  variants?: string[];
  stock?: number;
  ratings?: { average: number; count: number };
  specifications?: { name: string; value: string }[];
  relatedProducts?: number[];
}

// Category color mapping
const categoryColors: Record<string, { bg: string, text: string, hover: string, border: string }> = {
  "Clothing": { 
    bg: "bg-blue-100", 
    text: "text-blue-700", 
    hover: "hover:bg-blue-200", 
    border: "border-blue-300" 
  },
  "Electronics": { 
    bg: "bg-emerald-100", 
    text: "text-emerald-700", 
    hover: "hover:bg-emerald-200", 
    border: "border-emerald-300" 
  },
  "Accessories": { 
    bg: "bg-amber-100", 
    text: "text-amber-700", 
    hover: "hover:bg-amber-200", 
    border: "border-amber-300" 
  },
  "default": { 
    bg: "bg-gray-100", 
    text: "text-gray-700", 
    hover: "hover:bg-gray-200", 
    border: "border-gray-300" 
  }
};

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id ? parseInt(params.id) : null;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // In a real app, this would be an API call
    if (productId) {
      const foundProduct = merchItems.find(item => item.id === productId) || null;
      setProduct(foundProduct);
      
      if (foundProduct?.variants?.length) {
        setSelectedVariant(foundProduct.variants[0]);
      }
      
      // Get related products
      if (foundProduct?.relatedProducts?.length) {
        const related = merchItems.filter(item => 
          foundProduct.relatedProducts?.includes(item.id)
        );
        setRelatedProducts(related);
      }
    }
  }, [productId]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        variant: selectedVariant || undefined
      });
    }
  };

  // If product not found
  if (!product) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/merch">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const categoryColor = categoryColors[product.category] || categoryColors.default;

  return (
    <motion.div
      className="container max-w-6xl mx-auto px-4 py-12"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/merch">
          <Button variant="ghost" size="sm" className="pl-0 flex items-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Product Image */}
        <motion.div 
          className="relative rounded-lg overflow-hidden bg-gradient-to-br from-background/80 to-background shadow-lg border-[0.5px] border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-square w-full flex items-center justify-center bg-gradient-to-br from-purple-500/5 to-blue-500/10">
            <span className="text-gray-400 text-sm">[Product Image: {product.title}]</span>
          </div>
          {product.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs px-3 py-1 rounded-full flex items-center">
              <Star className="w-3 h-3 mr-1 fill-black" /> Featured
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          variants={itemVariants}
        >
          <div className="flex items-center mb-2">
            <Badge className={`${categoryColor.bg} ${categoryColor.text} border border-white/10`}>
              {product.category}
            </Badge>
            {product.stock && product.stock < 10 && (
              <Badge variant="outline" className="ml-2 text-red-400 border-red-500/30">
                Low Stock: {product.stock} left
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">{product.title}</h1>
          
          {product.ratings && (
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.ratings?.average || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`} 
                  />
                ))}
              </div>
              <span className="text-sm ml-2 text-blue-300/80">
                {product.ratings.average} ({product.ratings.count} reviews)
              </span>
            </div>
          )}
          
          <p className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500" style={{ textShadow: "0 0 15px rgba(16, 185, 129, 0.2)" }}>
            ₹{(product.price * 83).toFixed(0)}
          </p>
          
          <p className="text-blue-100/80 mb-6">{product.description}</p>
          
          {/* Variants */}
          {product.variants && (
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-white/90">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(variant => (
                  <Button
                    key={variant}
                    variant={selectedVariant === variant ? "default" : "outline"}
                    className={`px-4 py-2 rounded-md ${
                      selectedVariant === variant 
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 border-0' 
                        : 'border border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-2 text-white/90">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="border border-white/10 bg-white/5 hover:bg-white/10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (product.stock || 10)}
                className="border border-white/10 bg-white/5 hover:bg-white/10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button 
              className="flex-1 font-medium rounded-full h-12 relative overflow-hidden group"
              onClick={handleAddToCart}
              style={{
                background: "linear-gradient(to right, rgb(126, 34, 206), rgb(79, 70, 229))"
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 z-0"
                whileHover={{ 
                  x: "100%",
                  opacity: 0
                }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 z-0 opacity-0"
                whileHover={{ 
                  x: "0%",
                  opacity: 1
                }}
                transition={{ duration: 0.5 }}
              />
              <motion.span className="relative z-10 flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </motion.span>
            </Button>
            <Button 
              variant="outline" 
              className="sm:w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              className="sm:w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Shipping Info */}
          <div className="bg-white/5 p-4 rounded-lg border border-white/10 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <Truck className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Free shipping on orders over ₹6,000</span>
            </div>
            <div className="flex items-center mb-2">
              <ShieldCheck className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Secure payment & 30-day returns</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Ships within 1-2 business days</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="mb-6 bg-white/5 border border-white/10">
          <TabsTrigger value="description">Description</TabsTrigger>
          {product.specifications && (
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          )}
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="text-blue-100/80 leading-relaxed">
          <p>{product.longDescription || product.description}</p>
        </TabsContent>
        
        {product.specifications && (
          <TabsContent value="specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, index) => (
                <div key={index} className="py-2 border-b border-white/10">
                  <span className="font-medium">{spec.name}: </span>
                  <span className="text-blue-100/80">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="shipping" className="text-blue-100/80 leading-relaxed">
          <h3 className="text-foreground font-bold mb-2">Shipping</h3>
          <p className="mb-4">
            We ship to all over India. Orders are processed and shipped within 1-2 business days. 
            Delivery typically takes 3-5 business days depending on location. Free shipping is available on orders over ₹6,000.
          </p>
          
          <h3 className="text-foreground font-bold mb-2">Returns</h3>
          <p>
            We offer a 30-day return policy. If you're not completely satisfied with your purchase, you can return it within 
            30 days of delivery for a full refund or exchange. Items must be unused and in their original packaging.
          </p>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <motion.div
                key={relatedProduct.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                variants={itemVariants}
              >
                <Link href={`/product/${relatedProduct.id}`}>
                  <div className="border border-white/10 rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-sm">
                    <div className="h-40 bg-gradient-to-br from-purple-500/5 to-blue-500/10 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">[Product Image: {relatedProduct.title}]</span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-medium mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">{relatedProduct.title}</h3>
                      <p className="text-blue-100/70 text-sm mb-auto">
                        {relatedProduct.description.length > 60 
                          ? `${relatedProduct.description.substring(0, 60)}...` 
                          : relatedProduct.description}
                      </p>
                      <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mt-2">₹{(relatedProduct.price * 83).toFixed(0)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
} 