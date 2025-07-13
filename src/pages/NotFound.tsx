import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search, FileText, Users } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">404</span>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              Page introuvable
            </CardTitle>
            <p className="text-lg text-gray-600">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                URL demandée : <code className="bg-gray-100 px-2 py-1 rounded text-xs">{location.pathname}</code>
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="grid gap-3 md:grid-cols-2">
              <Button asChild className="w-full" variant="outline">
                <Link to="/" className="flex items-center justify-center gap-2">
                  <Home className="h-4 w-4" />
                  Accueil
                </Link>
              </Button>
              
              <Button asChild className="w-full" variant="outline">
                <Link to="/blog" className="flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  Actualités
                </Link>
              </Button>
              
              <Button asChild className="w-full" variant="outline">
                <Link to="/organigramme" className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  Organisation
                </Link>
              </Button>
              
              <Button asChild className="w-full" variant="outline">
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" />
                  Contact
                </Link>
              </Button>
            </div>

            {/* Back Button */}
            <div className="text-center pt-4 border-t">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 mx-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la page précédente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
