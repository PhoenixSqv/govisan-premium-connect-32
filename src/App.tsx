import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./admin/layout/AdminLayout";
import DashboardPage from "./admin/pages/DashboardPage";
import LoginPage from "./admin/pages/LoginPage";
import HomePage from "./admin/pages/HomePage";
import SolutionsPage from "./admin/pages/SolutionsPage";
import ContentEditor from "./admin/components/ContentEditor";
import MediaLibraryPage from "./admin/pages/MediaLibraryPage";
import LinksAuditPage from "./admin/pages/LinksAuditPage";
import SettingsPage from "./admin/pages/SettingsPage";
import CasesPage from "./admin/pages/CasesPage";
import AboutPage from "./admin/pages/AboutPage";
import InsightsPage from "./admin/pages/InsightsPage";
import ContactPage from "./admin/pages/ContactPage";
import GovisanChatbot from "@/components/GovisanChatbot";
import BookingSystem from "@/components/BookingSystem";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLayout><DashboardPage /></AdminLayout>} />
            <Route path="/admin/home" element={<AdminLayout><HomePage /></AdminLayout>} />
            <Route path="/admin/solutions" element={<AdminLayout><SolutionsPage /></AdminLayout>} />
            <Route path="/admin/cases" element={<AdminLayout><CasesPage /></AdminLayout>} />
            <Route path="/admin/about" element={<AdminLayout><AboutPage /></AdminLayout>} />
            <Route path="/admin/insights" element={<AdminLayout><InsightsPage /></AdminLayout>} />
            <Route path="/admin/contact" element={<AdminLayout><ContactPage /></AdminLayout>} />
            <Route path="/admin/content" element={<AdminLayout><ContentEditor type="page" onSave={() => {}} /></AdminLayout>} />
            <Route path="/admin/media" element={<AdminLayout><MediaLibraryPage /></AdminLayout>} />
            <Route path="/admin/links-audit" element={<AdminLayout><LinksAuditPage /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><SettingsPage /></AdminLayout>} />
            <Route path="/admin/*" element={<AdminLayout><DashboardPage /></AdminLayout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
       import GovisanChatbot from "@/components/GovisanChatbot";
 import BookingSystem from "@/components/BookingSystem";

 const App = () => (
   <QueryClientProvider client={queryClient}>
     <TooltipProvider>
-        <BrowserRouter>
+        <BrowserRouter>
           <Routes>
             <Route path="/" element={<Index />} />
             {/* ...tus rutas admin y páginas... */}
             <Route path="*" element={<NotFound />} />
           </Routes>
         </BrowserRouter>
+
+        {/* COMPONENTES GLOBALES */}
+        <GovisanChatbot />
+        <BookingSystem />
     </TooltipProvider>
   </QueryClientProvider>
 );

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
