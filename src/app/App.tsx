import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
       <div className="bg-red-500 text-white p-6 text-2xl">Tailwind ishladi</div>
    </>
  );
}
