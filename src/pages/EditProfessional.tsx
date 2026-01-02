import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, Save, ArrowLeft } from "lucide-react";
import { categories } from "@/data/categories";
import { z } from "zod";

const formSchema = z.object({
  businessName: z.string().min(3).max(100),
  description: z.string().min(20).max(1000),
  phone: z.string().min(10).max(20),
  email: z.string().email(),
});

interface SelectedSpecialty {
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
}

const EditProfessional = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [professionalId, setProfessionalId] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [serviceRadius, setServiceRadius] = useState([10]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<SelectedSpecialty[]>([]);
  const [isActive, setIsActive] = useState(true);
  
  // Form fields
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [cnpjCpf, setCnpjCpf] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");
  
  const [states, setStates] = useState<{ sigla: string; nome: string }[]>([]);
  const [cities, setCities] = useState<{ nome: string }[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then(res => res.json())
      .then(data => setStates(data));
  }, []);

  useEffect(() => {
    if (stateCode) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios?orderBy=nome`)
        .then(res => res.json())
        .then(data => setCities(data));
    }
  }, [stateCode]);

  useEffect(() => {
    const fetchProfessional = async () => {
      if (!user) return;

      const { data: professional, error } = await supabase
        .from("professionals")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error || !professional) {
        navigate("/painel");
        return;
      }

      setProfessionalId(professional.id);
      setBusinessName(professional.business_name);
      setDescription(professional.description || "");
      setPhone(professional.phone);
      setWhatsapp(professional.whatsapp || "");
      setEmail(professional.email);
      setCnpjCpf(professional.cnpj_cpf || "");
      setStateCode(professional.state_code);
      setCity(professional.city);
      setNeighborhood(professional.neighborhood || "");
      setAddress(professional.address || "");
      setServiceRadius([professional.service_radius_km]);
      setIsActive(professional.is_active);
      if (professional.photo_url) {
        setPhotoPreview(professional.photo_url);
      }

      // Fetch specialties
      const { data: specialties } = await supabase
        .from("professional_specialties")
        .select("*")
        .eq("professional_id", professional.id);

      if (specialties) {
        setSelectedSpecialties(specialties.map(s => ({
          categoryId: s.category_id,
          categoryName: s.category_name,
          subcategoryId: s.subcategory_id,
          subcategoryName: s.subcategory_name,
        })));
      }

      setIsLoading(false);
    };

    if (user) {
      fetchProfessional();
    }
  }, [user, navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A foto deve ter no máximo 5MB",
          variant: "destructive"
        });
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const toggleSpecialty = (categoryId: string, categoryName: string, subcategoryId: string, subcategoryName: string) => {
    const exists = selectedSpecialties.find(
      s => s.categoryId === categoryId && s.subcategoryId === subcategoryId
    );

    if (exists) {
      setSelectedSpecialties(selectedSpecialties.filter(
        s => !(s.categoryId === categoryId && s.subcategoryId === subcategoryId)
      ));
    } else {
      setSelectedSpecialties([...selectedSpecialties, { categoryId, categoryName, subcategoryId, subcategoryName }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !professionalId) return;

    try {
      formSchema.parse({ businessName, description, phone, email });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Erro de validação",
          description: err.errors[0].message,
          variant: "destructive"
        });
        return;
      }
    }

    if (selectedSpecialties.length === 0) {
      toast({
        title: "Selecione especialidades",
        description: "Você deve selecionar pelo menos uma especialidade",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let photoUrl = photoPreview;

      if (photo) {
        const fileExt = photo.name.split(".").pop();
        const fileName = `${user.id}/profile.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("professional-photos")
          .upload(fileName, photo, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("professional-photos")
          .getPublicUrl(fileName);

        photoUrl = publicUrl;
      }

      const { error: updateError } = await supabase
        .from("professionals")
        .update({
          business_name: businessName,
          description,
          phone,
          whatsapp: whatsapp || null,
          email,
          cnpj_cpf: cnpjCpf || null,
          service_radius_km: serviceRadius[0],
          photo_url: photoUrl,
          state_code: stateCode,
          city,
          neighborhood: neighborhood || null,
          address: address || null,
          is_active: isActive,
        })
        .eq("id", professionalId);

      if (updateError) throw updateError;

      // Update specialties - delete old and insert new
      await supabase
        .from("professional_specialties")
        .delete()
        .eq("professional_id", professionalId);

      const specialtiesData = selectedSpecialties.map(s => ({
        professional_id: professionalId,
        category_id: s.categoryId,
        category_name: s.categoryName,
        subcategory_id: s.subcategoryId,
        subcategory_name: s.subcategoryName,
      }));

      const { error: specialtiesError } = await supabase
        .from("professional_specialties")
        .insert(specialtiesData);

      if (specialtiesError) throw specialtiesError;

      toast({
        title: "Perfil atualizado!",
        description: "Suas alterações foram salvas com sucesso."
      });

      navigate("/painel");
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erro ao atualizar",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/painel")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Editar Perfil</h1>
              <p className="text-muted-foreground">
                Atualize suas informações profissionais
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Status Toggle */}
            <Card>
              <CardHeader>
                <CardTitle>Status do Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Perfil ativo</Label>
                    <p className="text-sm text-muted-foreground">
                      Quando ativo, seu perfil aparece nas buscas
                    </p>
                  </div>
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                </div>
              </CardContent>
            </Card>

            {/* Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Foto de Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {photoPreview ? (
                      <div className="relative">
                        <img 
                          src={photoPreview} 
                          alt="Preview" 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhoto(null);
                            setPhotoPreview(null);
                          }}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="max-w-xs"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG ou GIF. Máximo 5MB.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nome comercial *</Label>
                    <Input
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpjCpf">CNPJ/CPF</Label>
                    <Input
                      id="cnpjCpf"
                      value={cnpjCpf}
                      onChange={(e) => setCnpjCpf(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Estado *</Label>
                    <Select value={stateCode} onValueChange={setStateCode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state.sigla} value={state.sigla}>
                            {state.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Cidade *</Label>
                    <Select value={city} onValueChange={setCity} disabled={!stateCode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map(c => (
                          <SelectItem key={c.nome} value={c.nome}>
                            {c.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Raio de atendimento: {serviceRadius[0]} km</Label>
                  <Slider
                    value={serviceRadius}
                    onValueChange={setServiceRadius}
                    min={5}
                    max={100}
                    step={5}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Especialidades *</CardTitle>
                <CardDescription>
                  {selectedSpecialties.length} selecionados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {categories.map(category => (
                    <div key={category.id} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <category.icon className="h-5 w-5 text-primary" />
                        {category.name}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {category.subcategories.map(sub => {
                          const isSelected = selectedSpecialties.some(
                            s => s.categoryId === category.id && s.subcategoryId === sub.id
                          );
                          return (
                            <div
                              key={sub.id}
                              className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                                isSelected ? "bg-primary/10" : "hover:bg-muted"
                              }`}
                              onClick={() => toggleSpecialty(category.id, category.name, sub.id, sub.name)}
                            >
                              <Checkbox checked={isSelected} />
                              <span className="text-sm">{sub.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/painel")}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfessional;
