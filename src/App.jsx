import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./context/CartContext";
import WhisListContextProvider from "./context/WhisListContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WhisListContextProvider>
        
        <CartContextProvider>
          <RouterProvider router={routes} />
        </CartContextProvider>
      </WhisListContextProvider>
    </QueryClientProvider>
  );
}

export default App;
