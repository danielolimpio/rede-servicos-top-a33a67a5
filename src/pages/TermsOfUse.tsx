import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Termos de Uso"
        description="Leia os termos de uso do Serviço Local. Informações sobre a natureza do serviço, responsabilidades, processo de aprovação de profissionais e políticas da plataforma."
        canonical="/termos-de-uso"
        keywords="termos de uso, política de uso, regras da plataforma, responsabilidades, serviço local termos"
      />
      <Header />
      <main className="flex-grow bg-background">
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Termos de Uso</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Introdução e Aceitação dos Termos</h2>
              <p>
                Bem-vindo ao Serviço Local, um portal online especializado na divulgação e conexão de profissionais autônomos independentes da área de assistência técnica e conserto de eletrodomésticos com potenciais clientes. Ao acessar e utilizar este website, você concorda integralmente com os presentes Termos de Uso.
              </p>
              <p>
                O Serviço Local atua exclusivamente como intermediário, oferecendo uma plataforma digital para que profissionais autônomos possam divulgar seus serviços, especialidades, informações de contato e endereços de atendimento. Não somos prestadores de serviços de assistência técnica e não executamos reparos ou manutenções em eletrodomésticos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Natureza do Serviço - Portal de Divulgação</h2>
              <p>
                O Serviço Local é um portal de divulgação e anúncios de profissionais autônomos independentes. Nossa plataforma permite que técnicos especializados em conserto de geladeiras, máquinas de lavar, fogões, micro-ondas, televisores, computadores, ar condicionado, liquidificadores, ferros elétricos e outros eletrodomésticos divulguem seus serviços.
              </p>
              <p>
                <strong>Importante:</strong> Os profissionais cadastrados atuam de forma completamente independente. O Serviço Local não possui vínculo empregatício, societário ou de qualquer outra natureza com os prestadores de serviço anunciados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Isenção de Responsabilidade</h2>
              <p>
                O Serviço Local <strong>NÃO se responsabiliza</strong> por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Qualidade, eficiência ou resultado dos serviços prestados pelos profissionais anunciados</li>
                <li>Endereços, informações de contato ou disponibilidade dos profissionais cadastrados</li>
                <li>Orçamentos, valores cobrados ou formas de pagamento praticadas pelos técnicos</li>
                <li>Garantias oferecidas ou não pelos profissionais autônomos</li>
                <li>Danos materiais ou pessoais decorrentes da execução dos serviços</li>
                <li>Atrasos, cancelamentos ou não comparecimento dos profissionais</li>
                <li>Peças utilizadas, procedimentos técnicos ou métodos de reparo empregados</li>
                <li>Veracidade das informações, certificações ou especializações declaradas pelos anunciantes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Processo de Seleção e Aprovação</h2>
              <p>
                Embora o Serviço Local não seja responsável pelos serviços prestados, implementamos um processo de triagem para aceitar cadastros em nossa plataforma. Nosso objetivo é promover apenas profissionais que demonstrem ser reais, responsáveis e comprometidos com boas práticas.
              </p>
              <p>
                Este filtro de aprovação não constitui garantia de qualidade, mas sim uma medida preventiva para reduzir a presença de anúncios fraudulentos ou não profissionais. A aprovação de cadastro não implica em endosso, certificação ou garantia de qualidade dos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Responsabilidades do Usuário</h2>
              <p>
                Ao utilizar o Serviço Local, o usuário deve:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verificar pessoalmente as credenciais e referências dos profissionais antes de contratar</li>
                <li>Solicitar orçamentos detalhados e esclarecer todas as dúvidas antes de autorizar serviços</li>
                <li>Confirmar endereços, telefones e disponibilidade diretamente com o profissional</li>
                <li>Documentar acordos de preços, prazos e garantias com o técnico contratado</li>
                <li>Reportar ao Serviço Local qualquer irregularidade ou problema com profissionais cadastrados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Relacionamento Direto Cliente-Profissional</h2>
              <p>
                Toda negociação, contratação e execução de serviços ocorre diretamente entre o cliente e o profissional autônomo. O Serviço Local não participa, media ou interfere nessas relações comerciais. Eventuais conflitos, reclamações ou disputas devem ser resolvidos diretamente entre as partes envolvidas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Conteúdo e Informações</h2>
              <p>
                As informações sobre serviços, especializações, áreas de atendimento e contatos são fornecidas exclusivamente pelos profissionais cadastrados. O Serviço Local não valida, verifica ou atualiza regularmente essas informações. Cabe ao usuário confirmar a precisão dos dados antes de utilizar os serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Alterações nos Termos</h2>
              <p>
                O Serviço Local reserva-se o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no website. É responsabilidade do usuário revisar periodicamente esta página.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Lei Aplicável e Foro</h2>
              <p>
                Estes Termos de Uso são regidos pelas leis brasileiras. Quaisquer disputas decorrentes do uso deste portal serão submetidas ao foro da comarca do usuário, conforme determina o Código de Defesa do Consumidor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. Contato</h2>
              <p>
                Para dúvidas, sugestões ou reportar problemas relacionados à plataforma, entre em contato através dos canais disponibilizados no website.
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

export default TermsOfUse;
