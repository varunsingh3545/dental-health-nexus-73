import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/ContactForm';

const Index = () => {
  const { user, signOut } = useAuth();

  const services = [
    {
      title: "Prévention",
      description: "Conseils et actions de prévention bucco-dentaire",
      path: "/prevention"
    },
    {
      title: "Formation",
      description: "Formations et sensibilisation à la santé bucco-dentaire",
      path: "/formation"
    },
    {
      title: "Interventions",
      description: "Interventions en milieu scolaire et professionnel",
      path: "/interventions"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">UFSBD 34</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/blog">Actualités</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/contact">Contact</Link>
            </Button>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Bonjour {user.email}</span>
                <Button variant="outline" onClick={signOut}>
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link to="/auth">Connexion</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Union Française pour la Santé Bucco-Dentaire
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Section Hérault - Œuvrer pour une meilleure santé bucco-dentaire pour tous
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/blog">Nos actualités</Link>
            </Button>
            <ContactForm 
              isModal 
              trigger={<Button variant="outline" size="lg">Nous contacter</Button>}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Link key={service.title} to={service.path}>
                <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Notre Mission</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            L'UFSBD œuvre depuis plus de 50 ans pour la promotion de la santé bucco-dentaire. 
            Notre section de l'Hérault s'engage quotidiennement dans la prévention, 
            la formation et l'information du public sur l'importance de la santé bucco-dentaire.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-4">UFSBD 34</h3>
              <p className="text-muted-foreground">
                Union Française pour la Santé Bucco-Dentaire - Section Hérault
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-muted-foreground">
                Email: ufsbd34@ufsbd.fr
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
              <div className="space-y-2">
                <div>
                  <Link to="/blog" className="text-muted-foreground hover:text-primary">
                    Actualités
                  </Link>
                </div>
                <div>
                  <ContactForm 
                    isModal 
                    trigger={
                      <button className="text-muted-foreground hover:text-primary text-left">
                        Nous contacter
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
