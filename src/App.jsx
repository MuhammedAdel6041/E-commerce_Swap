import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./context/CartContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
       <CartContextProvider>
         <RouterProvider router={routes} />
       </CartContextProvider>
     
    </QueryClientProvider>
  );
}

export default App;
