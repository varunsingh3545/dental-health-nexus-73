import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, Users, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrgMember {
  id: string;
  name: string;
  title: string;
  image_url?: string;
  type: 'president' | 'vicePresident' | 'secretaire' | 'tresorier' | 'commission';
  description?: string;
  members?: string[];
  color?: string;
}

export default function OrganigrammeAdmin() {
  const { toast } = useToast();
  const [orgData, setOrgData] = useState<OrgMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newMember, setNewMember] = useState<Partial<OrgMember>>({
    name: '',
    title: '',
    type: 'commission',
    image_url: '',
    description: '',
    members: [],
    color: 'from-blue-500 to-blue-600'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchOrgData();
  }, []);

  const fetchOrgData = async () => {
    try {
      // Get data from localStorage or initialize with default data
      const storedData = localStorage.getItem('organigramme_data');
      if (storedData) {
        setOrgData(JSON.parse(storedData));
      } else {
        // Initialize with default data
        const defaultData: OrgMember[] = [
          {
            id: '1',
            name: 'Dr. Jean Dupont',
            title: 'Président',
            type: 'president',
            image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
            color: 'from-blue-600 to-blue-700'
          },
          {
            id: '2',
            name: 'Dr. Marie Martin',
            title: 'Vice-Présidente',
            type: 'vicePresident',
            image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
            color: 'from-cyan-500 to-cyan-600'
          },
          {
            id: '3',
            name: 'Pierre Durand',
            title: 'Secrétaire Général',
            type: 'secretaire',
            image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face',
            color: 'from-blue-500 to-blue-600'
          },
          {
            id: '4',
            name: 'Sophie Bernard',
            title: 'Trésorière',
            type: 'tresorier',
            image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            color: 'from-teal-500 to-teal-600'
          },
          {
            id: '5',
            name: 'Commission Prévention',
            title: 'Commission Prévention',
            type: 'commission',
            image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop&crop=center',
            description: 'Actions de prévention et sensibilisation',
            members: ['Dr. Alice Moreau', 'Dr. Paul Lefebvre', 'Claire Rousseau'],
            color: 'from-green-500 to-green-600'
          },
          {
            id: '6',
            name: 'Commission Formation',
            title: 'Commission Formation',
            type: 'commission',
            image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=150&fit=crop&crop=center',
            description: 'Programmes de formation professionnelle',
            members: ['Dr. Michel Blanc', 'Dr. Anne Petit', 'Laurent Simon'],
            color: 'from-purple-500 to-purple-600'
          }
        ];
        setOrgData(defaultData);
        localStorage.setItem('organigramme_data', JSON.stringify(defaultData));
      }
    } catch (error) {
      console.error('Error fetching org data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données de l'organigramme.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: OrgMember) => {
    setEditingId(member.id);
  };

  const handleSave = async (id: string, updatedData: Partial<OrgMember>) => {
    try {
      const updatedOrgData = orgData.map(item => 
        item.id === id ? { ...item, ...updatedData } : item
      );
      setOrgData(updatedOrgData);
      localStorage.setItem('organigramme_data', JSON.stringify(updatedOrgData));
      
      setEditingId(null);
      toast({
        title: "Membre mis à jour",
        description: "Les informations ont été sauvegardées avec succès."
      });
    } catch (error) {
      console.error('Error updating member:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    const member = orgData.find(m => m.id === id);
    if (member && ['president', 'vicePresident', 'secretaire', 'tresorier'].includes(member.type)) {
      toast({
        title: "Suppression impossible",
        description: "Les postes du bureau exécutif ne peuvent pas être supprimés.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const updatedOrgData = orgData.filter(item => item.id !== id);
      setOrgData(updatedOrgData);
      localStorage.setItem('organigramme_data', JSON.stringify(updatedOrgData));
      
      toast({
        title: "Membre supprimé",
        description: "Le membre a été retiré de l'organigramme."
      });
    } catch (error) {
      console.error('Error deleting member:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le membre.",
        variant: "destructive"
      });
    }
  };

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.title) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au moins le nom et le titre.",
        variant: "destructive"
      });
      return;
    }

    try {
      const id = Date.now().toString();
      const memberWithId = { ...newMember, id } as OrgMember;
      const updatedOrgData = [...orgData, memberWithId];
      setOrgData(updatedOrgData);
      localStorage.setItem('organigramme_data', JSON.stringify(updatedOrgData));
      
      setNewMember({
        name: '',
        title: '',
        type: 'commission',
        image_url: '',
        description: '',
        members: [],
        color: 'from-blue-500 to-blue-600'
      });
      setShowAddForm(false);
      toast({
        title: "Membre ajouté",
        description: "Le nouveau membre a été ajouté à l'organigramme."
      });
    } catch (error) {
      console.error('Error adding member:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le membre.",
        variant: "destructive"
      });
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      president: 'Président',
      vicePresident: 'Vice-Président',
      secretaire: 'Secrétaire',
      tresorier: 'Trésorier',
      commission: 'Commission'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const EditForm = ({ member }: { member: OrgMember }) => {
    const [formData, setFormData] = useState(member);
    const [membersList, setMembersList] = useState(member.members?.join(', ') || '');

    return (
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Modifier: {member.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
          </div>
          
            <div>
              <Label htmlFor="imageUrl">URL de l'image</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.image_url || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="color">Couleur du dégradé</Label>
              <Select
                value={formData.color || 'from-blue-500 to-blue-600'}
                onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="from-blue-600 to-blue-700">Bleu foncé</SelectItem>
                  <SelectItem value="from-cyan-500 to-cyan-600">Cyan</SelectItem>
                  <SelectItem value="from-blue-500 to-blue-600">Bleu</SelectItem>
                  <SelectItem value="from-teal-500 to-teal-600">Teal</SelectItem>
                  <SelectItem value="from-green-500 to-green-600">Vert</SelectItem>
                  <SelectItem value="from-purple-500 to-purple-600">Violet</SelectItem>
                  <SelectItem value="from-red-500 to-red-600">Rouge</SelectItem>
                  <SelectItem value="from-orange-500 to-orange-600">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>

          {member.type === 'commission' && (
            <>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="members">Membres (séparés par des virgules)</Label>
                <Textarea
                  id="members"
                  placeholder="Dr. Nom, Prénom Nom, ..."
                  value={membersList}
                  onChange={(e) => setMembersList(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => handleSave(member.id, {
                ...formData,
                members: member.type === 'commission' 
                  ? membersList.split(',').map(m => m.trim()).filter(m => m)
                  : undefined
              })}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setEditingId(null)}
            >
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion de l'Organigramme</h1>
          <p className="text-muted-foreground mt-2">
            Gérez la structure organisationnelle de l'UFSBD Section Hérault
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un membre
        </Button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Ajouter un nouveau membre</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newName">Nom</Label>
                <Input
                  id="newName"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="newTitle">Titre</Label>
                <Input
                  id="newTitle"
                  value={newMember.title}
                  onChange={(e) => setNewMember(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="newImageUrl">URL de l'image</Label>
              <Input
                id="newImageUrl"
                placeholder="https://example.com/image.jpg"
                value={newMember.image_url}
                onChange={(e) => setNewMember(prev => ({ ...prev, image_url: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="newType">Type</Label>
              <Select
                value={newMember.type}
                onValueChange={(value) => setNewMember(prev => ({ ...prev, type: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commission">Commission</SelectItem>
                  <SelectItem value="president">Président</SelectItem>
                  <SelectItem value="vicePresident">Vice-Président</SelectItem>
                  <SelectItem value="secretaire">Secrétaire</SelectItem>
                  <SelectItem value="tresorier">Trésorier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="newDescription">Description</Label>
              <Textarea
                id="newDescription"
                value={newMember.description}
                onChange={(e) => setNewMember(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddMember} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Members List */}
      <div className="grid gap-4">
        {orgData.map((member) => (
          <div key={member.id}>
            {editingId === member.id ? (
              <EditForm member={member} />
            ) : (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <Badge variant="secondary">
                          {getTypeLabel(member.type)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{member.title}</p>
                      {member.description && (
                        <p className="text-sm text-gray-600">{member.description}</p>
                      )}
                      {member.members && member.members.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Membres:</p>
                          <p className="text-sm text-gray-600">{member.members.join(', ')}</p>
                        </div>
                      )}
                      {member.image_url && (
                        <p className="text-xs text-blue-600">📷 Image: {member.image_url}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(member)}
                      >
                        Modifier
                      </Button>
                      {member.type === 'commission' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}