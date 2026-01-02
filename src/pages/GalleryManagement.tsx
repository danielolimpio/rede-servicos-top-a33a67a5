import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Trash2, ArrowLeft, Image as ImageIcon } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
}

const GalleryManagement = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [professionalId, setProfessionalId] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const { data: professional } = await supabase
        .from("professionals")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!professional) {
        navigate("/painel");
        return;
      }

      setProfessionalId(professional.id);

      const { data: gallery } = await supabase
        .from("professional_gallery")
        .select("*")
        .eq("professional_id", professional.id)
        .order("display_order", { ascending: true });

      if (gallery) {
        setImages(gallery);
      }

      setIsLoading(false);
    };

    if (user) {
      fetchData();
    }
  }, [user, navigate]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !professionalId || !user) return;

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Arquivo muito grande",
            description: `${file.name} excede o limite de 5MB`,
            variant: "destructive"
          });
          continue;
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/gallery/${Date.now()}-${i}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("professional-photos")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("professional-photos")
          .getPublicUrl(fileName);

        const { data: newImage, error: insertError } = await supabase
          .from("professional_gallery")
          .insert({
            professional_id: professionalId,
            image_url: publicUrl,
            caption: caption || null,
            display_order: images.length + i,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        setImages(prev => [...prev, newImage]);
      }

      setCaption("");
      toast({
        title: "Upload concluído!",
        description: "Imagens adicionadas à galeria."
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Erro no upload",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId: string, imageUrl: string) => {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split("/professional-photos/");
      if (urlParts.length > 1) {
        await supabase.storage
          .from("professional-photos")
          .remove([urlParts[1]]);
      }

      const { error } = await supabase
        .from("professional_gallery")
        .delete()
        .eq("id", imageId);

      if (error) throw error;

      setImages(images.filter(img => img.id !== imageId));
      toast({
        title: "Imagem removida",
        description: "A imagem foi excluída da galeria."
      });
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive"
      });
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
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/painel")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Galeria de Trabalhos</h1>
              <p className="text-muted-foreground">
                Adicione fotos dos seus trabalhos realizados
              </p>
            </div>
          </div>

          {/* Upload Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Adicionar Imagens</CardTitle>
              <CardDescription>
                Faça upload de até 10 imagens por vez. Máximo 5MB cada.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caption">Legenda (opcional)</Label>
                <Input
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Descreva o trabalho realizado..."
                />
              </div>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUpload}
                  disabled={isUploading}
                  className="max-w-xs"
                />
                {isUploading && (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Enviando...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid */}
          {images.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Nenhuma imagem na galeria ainda
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.image_url}
                    alt={image.caption || "Trabalho"}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(image.id, image.image_url)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {image.caption && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryManagement;
