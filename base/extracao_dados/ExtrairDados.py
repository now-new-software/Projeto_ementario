import selenium
from AdministracaoNavegador import AdministracaoNavegador
from selenium.webdriver.common.by import By
from selenium.common.exceptions import WebDriverException
import re

class ExtrairDados():
    url = "https://portal.ufac.br/ementario/cursos.action"
    cursos = []
    docentes = []
    projetoPedagogico = []
    Documentos = []

    def __init__(self):
        #Inicialização do site e "injeção" de AdmnistraçãoNavegador
        self.nav = AdministracaoNavegador()

    #Função para inicializar o site/caso erro ele refaz o driver
    def inicializacao_site(self, link):
        try:
            self.nav.inicializar_site(link)
        except WebDriverException:
            print("erro no drive da aplicação")
            self.nav.encerrar_site()
            self.nav = AdministracaoNavegador()

    def extrair_dados(self):
        url = self.url
        self.nav.inicializar_site(url)

        #Extrai todos os links das informações gerais dos cursos
        listaLinksCursos = self.links_cursos()

        #Fecha o site após a extração dos links
        self.nav.encerrar_site()
        cont = 0

        for link in listaLinksCursos:
            cont+=1
            try:
                #Reinicializa - precisa fazer isso por algum motivo
                self.nav = AdministracaoNavegador()
                self.inicializacao_site(link)

                listaTabela = self.nav.navegador.find_elements(By.TAG_NAME, "table")
                tabelaLinksCurriculoDocumentacao = listaTabela[0]

                tabelaInformacoesGerais = listaTabela[2]
                informacoesGeraisParteUm = self.informacoes_gerais_cursos(tabelaInformacoesGerais)
                self.cursos.append(informacoesGeraisParteUm)

                m = re.search(r'(\d+)$', link)
                numeroLink = str(m.group(1))

                #Se for maior que três indica que existem professores relacionados a aquele curso:
                if len(listaTabela)>3:
                    tabelaDocentes = listaTabela[3]
                    informacoesDocentes = self.informacoes_docentes(tabelaDocentes)
                    self.docentes.append(informacoesDocentes)
                else:
                #Retorna um dicionario vazio
                    self.docentes.append({})

                linkCurriculo = "https://portal.ufac.br/ementario/curriculo.action?v=" + numeroLink
                linkDocumentacao = "https://portal.ufac.br/ementario/ppc.action?v=" + numeroLink

                self.nav.encerrar_site()

                self.inicializacao_site(linkDocumentacao)

                listaOpcoesDocumentacao = self.nav.navegador.find_elements(By.TAG_NAME, "option")

                listaLinkDocumentacao = ["https://portal.ufac.br/ementario/ppc.action?v=" + str((op.get_attribute("value"))) for op in listaOpcoesDocumentacao]

                listaLinkDocumentacao.remove("https://portal.ufac.br/ementario/ppc.action?v=" + numeroLink)

                listaDocumentos = []
                listaProjetosPedagogicos= []

                self.informacoes_projeto_pedagogico_documentacao(listaDocumentos, listaProjetosPedagogicos)

                self.nav.encerrar_site()

                for link in listaLinkDocumentacao:
                    self.inicializacao_site(link)
                    self.informacoes_projeto_pedagogico_documentacao(listaDocumentos, listaProjetosPedagogicos)
                    self.nav.encerrar_site()

                self.projetoPedagogico.append(listaProjetosPedagogicos)
                self.Documentos.append(listaDocumentos)

            except Exception as e:
                print(f"ocorreu um erro no link {link}... erro {e}")

    def informacoes_projeto_pedagogico_documentacao(self, listaDocumentos:list, listaProjetoPedagogico:list):
        try:

            tabelas = self.nav.navegador.find_elements(By.TAG_NAME, "table"),
            if len(tabelas) == 2:
                listaDocumentos.append('')
                listaProjetoPedagogico.append('')
                return
            
            tabelasUteis = tabelas[2:]

            tamanhoTabelaUtil = len(tabelasUteis)

            for tabela in tabelasUteis:
                onclick = tabela.get_attribute("onclick")

                if onclick is None:
                    projeto_pedagogico = tabela.text
                    listaProjetoPedagogico.append(projeto_pedagogico)

                    if tamanhoTabelaUtil == 1:
                        listaDocumentos.append('')
                else:
                    listaDocumentos.append(onclick)

                    if tamanhoTabelaUtil == 1:
                        listaProjetoPedagogico.append('')
        except Exception as e:
            print("Erro na extração da documentação, link : {}")

    #Função para inicializar o site/caso erro ele refaz o driver
    def inicializacao_site(self, link):
        try:
            self.nav.inicializar_site(link)
        except WebDriverException:
            print("erro no drive da aplicação")
            self.nav.encerrar_site()
            self.nav = AdministracaoNavegador()

    def informacoes_gerais_curriculo_curso():
        pass

    def informacoes_docentes(self, tabelaDocentes):
        linhas = tabelaDocentes.find_elements(By.TAG_NAME, "tr")[1:]
        ListaDocentes = []

        for tr in linhas:
            celulas = tr.find_elements(By.TAG_NAME, "td")
            dados_docente = {}

            for indice, celula in enumerate(celulas):

                if indice==0:
                    nomeDocente = celula.text.strip()
                    dados_docente["Nome"] = nomeDocente

                if indice==1:
                    titulacaoDocente = celula.text.strip()
                    dados_docente["Titulação"] = titulacaoDocente

                if indice==2:
                    partes = [p.strip() for p in celula.text.split("\n") if p.strip()]

                    centroLotacao = partes[0]
                    cargo = partes[1]
                    jornada = partes[2]
                    tempoCasa = partes[3]

                    dados_docente['centro'] = centroLotacao
                    dados_docente['cargo'] = cargo
                    dados_docente['jornada'] = jornada
                    dados_docente['tempo_casa'] = tempoCasa
                
            ListaDocentes.append(dados_docente)

        return ListaDocentes
    

    #Extrai as infomações da tela geral dos cursos
    def informacoes_gerais_cursos(self, tabelaInformacoesGerais):
        
        linhas = tabelaInformacoesGerais.find_elements(By.TAG_NAME, "tr")
        dados_curso = {}

        for tr in linhas:
            # Pegamos todas as células da linha
            celulas = tr.find_elements(By.TAG_NAME, "td")

            for td in celulas:
                texto_celula = td.text.strip()
                # print(texto_celula)

                if "\n" in texto_celula:
                    partes = [p.strip() for p in texto_celula.split("\n") if p.strip()]
                    chave = partes[0].lower().replace(" ", "_")

                    # 1. Se for o caso especial do Nome + Código

                    if "nome_do_curso" == chave and len(partes) == 2:
                        dados_curso["nome_do_curso"] = partes[1].split('(')[0].strip()
                        dados_curso["codigo"] = partes[1].split('(')[1].replace(')', "").strip()
                    
                    # 2. Se for qualquer outra informação (Modalidade, Turno, etc.)
                    else:
                        dados_curso[chave] = partes[-1]

        return dados_curso

    #Extração dos dados da tabela inicial:
    def links_cursos(self):

        links = []

        #extraindo a tabela
        tabelaDadosTelaInicial = self.nav.navegador.find_element(By.ID, 'table-cursos')

        #extraindo o corpo da tabela
        bodyTabelaDadosTelaInicial = tabelaDadosTelaInicial.find_element(By.TAG_NAME, "tbody")

        #Extraindo as linhas da tabela
        trsBodyTabelaDadosTelaInicial = bodyTabelaDadosTelaInicial.find_elements(By.TAG_NAME, "tr")

        for tr in trsBodyTabelaDadosTelaInicial:

            #Extraindo os links do curso
            td = tr.find_element(By.TAG_NAME, "td")
            
            #Extraindo o link
            a = tr.find_element(By.TAG_NAME, "a")
            link = a.get_attribute('href')
            links.append(link)
        
        return links

site = ExtrairDados()
site.extrair_dados()