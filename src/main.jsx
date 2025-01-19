import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import './index.css'
import CartContextProvider from "./context/CartContext.jsx";
import WhisListContextProvider from "./context/WhisListContext.jsx";
// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <WhisListContextProvider>
  <CartContextProvider>
       <AuthProvider>
      <App />
    </AuthProvider>
     </CartContextProvider>
    </WhisListContextProvider>
   
   
  </QueryClientProvider>
);
