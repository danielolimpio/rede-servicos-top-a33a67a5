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
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, Check } from "lucide-react";
import { categories } from "@/data/categories";
import { z } from "zod";

const formSchema = z.object({
  businessName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  description: z.string().min(20, "Descrição deve ter pelo menos 20 caracteres").max(1000),
  phone: z.string().min(10, "Telefone inválido").max(20),
  whatsapp: z.string().max(20).optional(),
  email: z.string().email("Email inválido"),
  cnpjCpf: z.string().max(20).optional(),
  stateCode: z.string().length(2, "Selecione um estado"),
  city: z.string().min(2, "Informe a cidade"),
  neighborhood: z.string().optional(),
  address: z.string().optional(),
});

interface SelectedSpecialty {
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
}

const ProfessionalRegistration = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [serviceRadius, setServiceRadius] = useState([10]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<SelectedSpecialty[]>([]);
  
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
    // Load states from IBGE API
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
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

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

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      + "-" + Date.now().toString(36);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    // Validate form
    try {
      formSchema.parse({
        businessName,
        description,
        phone,
        whatsapp,
        email,
        cnpjCpf,
        stateCode,
        city,
        neighborhood,
        address,
      });
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
      let photoUrl = null;

      // Upload photo if exists
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

      // Create professional record
      const slug = generateSlug(businessName);
      
      const { data: professional, error: professionalError } = await supabase
        .from("professionals")
        .insert({
          user_id: user.id,
          business_name: businessName,
          slug,
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
          is_active: true,
        })
        .select("id")
        .single();

      if (professionalError) throw professionalError;

      // Add specialties
      const specialtiesData = selectedSpecialties.map(s => ({
        professional_id: professional.id,
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
        title: "Cadastro realizado!",
        description: "Seu perfil foi criado e está aguardando aprovação."
      });

      navigate("/painel");
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Cadastro de Profissional</h1>
            <p className="text-muted-foreground">
              Preencha os dados abaixo para criar seu perfil na plataforma
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Foto de Perfil</CardTitle>
                <CardDescription>
                  Adicione uma foto profissional ou logo da sua empresa
                </CardDescription>
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
                      placeholder="Ex: João Técnico Reparos"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpjCpf">CNPJ/CPF</Label>
                    <Input
                      id="cnpjCpf"
                      value={cnpjCpf}
                      onChange={(e) => setCnpjCpf(e.target.value)}
                      placeholder="Opcional"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva seus serviços, experiência e diferenciais..."
                    rows={4}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Mínimo 20 caracteres. {description.length}/1000
                  </p>
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
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(11) 99999-9999"
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
                        <SelectValue placeholder="Selecione o estado" />
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
                        <SelectValue placeholder="Selecione a cidade" />
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
                      placeholder="Opcional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Opcional"
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
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Define a área máxima que você atende a partir da sua localização
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Especialidades *</CardTitle>
                <CardDescription>
                  Selecione os serviços que você oferece ({selectedSpecialties.length} selecionados)
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
                    <Check className="mr-2 h-4 w-4" />
                    Concluir Cadastro
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

export default ProfessionalRegistration;
