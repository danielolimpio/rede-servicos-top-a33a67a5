import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Folder, Tag, TrendingUp, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { searchCategories, getPopularSearches, SearchResult } from "@/lib/search";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchCommand = ({ open, onOpenChange }: SearchCommandProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        const searchResults = searchCategories(query);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = useCallback((result: SearchResult) => {
    if (result.type === "category") {
      navigate(`/categoria/${result.slug}`);
    } else {
      // Navega para a categoria pai com filtro da subcategoria
      navigate(`/categoria/${result.parentCategory?.slug}?subcategoria=${result.slug}`);
    }
    onOpenChange(false);
    setQuery("");
  }, [navigate, onOpenChange]);

  const handlePopularSearch = useCallback((term: string) => {
    setQuery(term);
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const popularSearches = getPopularSearches();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl max-w-2xl">
        <Command className="rounded-lg border-0" shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O que você precisa consertar? (ex: compressor, geladeira, vazamento)"
              className="flex h-14 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          
          <CommandList className="max-h-[400px]">
            {query.length < 2 ? (
              // Sugestões populares quando não há busca
              <CommandGroup heading="Buscas populares">
                {popularSearches.map((term) => (
                  <CommandItem
                    key={term}
                    onSelect={() => handlePopularSearch(term)}
                    className="cursor-pointer"
                  >
                    <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{term}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : results.length === 0 ? (
              <CommandEmpty>
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">Nenhum serviço encontrado para "{query}"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Tente buscar por: geladeira, ar-condicionado, eletricista...
                  </p>
                </div>
              </CommandEmpty>
            ) : (
              <>
                {/* Categorias */}
                {results.filter(r => r.type === "category").length > 0 && (
                  <CommandGroup heading="Categorias">
                    {results
                      .filter((r) => r.type === "category")
                      .map((result) => {
                        const IconComponent = result.category?.icon;
                        return (
                          <CommandItem
                            key={result.id}
                            onSelect={() => handleSelect(result)}
                            className="cursor-pointer py-3"
                          >
                            <div className="flex items-center gap-3 w-full">
                              {IconComponent && (
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                                  <IconComponent className="h-4 w-4 text-primary" />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-medium">{result.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {result.category?.description}
                                </p>
                              </div>
                            </div>
                          </CommandItem>
                        );
                      })}
                  </CommandGroup>
                )}

                {/* Separador */}
                {results.filter(r => r.type === "category").length > 0 && 
                 results.filter(r => r.type === "subcategory").length > 0 && (
                  <CommandSeparator />
                )}

                {/* Subcategorias / Serviços */}
                {results.filter(r => r.type === "subcategory").length > 0 && (
                  <CommandGroup heading="Serviços">
                    {results
                      .filter((r) => r.type === "subcategory")
                      .map((result) => {
                        const ParentIcon = result.parentCategory?.icon;
                        return (
                          <CommandItem
                            key={result.id}
                            onSelect={() => handleSelect(result)}
                            className="cursor-pointer py-3"
                          >
                            <div className="flex items-center gap-3 w-full">
                              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary">
                                <Tag className="h-4 w-4 text-secondary-foreground" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{result.name}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  {ParentIcon && <ParentIcon className="h-3 w-3" />}
                                  <span>{result.parentCategory?.name}</span>
                                  {result.matchedKeywords.length > 1 && (
                                    <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[10px]">
                                      relacionado: {result.matchedKeywords[1]}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CommandItem>
                        );
                      })}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>

          {/* Footer com dica de atalho */}
          <div className="border-t px-3 py-2 text-xs text-muted-foreground flex items-center justify-between">
            <span>Use ↑↓ para navegar, Enter para selecionar</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchCommand;
