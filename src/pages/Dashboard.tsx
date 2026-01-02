import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Briefcase, Image, LogOut, Plus, Settings } from "lucide-react";

interface Professional {
  id: string;
  business_name: string;
  is_active: boolean;
  is_approved: boolean;
  rating: number;
  review_count: number;
  photo_url: string | null;
}

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loadingProfessional, setLoadingProfessional] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchProfessional = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("professionals")
        .select("id, business_name, is_active, is_approved, rating, review_count, photo_url")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!error && data) {
        setProfessional(data);
      }
      setLoadingProfessional(false);
    };

    if (user) {
      fetchProfessional();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || loadingProfessional) {
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
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Painel do Profissional</h1>
              <p className="text-muted-foreground">
                Bem-vindo, {user?.user_metadata?.full_name || user?.email}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>

          {!professional ? (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Cadastre-se como Profissional</CardTitle>
                <CardDescription>
                  Complete seu cadastro para aparecer na plataforma e receber clientes
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild size="lg">
                  <Link to="/painel/cadastro">
                    <Plus className="h-4 w-4 mr-2" />
                    Iniciar Cadastro
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Meu Perfil</CardTitle>
                    <div className="flex gap-2">
                      {professional.is_approved ? (
                        <Badge variant="default" className="bg-green-500">Aprovado</Badge>
                      ) : (
                        <Badge variant="secondary">Aguardando Aprovação</Badge>
                      )}
                      {professional.is_active ? (
                        <Badge variant="default">Ativo</Badge>
                      ) : (
                        <Badge variant="outline">Inativo</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {professional.photo_url ? (
                      <img 
                        src={professional.photo_url} 
                        alt={professional.business_name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{professional.business_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ⭐ {professional.rating} ({professional.review_count} avaliações)
                      </p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link to="/painel/editar">
                      <Settings className="h-4 w-4 mr-2" />
                      Editar Perfil
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Galeria de Trabalhos</CardTitle>
                  <CardDescription>
                    Adicione fotos dos seus trabalhos realizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/painel/galeria">
                      <Image className="h-4 w-4 mr-2" />
                      Gerenciar Galeria
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Status do Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  {!professional.is_approved ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800">
                        ⏳ Seu perfil está em análise. Você receberá uma notificação quando for aprovado.
                      </p>
                    </div>
                  ) : !professional.is_active ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">
                        ℹ️ Seu perfil está inativo. Ative-o nas configurações para aparecer nas buscas.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800">
                        ✅ Seu perfil está ativo e visível para clientes na plataforma.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
