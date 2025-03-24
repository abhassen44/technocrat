import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart, CartItem } from "./CartContext";
import { Link } from "wouter";

// Animation variants
const drawerVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { 
      duration: 0.2,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2 }
  }
};

// Cart item component
const CartItemComponent = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity, item.variant);
    }
  };

  return (
    <motion.div 
      className="flex py-4"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <div className="w-20 h-20 rounded-md bg-muted flex items-center justify-center mr-4 overflow-hidden">
        <span className="text-xs text-muted-foreground">[Product Image]</span>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm">{item.title}</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => removeFromCart(item.id, item.variant)}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        
        {item.variant && (
          <p className="text-xs text-muted-foreground mb-2">Size: {item.variant}</p>
        )}
        
        <p className="text-sm font-medium mb-2">${item.price.toFixed(2)}</p>
        
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-md"
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-md"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <span className="ml-auto font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    getTotalItems, 
    getTotalPrice, 
    clearCart 
  } = useCart();
  
  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 75 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="sm:max-w-md p-0">
        <motion.div 
          className="h-full flex flex-col"
          variants={drawerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Your Cart ({totalItems})
              </SheetTitle>
           
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCartOpen(false)}
                  asChild
                >
                  <Link href="/merch">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                <div className="divide-y">
                  {cartItems.map(item => (
                    <CartItemComponent key={`${item.id}-${item.variant}`} item={item} />
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t px-6 pt-4 pb-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="pt-4 space-y-3">
                  <Button className="w-full h-12 bg-black text-white dark:bg-white dark:text-black font-medium rounded-full">
                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-muted-foreground"
                      onClick={clearCart}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
} 