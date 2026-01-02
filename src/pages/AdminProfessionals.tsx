import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  CheckCheck,
  Ban,
} from "lucide-react";

interface Professional {
  id: string;
  business_name: string;
  email: string;
  phone: string;
  city: string;
  state_code: string;
  is_active: boolean;
  is_approved: boolean;
  created_at: string;
  photo_url: string | null;
  slug: string;
}

interface ProfessionalSpecialty {
  category_name: string;
  subcategory_name: string;
}

const ITEMS_PER_PAGE = 10;

export default function AdminProfessionals() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const { toast } = useToast();

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [specialties, setSpecialties] = useState<Record<string, ProfessionalSpecialty[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: "approve" | "reject";
    ids: string[];
  }>({ open: false, action: "approve", ids: [] });

  const states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && user) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página.",
        variant: "destructive",
      });
      navigate("/painel");
    }
  }, [isAdmin, adminLoading, user, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchProfessionals();
    }
  }, [isAdmin, currentPage, statusFilter, stateFilter, searchTerm]);

  async function fetchProfessionals() {
    setLoading(true);
    try {
      let query = supabase
        .from("professionals")
        .select("*", { count: "exact" });

      // Apply filters
      if (statusFilter === "pending") {
        query = query.eq("is_approved", false).eq("is_active", false);
      } else if (statusFilter === "approved") {
        query = query.eq("is_approved", true);
      } else if (statusFilter === "rejected") {
        query = query.eq("is_active", false).eq("is_approved", false);
      }

      if (stateFilter !== "all") {
        query = query.eq("state_code", stateFilter);
      }

      if (searchTerm) {
        query = query.or(`business_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`);
      }

      // Pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      setProfessionals(data || []);
      setTotalCount(count || 0);

      // Fetch specialties for all professionals
      if (data && data.length > 0) {
        const ids = data.map((p) => p.id);
        const { data: specData } = await supabase
          .from("professional_specialties")
          .select("professional_id, category_name, subcategory_name")
          .in("professional_id", ids);

        const specMap: Record<string, ProfessionalSpecialty[]> = {};
        specData?.forEach((spec) => {
          if (!specMap[spec.professional_id]) {
            specMap[spec.professional_id] = [];
          }
          specMap[spec.professional_id].push({
            category_name: spec.category_name,
            subcategory_name: spec.subcategory_name,
          });
        });
        setSpecialties(specMap);
      }
    } catch (error) {
      console.error("Error fetching professionals:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os profissionais.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(ids: string[]) {
    try {
      const { error } = await supabase
        .from("professionals")
        .update({ is_approved: true, is_active: true })
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `${ids.length} profissional(is) aprovado(s) com sucesso.`,
      });

      setSelectedIds([]);
      fetchProfessionals();
    } catch (error) {
      console.error("Error approving professionals:", error);
      toast({
        title: "Erro",
        description: "Não foi possível aprovar os profissionais.",
        variant: "destructive",
      });
    }
  }

  async function handleReject(ids: string[]) {
    try {
      const { error } = await supabase
        .from("professionals")
        .update({ is_approved: false, is_active: false })
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `${ids.length} profissional(is) rejeitado(s).`,
      });

      setSelectedIds([]);
      fetchProfessionals();
    } catch (error) {
      console.error("Error rejecting professionals:", error);
      toast({
        title: "Erro",
        description: "Não foi possível rejeitar os profissionais.",
        variant: "destructive",
      });
    }
  }

  function handleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedIds(professionals.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  }

  function handleSelectOne(id: string, checked: boolean) {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  }

  function confirmAction(action: "approve" | "reject", ids: string[]) {
    setConfirmDialog({ open: true, action, ids });
  }

  function executeAction() {
    if (confirmDialog.action === "approve") {
      handleApprove(confirmDialog.ids);
    } else {
      handleReject(confirmDialog.ids);
    }
    setConfirmDialog({ open: false, action: "approve", ids: [] });
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const pendingCount = professionals.filter((p) => !p.is_approved && !p.is_active).length;

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Administração de Profissionais | TechAssist</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Administração de Profissionais
            </h1>
            <p className="text-muted-foreground">
              Gerencie os cadastros de profissionais da plataforma
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalCount}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CheckCheck className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {professionals.filter((p) => p.is_approved).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Aprovados</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Ban className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {professionals.filter((p) => !p.is_approved && !p.is_active).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Rejeitados</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email ou cidade..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select
                  value={statusFilter}
                  onValueChange={(value: typeof statusFilter) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="approved">Aprovados</SelectItem>
                    <SelectItem value="rejected">Rejeitados</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={stateFilter}
                  onValueChange={(value) => {
                    setStateFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => fetchProfessionals()}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>
          </div>

          {/* Batch Actions */}
          {selectedIds.length > 0 && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedIds.length} profissional(is) selecionado(s)
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => confirmAction("approve", selectedIds)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aprovar Selecionados
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => confirmAction("reject", selectedIds)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejeitar Selecionados
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        professionals.length > 0 &&
                        selectedIds.length === professionals.length
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Especialidades</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : professionals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhum profissional encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  professionals.map((professional) => (
                    <TableRow key={professional.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(professional.id)}
                          onCheckedChange={(checked) =>
                            handleSelectOne(professional.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {professional.photo_url ? (
                            <img
                              src={professional.photo_url}
                              alt={professional.business_name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              <Users className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{professional.business_name}</p>
                            <p className="text-sm text-muted-foreground">{professional.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {specialties[professional.id]?.slice(0, 2).map((spec, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {spec.subcategory_name}
                            </Badge>
                          ))}
                          {(specialties[professional.id]?.length || 0) > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{(specialties[professional.id]?.length || 0) - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {professional.city}, {professional.state_code}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{professional.email}</p>
                          <p className="text-muted-foreground">{professional.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {professional.is_approved ? (
                          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                            Aprovado
                          </Badge>
                        ) : professional.is_active ? (
                          <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">
                            Pendente
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">
                            Pendente
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">
                          {new Date(professional.created_at).toLocaleDateString("pt-BR")}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              window.open(`/profissional/${professional.slug}`, "_blank")
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!professional.is_approved && (
                            <>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => confirmAction("approve", [professional.id])}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => confirmAction("reject", [professional.id])}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {professional.is_approved && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => confirmAction("reject", [professional.id])}
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-sm text-muted-foreground">
                  Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} de {totalCount}
                </p>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) =>
          setConfirmDialog({ ...confirmDialog, open })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmDialog.action === "approve"
                ? "Aprovar Profissional(is)"
                : "Rejeitar Profissional(is)"}
            </DialogTitle>
            <DialogDescription>
              {confirmDialog.action === "approve"
                ? `Tem certeza que deseja aprovar ${confirmDialog.ids.length} profissional(is)? Eles ficarão visíveis publicamente na plataforma.`
                : `Tem certeza que deseja rejeitar ${confirmDialog.ids.length} profissional(is)? Eles não serão exibidos na plataforma.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setConfirmDialog({ open: false, action: "approve", ids: [] })
              }
            >
              Cancelar
            </Button>
            <Button
              variant={confirmDialog.action === "approve" ? "default" : "destructive"}
              onClick={executeAction}
            >
              {confirmDialog.action === "approve" ? "Aprovar" : "Rejeitar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
