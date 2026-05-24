import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { z } from "zod";
import { Link } from "react-router-dom";

// ---------- Validators ----------
const onlyDigits = (s: string) => s.replace(/\D/g, "");

const isValidCPF = (cpf: string) => {
  const c = onlyDigits(cpf);
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(c[i]) * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== parseInt(c[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(c[i]) * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  return d2 === parseInt(c[10]);
};

const isValidCNPJ = (cnpj: string) => {
  const c = onlyDigits(cnpj);
  if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
  const calc = (base: string, weights: number[]) => {
    const sum = weights.reduce((acc, w, i) => acc + parseInt(base[i]) * w, 0);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d1 = calc(c.slice(0, 12), w1);
  const d2 = calc(c.slice(0, 12) + d1, w2);
  return d1 === parseInt(c[12]) && d2 === parseInt(c[13]);
};

const isValidDoc = (doc: string) => {
  const d = onlyDigits(doc);
  if (d.length === 11) return isValidCPF(d);
  if (d.length === 14) return isValidCNPJ(d);
  return false;
};

const formatPhone = (v: string) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 10) {
    return d.replace(/(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) =>
      [a && `(${a}`, a && a.length === 2 ? ") " : "", b, c && `-${c}`].filter(Boolean).join("")
    );
  }
  return d.replace(/(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
};

const formatCEP = (v: string) => onlyDigits(v).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

const formatDoc = (v: string) => {
  const d = onlyDigits(v);
  if (d.length <= 11) {
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return d
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

interface SelectedSpecialty {
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
}

const STEPS = ["Dados Básicos", "Perfil Profissional", "Portfólio e Termos"];

const ProfessionalRegistration = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1
  const [businessName, setBusinessName] = useState("");
  const [cnpjCpf, setCnpjCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  // Step 2
  const [selectedSpecialties, setSelectedSpecialties] = useState<SelectedSpecialty[]>([]);
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const [serviceRadius, setServiceRadius] = useState([10]);
  const [yearsExperience, setYearsExperience] = useState<string>("");
  const [description, setDescription] = useState("");

  // Step 3
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [emergency24h, setEmergency24h] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [states, setStates] = useState<{ sigla: string; nome: string }[]>([]);
  const [cities, setCities] = useState<{ nome: string }[]>([]);
  const [cepLoading, setCepLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
      .then((r) => r.json())
      .then(setStates)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!stateCode) return;
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios?orderBy=nome`)
      .then((r) => r.json())
      .then(setCities)
      .catch(() => {});
  }, [stateCode]);

  useEffect(() => {
    if (user?.email && !email) setEmail(user.email);
  }, [user, email]);

  // ViaCEP autocomplete
  const lookupCep = async (rawCep: string) => {
    const c = onlyDigits(rawCep);
    if (c.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${c}/json/`);
      const data = await res.json();
      if (data.erro) {
        toast({ title: "CEP não encontrado", variant: "destructive" });
        return;
      }
      if (data.uf) setStateCode(data.uf);
      if (data.localidade) setCity(data.localidade);
      if (data.bairro) setNeighborhood(data.bairro);
      if (data.logradouro) setAddress(data.logradouro);
    } catch {
      toast({ title: "Erro ao consultar CEP", variant: "destructive" });
    } finally {
      setCepLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Foto muito grande (máx 5MB)", variant: "destructive" });
      return;
    }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const remaining = 10 - galleryFiles.length;
    const accepted = files.slice(0, remaining).filter((f) => {
      if (f.size > 5 * 1024 * 1024) {
        toast({ title: `${f.name} excede 5MB`, variant: "destructive" });
        return false;
      }
      return true;
    });
    setGalleryFiles((prev) => [...prev, ...accepted]);
    setGalleryPreviews((prev) => [...prev, ...accepted.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  const removeGalleryAt = (idx: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== idx));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleSpecialty = (categoryId: string, categoryName: string, subcategoryId: string, subcategoryName: string) => {
    const exists = selectedSpecialties.find((s) => s.categoryId === categoryId && s.subcategoryId === subcategoryId);
    if (exists) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => !(s.categoryId === categoryId && s.subcategoryId === subcategoryId)));
    } else {
      setSelectedSpecialties([...selectedSpecialties, { categoryId, categoryName, subcategoryId, subcategoryName }]);
    }
  };

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now().toString(36);

  // Step validators
  const validateStep1 = () => {
    const schema = z.object({
      businessName: z.string().trim().min(3, "Nome deve ter ao menos 3 caracteres").max(100),
      cnpjCpf: z.string().refine(isValidDoc, "CPF ou CNPJ inválido"),
      phone: z.string().refine((v) => onlyDigits(v).length >= 10, "Telefone inválido"),
      email: z.string().email("Email inválido"),
    });
    const r = schema.safeParse({ businessName, cnpjCpf, phone, email });
    if (!r.success) {
      toast({ title: "Verifique os dados", description: r.error.errors[0].message, variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (selectedSpecialties.length === 0) {
      toast({ title: "Selecione ao menos uma especialidade", variant: "destructive" });
      return false;
    }
    if (!stateCode || !city) {
      toast({ title: "Informe estado e cidade", variant: "destructive" });
      return false;
    }
    if (description.trim().length < 20) {
      toast({ title: "Descrição deve ter ao menos 20 caracteres", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!acceptedTerms) {
      toast({ title: "Você precisa aceitar os termos e a LGPD", variant: "destructive" });
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setStep((s) => Math.min(2, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const uploadImage = async (file: File, path: string) => {
    const { error } = await supabase.storage.from("professional-photos").upload(path, file, { upsert: true });
    if (error) throw error;
    return supabase.storage.from("professional-photos").getPublicUrl(path).data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (!validateStep3()) return;

    setIsSubmitting(true);
    try {
      let photoUrl: string | null = null;
      if (photo) {
        const ext = photo.name.split(".").pop();
        photoUrl = await uploadImage(photo, `${user.id}/profile.${ext}`);
      }

      const slug = generateSlug(businessName);

      const { data: professional, error: pErr } = await supabase
        .from("professionals")
        .insert({
          user_id: user.id,
          business_name: businessName,
          slug,
          description,
          phone,
          whatsapp: whatsapp || null,
          email,
          cnpj_cpf: onlyDigits(cnpjCpf),
          service_radius_km: serviceRadius[0],
          photo_url: photoUrl,
          state_code: stateCode,
          city,
          neighborhood: neighborhood || null,
          address: address || null,
          cep: cep ? onlyDigits(cep) : null,
          years_experience: yearsExperience ? parseInt(yearsExperience) : null,
          price_range: priceRange || null,
          emergency_24h: emergency24h,
          accepted_terms_at: new Date().toISOString(),
          is_active: true,
        })
        .select("id")
        .single();
      if (pErr) throw pErr;

      // Specialties
      const specialtiesData = selectedSpecialties.map((s) => ({
        professional_id: professional.id,
        category_id: s.categoryId,
        category_name: s.categoryName,
        subcategory_id: s.subcategoryId,
        subcategory_name: s.subcategoryName,
      }));
      const { error: sErr } = await supabase.from("professional_specialties").insert(specialtiesData);
      if (sErr) throw sErr;

      // Gallery
      if (galleryFiles.length > 0) {
        const galleryData: { professional_id: string; image_url: string; display_order: number }[] = [];
        for (let i = 0; i < galleryFiles.length; i++) {
          const f = galleryFiles[i];
          const ext = f.name.split(".").pop();
          const url = await uploadImage(f, `${user.id}/gallery/${Date.now()}-${i}.${ext}`);
          galleryData.push({ professional_id: professional.id, image_url: url, display_order: i });
        }
        await supabase.from("professional_gallery").insert(galleryData);
      }

      toast({
        title: "Cadastro enviado!",
        description: "Seu perfil está aguardando aprovação. Você receberá um email quando for ativado.",
      });
      navigate("/painel");
    } catch (err: any) {
      console.error(err);
      toast({ title: "Erro ao cadastrar", description: err.message ?? "Tente novamente", variant: "destructive" });
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
      <SEO
        title="Cadastro de Profissional"
        description="Cadastre-se como profissional no Serviço Local e divulgue seus serviços de reparos para clientes da sua região."
        canonical="/cadastro"
        noIndex
      />
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Cadastro de Profissional</h1>
            <p className="text-muted-foreground">Etapa {step + 1} de 3 — {STEPS[step]}</p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${
                    i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <div className="ml-2 hidden sm:block text-sm font-medium">{label}</div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 ${i < step ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Dados Básicos</CardTitle>
                <CardDescription>Informações de identificação e contato</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nome completo / Razão Social *</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ex: João Silva Reparos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpjCpf">CPF ou CNPJ *</Label>
                  <Input
                    id="cnpjCpf"
                    value={cnpjCpf}
                    onChange={(e) => setCnpjCpf(formatDoc(e.target.value))}
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  />
                  {cnpjCpf && (
                    <p className={`text-xs ${isValidDoc(cnpjCpf) ? "text-green-600" : "text-destructive"}`}>
                      {isValidDoc(cnpjCpf) ? "✓ Documento válido" : "Documento inválido"}
                    </p>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(formatPhone(e.target.value))} placeholder="(11) 99999-9999" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Especialidades *</CardTitle>
                  <CardDescription>
                    Selecione os serviços que você oferece ({selectedSpecialties.length} selecionada{selectedSpecialties.length === 1 ? "" : "s"})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input
                      placeholder="🔍 Buscar especialidade (ex: geladeira, eletricista, SEO...)"
                      value={specialtySearch}
                      onChange={(e) => setSpecialtySearch(e.target.value)}
                    />
                  </div>
                  <Accordion type="multiple" className="space-y-2">
                    {categories.map((category) => {
                      const normalize = (s: string) =>
                        s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                      const q = normalize(specialtySearch.trim());
                      const filteredSubs = q
                        ? category.subcategories.filter(
                            (s) => normalize(s.name).includes(q) || normalize(s.group || "").includes(q)
                          )
                        : category.subcategories;
                      if (q && filteredSubs.length === 0) return null;

                      // Group by sub.group
                      const groups = filteredSubs.reduce<Record<string, typeof filteredSubs>>((acc, sub) => {
                        const key = sub.group || "Outros";
                        (acc[key] = acc[key] || []).push(sub);
                        return acc;
                      }, {});

                      const selectedInCat = selectedSpecialties.filter((s) => s.categoryId === category.id).length;

                      return (
                        <AccordionItem key={category.id} value={category.id} className="border rounded-lg px-4">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2 flex-1">
                              <category.icon className="h-5 w-5 text-primary" />
                              <span className="font-semibold text-left">{category.name}</span>
                              {selectedInCat > 0 && (
                                <Badge variant="secondary" className="ml-2">
                                  {selectedInCat}
                                </Badge>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-2">
                              {Object.entries(groups).map(([groupName, subs]) => (
                                <div key={groupName}>
                                  <h5 className="text-xs font-bold uppercase text-muted-foreground mb-2 tracking-wide">
                                    {groupName}
                                  </h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                    {subs.map((sub) => {
                                      const isSelected = selectedSpecialties.some(
                                        (s) => s.categoryId === category.id && s.subcategoryId === sub.id
                                      );
                                      return (
                                        <div
                                          key={sub.id}
                                          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                                            isSelected ? "bg-primary/10" : "hover:bg-muted"
                                          }`}
                                          onClick={() =>
                                            toggleSpecialty(category.id, category.name, sub.id, sub.name)
                                          }
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
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </CardContent>
              </Card>


              <Card>
                <CardHeader>
                  <CardTitle>Localização e Atendimento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <div className="relative">
                        <Input
                          id="cep"
                          value={cep}
                          onChange={(e) => {
                            const v = formatCEP(e.target.value);
                            setCep(v);
                            if (onlyDigits(v).length === 8) lookupCep(v);
                          }}
                          placeholder="00000-000"
                        />
                        {cepLoading && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="years">Anos de experiência</Label>
                      <Input id="years" type="number" min="0" max="80" value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} placeholder="Ex: 10" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Estado *</Label>
                      <Select value={stateCode} onValueChange={setStateCode}>
                        <SelectTrigger><SelectValue placeholder="Selecione o estado" /></SelectTrigger>
                        <SelectContent>
                          {states.map((s) => (
                            <SelectItem key={s.sigla} value={s.sigla}>{s.nome}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Cidade *</Label>
                      <Select value={city} onValueChange={setCity} disabled={!stateCode}>
                        <SelectTrigger><SelectValue placeholder="Selecione a cidade" /></SelectTrigger>
                        <SelectContent>
                          {cities.map((c) => (
                            <SelectItem key={c.nome} value={c.nome}>{c.nome}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Raio de atendimento: {serviceRadius[0]} km</Label>
                    <Slider value={serviceRadius} onValueChange={setServiceRadius} min={5} max={100} step={5} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição do serviço *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                      placeholder="Descreva seus serviços, diferenciais e experiência..."
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">{description.length}/500 caracteres (mín 20)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Foto de Perfil</CardTitle>
                  <CardDescription>Imagem ou logo que aparecerá no seu cartão</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    {photoPreview ? (
                      <div className="relative">
                        <img src={photoPreview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
                        <button
                          type="button"
                          onClick={() => { setPhoto(null); setPhotoPreview(null); }}
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
                    <Input type="file" accept="image/*" onChange={handlePhotoChange} className="max-w-xs" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Portfólio ({galleryFiles.length}/10)</CardTitle>
                  <CardDescription>Adicione fotos de trabalhos realizados (recomendado: 3 a 10 imagens)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input type="file" accept="image/*" multiple onChange={handleGalleryChange} disabled={galleryFiles.length >= 10} />
                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {galleryPreviews.map((src, i) => (
                        <div key={i} className="relative aspect-square">
                          <img src={src} alt={`Trabalho ${i + 1}`} className="w-full h-full object-cover rounded-md" />
                          <button
                            type="button"
                            onClick={() => removeGalleryAt(i)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Disponibilidade e Preço</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Faixa de preço</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {["R$", "R$$", "R$$$", "R$$$$"].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriceRange(p)}
                          className={`p-3 rounded-md border font-semibold transition-colors ${
                            priceRange === p
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:bg-muted"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Atende emergências 24h?</Label>
                      <p className="text-xs text-muted-foreground">Profissionais 24h aparecem com destaque</p>
                    </div>
                    <Switch checked={emergency24h} onCheckedChange={setEmergency24h} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox checked={acceptedTerms} onCheckedChange={(v) => setAcceptedTerms(!!v)} className="mt-1" />
                    <span className="text-sm">
                      Li e aceito os{" "}
                      <Link to="/termos-de-uso" target="_blank" className="text-primary underline">Termos de Uso</Link>
                      {" "}e a{" "}
                      <Link to="/politica-de-privacidade" target="_blank" className="text-primary underline">Política de Privacidade (LGPD)</Link>.
                      Autorizo o tratamento dos meus dados conforme descrito.
                    </span>
                  </label>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <Button type="button" variant="outline" onClick={step === 0 ? () => navigate("/painel") : goBack} className="flex-1" disabled={isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {step === 0 ? "Cancelar" : "Voltar"}
            </Button>
            {step < 2 ? (
              <Button type="button" onClick={goNext} className="flex-1">
                Próxima etapa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} className="flex-1" disabled={isSubmitting || !acceptedTerms}>
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
                ) : (
                  <><Check className="mr-2 h-4 w-4" /> Concluir Cadastro</>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionalRegistration;
