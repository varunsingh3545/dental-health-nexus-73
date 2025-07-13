import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Award, Building2, Heart, BookOpen, Shield } from 'lucide-react';
import { OrganigramService, type OrganigramMember } from '@/lib/organigram';

export default function Organigramme() {
  const [orgData, setOrgData] = useState<OrganigramMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    try {
      const members = await OrganigramService.getMembers();
      setOrgData(members);
    } catch (error) {
      console.error('Error fetching org data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group data by type
  const president = orgData.find(member => member.role === 'president');
  const secretaire = orgData.find(member => member.role === 'secretaire');
  const secretaireAdjoint = orgData.find(member => member.role === 'secretaireAdjoint');
  const tresorier = orgData.find(member => member.role === 'tresorier');
  const tresorierAdjoint = orgData.find(member => member.role === 'tresorierAdjoint');
  const vicePresidents = orgData.find(member => member.role === 'vicePresidents');
  const chargesMission = orgData.find(member => member.role === 'chargesMission');
  const verificateur = orgData.find(member => member.role === 'verificateur');

  const getIcon = (role: string) => {
    const iconMap = {
      president: Award,
      vicePresidents: UserCheck,
      secretaire: Users,
      secretaireAdjoint: Users,
      tresorier: Building2,
      tresorierAdjoint: Building2,
      chargesMission: Heart,
      verificateur: Award
    };
    return iconMap[role as keyof typeof iconMap] || Users;
  };

  const OrgCard = ({ person, className = "" }: { person: OrganigramMember, className?: string }) => {
    const IconComponent = getIcon(person.role);
    return (
      <Card className={`transition-all hover:shadow-xl border border-white/20 bg-gradient-to-br ${person.color || 'from-blue-500 to-blue-600'} text-white ${className}`}>
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
            {person.image?.url ? (
              <img 
                src={person.image.url} 
                alt={person.name}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <IconComponent className={`h-8 w-8 text-white ${person.image?.url ? 'hidden' : ''}`} />
          </div>
          <CardTitle className="text-xl text-white drop-shadow-md">{person.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-white/90 font-medium">{person.name}</p>
        </CardContent>
      </Card>
    );
  };

  const CommissionCard = ({ commission }: { commission: OrganigramMember }) => {
    const IconComponent = getIcon(commission.role);
    return (
      <Card className={`h-full transition-all hover:shadow-xl border border-white/20 bg-gradient-to-br ${commission.color || 'from-blue-500 to-blue-600'} text-white`}>
        <CardHeader>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 overflow-hidden">
            {commission.image?.url ? (
              <img 
                src={commission.image.url} 
                alt={commission.title}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <IconComponent className={`h-6 w-6 text-white ${commission.image?.url ? 'hidden' : ''}`} />
          </div>
          <CardTitle className="text-lg text-white drop-shadow-md">{commission.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {commission.description && <p className="text-white/90 text-sm">{commission.description}</p>}
          {commission.members && commission.members.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white font-medium text-sm">Membres:</h4>
              <ul className="space-y-1">
                {commission.members.map((member: string, index: number) => (
                  <li key={index} className="text-white/80 text-xs">• {member}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement de l'organigramme...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Organigramme UFSBD</h1>
          <p className="text-xl text-blue-100 drop-shadow-md">
            Section Hérault - Structure organisationnelle
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Bureau */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Bureau Exécutif</h2>
          
          {/* Président */}
          {president && (
            <>
              <div className="flex justify-center mb-8">
                <OrgCard person={president} className="w-80" />
              </div>
              
              {/* Ligne de direction */}
              <div className="flex justify-center mb-4">
                <div className="w-px h-8 bg-gray-300"></div>
              </div>
            </>
          )}
          
          {/* Secrétaire, Trésorier */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {secretaire && <OrgCard person={secretaire} />}
            {tresorier && <OrgCard person={tresorier} />}
          </div>
          
          {/* Secrétaire adjoint, Trésorier adjoint */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
            {secretaireAdjoint && <OrgCard person={secretaireAdjoint} />}
            {tresorierAdjoint && <OrgCard person={tresorierAdjoint} />}
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

        {/* Vice-présidents et Chargés de mission */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Vice-présidents et Chargés de mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {vicePresidents && <CommissionCard commission={vicePresidents} />}
            {chargesMission && <CommissionCard commission={chargesMission} />}
          </div>
        </div>
        
        {/* Vérificateur aux comptes */}
        {verificateur && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Vérificateur aux comptes</h2>
            <div className="flex justify-center">
              <OrgCard person={verificateur} className="w-80" />
            </div>
          </div>
        )}

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