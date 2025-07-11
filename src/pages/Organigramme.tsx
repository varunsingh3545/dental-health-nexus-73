import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Award, Building2, Heart, BookOpen, Shield } from 'lucide-react';

export default function Organigramme() {
  const organizationData = {
    president: {
      title: "Président",
      name: "Dr. [Nom]",
      icon: Award,
      color: "from-blue-600 to-blue-700",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    vicePresident: {
      title: "Vice-Président",
      name: "Dr. [Nom]",
      icon: UserCheck,
      color: "from-cyan-500 to-cyan-600",
      imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    secretaire: {
      title: "Secrétaire Général",
      name: "[Nom]",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
    },
    tresorier: {
      title: "Trésorier",
      name: "[Nom]",
      icon: Building2,
      color: "from-teal-500 to-teal-600",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    commissions: [
      {
        title: "Commission Prévention",
        description: "Actions de prévention et sensibilisation",
        icon: Shield,
        members: ["Dr. [Nom]", "[Nom]", "[Nom]"],
        color: "from-green-500 to-green-600",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop&crop=center"
      },
      {
        title: "Commission Formation",
        description: "Programmes de formation professionnelle",
        icon: BookOpen,
        members: ["Dr. [Nom]", "[Nom]", "[Nom]"],
        color: "from-purple-500 to-purple-600",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop&crop=center"
      },
      {
        title: "Commission Santé Publique",
        description: "Politiques de santé bucco-dentaire",
        icon: Heart,
        members: ["Dr. [Nom]", "[Nom]", "[Nom]"],
        color: "from-red-500 to-red-600",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&crop=center"
      }
    ]
  };

  const OrgCard = ({ person, className = "" }: { person: any, className?: string }) => {
    const IconComponent = person.icon;
    return (
      <Card className={`transition-all hover:shadow-xl border border-white/20 bg-gradient-to-br ${person.color} text-white ${className}`}>
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
            {person.imageUrl ? (
              <img 
                src={person.imageUrl} 
                alt={person.name}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <IconComponent className={`h-8 w-8 text-white ${person.imageUrl ? 'hidden' : ''}`} />
          </div>
          <CardTitle className="text-xl text-white drop-shadow-md">{person.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-white/90 font-medium">{person.name}</p>
        </CardContent>
      </Card>
    );
  };

  const CommissionCard = ({ commission }: { commission: any }) => {
    const IconComponent = commission.icon;
    return (
      <Card className={`h-full transition-all hover:shadow-xl border border-white/20 bg-gradient-to-br ${commission.color} text-white`}>
        <CardHeader>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 overflow-hidden">
            {commission.imageUrl ? (
              <img 
                src={commission.imageUrl} 
                alt={commission.title}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <IconComponent className={`h-6 w-6 text-white ${commission.imageUrl ? 'hidden' : ''}`} />
          </div>
          <CardTitle className="text-lg text-white drop-shadow-md">{commission.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/90 text-sm">{commission.description}</p>
          <div className="space-y-2">
            <h4 className="text-white font-medium text-sm">Membres:</h4>
            <ul className="space-y-1">
              {commission.members.map((member: string, index: number) => (
                <li key={index} className="text-white/80 text-xs">• {member}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Organigramme UFSBD</h1>
          <p className="text-xl text-blue-100 drop-shadow-md">
            Section Hérault - Structure organisationnelle
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Bureau */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Bureau Exécutif</h2>
          
          {/* Président */}
          <div className="flex justify-center mb-8">
            <OrgCard person={organizationData.president} className="w-80" />
          </div>
          
          {/* Ligne de direction */}
          <div className="flex justify-center mb-4">
            <div className="w-px h-8 bg-gray-300"></div>
          </div>
          
          {/* Vice-Président, Secrétaire, Trésorier */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <OrgCard person={organizationData.vicePresident} />
            <OrgCard person={organizationData.secretaire} />
            <OrgCard person={organizationData.tresorier} />
          </div>
        </div>

        {/* Conseil d'Administration */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Conseil d'Administration</h2>
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-center text-xl">Membres du Conseil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Professionnels de Santé</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Dr. [Nom] - Chirurgien-Dentiste</li>
                    <li>• Dr. [Nom] - Parodontiste</li>
                    <li>• Dr. [Nom] - Orthodontiste</li>
                    <li>• [Nom] - Hygiéniste Dentaire</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700">Représentants Institutionnels</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Représentant ARS Occitanie</li>
                    <li>• Représentant Conseil Départemental</li>
                    <li>• Représentant Éducation Nationale</li>
                    <li>• Représentant Ordre des Dentistes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commissions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Commissions Spécialisées</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {organizationData.commissions.map((commission, index) => (
              <CommissionCard key={index} commission={commission} />
            ))}
          </div>
        </div>

        {/* Partenaires */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Partenaires & Collaborateurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "ARS Occitanie", type: "Autorité de Santé" },
              { name: "Conseil Départemental 34", type: "Institution" },
              { name: "Rectorat de Montpellier", type: "Éducation" },
              { name: "Ordre des Dentistes", type: "Ordre Professionnel" },
              { name: "CPAM Hérault", type: "Assurance Maladie" },
              { name: "Mutuelles Santé", type: "Complémentaires" },
              { name: "Établissements Scolaires", type: "Éducation" },
              { name: "Centres de Santé", type: "Santé Publique" }
            ].map((partner, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-gray-800">{partner.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{partner.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                <strong>UFSBD Section Hérault</strong>
              </p>
              <p className="text-gray-600">
                📧 Email: ufsbd34@ufsbd.fr
              </p>
              <p className="text-gray-600">
                📍 Hérault, France
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Pour toute information sur notre organisation ou nos missions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}