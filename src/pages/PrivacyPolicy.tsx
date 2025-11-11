import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-background">
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Introdução</h2>
              <p>
                A Política de Privacidade do Serviço Local descreve como coletamos, usamos, armazenamos e protegemos as informações pessoais de nossos usuários. Estamos comprometidos em proteger sua privacidade e garantir a segurança dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
              </p>
              <p>
                Esta política se aplica a todos os usuários do nosso portal de divulgação de profissionais autônomos especializados em assistência técnica e conserto de eletrodomésticos, incluindo visitantes, clientes em potencial e profissionais cadastrados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Informações que Coletamos</h2>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Dados de Navegação</h3>
              <p>
                Ao acessar o Serviço Local, coletamos automaticamente informações técnicas como:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Endereço IP e localização geográfica aproximada</li>
                <li>Tipo de navegador e sistema operacional</li>
                <li>Páginas visitadas, tempo de permanência e origem de acesso</li>
                <li>Dispositivo utilizado (desktop, tablet, smartphone)</li>
                <li>Cookies e tecnologias similares de rastreamento</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.2 Dados Fornecidos Voluntariamente</h3>
              <p>
                Quando você interage com nosso portal (formulários de contato, busca de profissionais, solicitação de orçamento), podemos coletar:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nome completo e informações de contato (telefone, e-mail)</li>
                <li>Endereço para prestação de serviços</li>
                <li>Tipo de eletrodoméstico e descrição do problema</li>
                <li>Preferências de localização e filtros de busca</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.3 Dados de Profissionais Cadastrados</h3>
              <p>
                Profissionais autônomos que desejam divulgar seus serviços fornecem:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dados pessoais ou empresariais (nome, CPF/CNPJ)</li>
                <li>Informações de contato profissional</li>
                <li>Endereço de atendimento e áreas de cobertura</li>
                <li>Especializações em marcas e tipos de eletrodomésticos</li>
                <li>Documentos de identificação e comprovação de atividade</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Como Utilizamos as Informações</h2>
              <p>
                Os dados coletados são utilizados para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Conectar clientes a profissionais:</strong> Facilitar a busca e contato com técnicos especializados em conserto de geladeiras, máquinas de lavar, fogões, televisores, computadores, ar condicionado e outros eletrodomésticos</li>
                <li><strong>Aprovar cadastros:</strong> Analisar e validar profissionais que solicitam divulgação em nossa plataforma</li>
                <li><strong>Melhorar a experiência:</strong> Personalizar resultados de busca e recomendar profissionais mais próximos</li>
                <li><strong>Comunicação:</strong> Enviar atualizações, responder solicitações e fornecer suporte</li>
                <li><strong>Segurança e prevenção:</strong> Detectar e prevenir fraudes, abusos e atividades suspeitas</li>
                <li><strong>Análise e estatísticas:</strong> Compreender como os usuários interagem com o portal para melhorias contínuas</li>
                <li><strong>Cumprimento legal:</strong> Atender requisitos legais e regulatórios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Compartilhamento de Informações</h2>
              <p>
                O Serviço Local <strong>não vende</strong> dados pessoais a terceiros. Podemos compartilhar informações limitadamente nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Com profissionais cadastrados:</strong> Quando você solicita contato ou orçamento, suas informações são compartilhadas com o técnico selecionado</li>
                <li><strong>Prestadores de serviço:</strong> Empresas que nos auxiliam com hospedagem, análise de dados, envio de e-mails (sob rígidos acordos de confidencialidade)</li>
                <li><strong>Requisições legais:</strong> Quando exigido por lei, ordem judicial ou autoridades competentes</li>
                <li><strong>Proteção de direitos:</strong> Para proteger nossos direitos, privacidade, segurança ou propriedade</li>
              </ul>
              <p>
                <strong>Importante:</strong> Uma vez que você contata um profissional, a relação de privacidade passa a ser diretamente entre você e o técnico autônomo. O Serviço Local não controla como os profissionais independentes utilizam os dados recebidos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Cookies e Tecnologias Similares</h2>
              <p>
                Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência de navegação, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies essenciais:</strong> Necessários para o funcionamento básico do site</li>
                <li><strong>Cookies de desempenho:</strong> Medem como os visitantes usam o portal</li>
                <li><strong>Cookies de funcionalidade:</strong> Lembram suas preferências e escolhas</li>
                <li><strong>Cookies de publicidade:</strong> Podem ser usados para exibir anúncios relevantes</li>
              </ul>
              <p>
                Você pode gerenciar preferências de cookies através das configurações do seu navegador, mas isso pode afetar algumas funcionalidades do site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Segurança dos Dados</h2>
              <p>
                Implementamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda, destruição ou alteração, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criptografia de dados sensíveis (SSL/TLS)</li>
                <li>Controles de acesso restrito a informações pessoais</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e planos de recuperação</li>
                <li>Treinamento de equipe sobre proteção de dados</li>
              </ul>
              <p>
                Apesar de nossos esforços, nenhum sistema é 100% seguro. Não podemos garantir segurança absoluta contra todas as ameaças.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Seus Direitos (LGPD)</h2>
              <p>
                Em conformidade com a LGPD, você tem direito a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acesso:</strong> Confirmar e consultar seus dados que possuímos</li>
                <li><strong>Correção:</strong> Solicitar atualização de dados incompletos ou incorretos</li>
                <li><strong>Exclusão:</strong> Solicitar eliminação de dados pessoais, exceto quando houver obrigação legal de retenção</li>
                <li><strong>Portabilidade:</strong> Requisitar transferência de dados a outro fornecedor</li>
                <li><strong>Revogação de consentimento:</strong> Retirar autorização para processamento de dados</li>
                <li><strong>Oposição:</strong> Opor-se a tratamentos realizados com base em legítimo interesse</li>
                <li><strong>Informação:</strong> Conhecer entidades públicas e privadas com as quais compartilhamos dados</li>
              </ul>
              <p>
                Para exercer seus direitos, entre em contato através dos canais disponibilizados no website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Retenção de Dados</h2>
              <p>
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, atender obrigações legais e resolver disputas. Dados de profissionais inativos ou cadastros negados podem ser excluídos após período razoável.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Privacidade de Menores</h2>
              <p>
                O Serviço Local não coleta intencionalmente dados de menores de 18 anos. Se tomarmos conhecimento de que coletamos inadvertidamente informações de menores, tomaremos medidas para excluí-las prontamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. Links para Sites de Terceiros</h2>
              <p>
                Nosso portal pode conter links para websites de profissionais cadastrados ou parceiros. Não somos responsáveis pelas práticas de privacidade desses sites externos. Recomendamos revisar as políticas de privacidade de qualquer site que você visitar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">11. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou por motivos legais. Notificaremos sobre alterações significativas através do website ou por e-mail. A versão mais recente sempre estará disponível nesta página.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">12. Contato e Encarregado de Dados</h2>
              <p>
                Para questões sobre esta Política de Privacidade, exercício de direitos LGPD ou dúvidas sobre como tratamos seus dados pessoais, entre em contato através dos canais disponibilizados no website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">13. Consentimento</h2>
              <p>
                Ao utilizar o Serviço Local, você reconhece ter lido e compreendido esta Política de Privacidade e concorda com o tratamento de seus dados pessoais conforme descrito.
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8 pt-8 border-t border-border">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
