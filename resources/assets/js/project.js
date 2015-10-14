/**
 * Created by vinicius on 07/10/15.
 */
var app = new Vue({
    el: "#app",

    data : {
        form: '',
        projeto: {
            dadosPessoais: {
                nome: "Vinicius Fernandes Brito",
                matricula: "200811722003",
                cpf: "022.181.461-26",
                rg: "1960244-8 SSP MT",
                dataNasc: "19/04/1989",
                endereco: {
                    cep: "78600000",
                    rua: "Rua 27",
                    numero: "74",
                    complemento: "Prox Escadaria",
                    bairro: "Santo Antonio",
                    cidade: "Barra do Garças",
                    uf: "MT"

                },
                fone: "6634014730",
                celular: "6699317500",
                fax: "6634014730",
                email: "vinicius.fernandes.brito@gmail.complemento",
                categoria: "ALUNO",
                titulacao: "GRADUADO"
            },
            localTrabalho: {
                unidade: "Campus Universitário do Araguaia",
                fone: "6634014730",
                regime: "ALUNO"
            },
            enquadramento: {
                titulo: 'Título do Projeto',
                dataInicio: '2015-10-09',
                duracao: 12,
                convenio: 'Não Possui convênio',
                financiador: 'Não possui financiador',
                area: 1,
                subArea: 1,
                grupoPesquisa: 1,
                descricao: 'Aqui é a descrição do projeto',
                palavra1: 'palavra chave 1',
                palavra2: 'palavra chave 2',
                palavra3: 'palavra chave 3'

            },
            caracterizacao: "Aqui é um texto enorme de caracterizacao do projeto",
            objetivos: "Aqui é um texto enorme de objetivos do projeto",
            metodologia: "Aqui é um texto enorme de metodologia do projeto",

            membros: [],
            orcamento: {
                materialConsumo: 'R$ 10.00',
                servicosPessoaFisica: 'R$ 10.00',
                servicosPessoaJuridica: 'R$ 10.00',
                obrasInstalacoes: 'R$ 10.00',
                equipamentoMaterial: 'R$ 10.00',
                total: 'R$ 50.00'
            },
            cronograma: [],
            referencias: "Aqui é um texto enorme de referências do projeto",
            anexos: {
                nome: 'Nome Arquivo',
                arquivo: 'arquivo'
            }
        },
        membro: {
            data: {
                nome: '',
                cpf: '',
                titulacao: '',
                instituicao: '',
                categoria: '',
                cargaHoraria: ''
            },
            exibir: false
        },
        atividade: {
            nome: '',
            anos: []
        }
    },

    methods: {

        doClean: function() {
            jQuery(this.$$.nomeAtividade).val('');
            jQuery('input:checkbox').removeAttr('checked');
        },

        remAtividade: function(ev, index) {
            this.projeto.cronograma.$remove(index);
        },

        transforma: function(i) {
            if(i == '1')
                return 'glyphicon glyphicon-ok';
            else
                return 'glyphicon glyphicon-remove';
        },

        addAtividade: function(ev) {
            ev.preventDefault();
            var self = this, qt = 0, aux = '', j = 1;
            var auxD = self.projeto.enquadramento.duracao;
            var auxA =  moment(self.projeto.enquadramento.dataInicio).get('year');
            var i =  moment(self.projeto.enquadramento.dataInicio).get('month')+1;
            var nome = self.$$.nomeAtividade.value;
            self.atividade.nome = nome;
            while(j <= auxD) {
                for(i; i <= 12; i++) {
                    if(j > auxD)
                        break;
                    if(jQuery('#ck-'+j).is(':checked'))
                        aux += '1';
                    else
                        aux += '0';
                    j++;
                }
                self.atividade.anos.push({'ano':auxA, 'meses':aux});
                aux = ''; i = 1; auxA++; qt++;
            }
            //add atividade ao atividades
            self.projeto.cronograma.push(jQuery.extend({}, self.atividade));
            //limpando atividade
            self.atividade.nome = '';
            self.atividade.anos = [];
            self.doClean();
            self.$$.nomeAtividade.focus();
        },

        createFormCronograma: function(ev, di, du) {
            var mes = new Array('AA','jan','fev','mar','abr','mai','jun','jul','ago','set','out', 'nov', 'dez');
            var dataInicial = moment(di);
            var dataAux = moment(di);
            var duracao = du;

            var self = this, y, m, texto, aux = true, i = 1;

            dataFinal = moment(dataInicial).add(duracao, 'months');

            divMeses = self.$$.meses;

            jQuery(divMeses).empty();

            while(aux) {
                y = dataAux.get('year');
                texto = '<tr class="text-center"><td>'+y+'</td>';
                do
                {
                    m = mes[dataAux.get('month')+1];
                    texto += '<td><b>'+m+'</b><br/><input type="checkbox" name="'+y+'_'+m+'" id="ck-'+i+'"/><br/>Mês '+i+'</td>';
                    dataAux.add(1, 'month');
                    i++;
                    if(dataFinal.isSame(dataAux)) {
                        m = 'dez';
                        aux = false;
                    }
                } while(m != 'dez');
                texto += '</tr>';
                jQuery(divMeses).append(texto);
            }
        },

        searchMembro: function(ev) {
            ev.preventDefault();
            var self = this;
            var cpf = self.$$.cpf;
            if(cpf.value.length == 14) {
                //Executar busca no bd
                var data = null;
                if(!data) {
                    self.membro.data.nome = 'Não Encontrado';
                    self.membro.data.cpf = cpf.value;
                    self.membro.data.titulacao = '';
                    self.membro.data.instituicao = '';
                    self.membro.data.categoria = '';
                    self.membro.data.cargaHoraria = '';
                    self.membro.$set('exibir', true);
                    cpf.value = '';
                }
            }
            else {
                console.log('CPF inválido');
            }
        },

        delMembro: function(ev, index) {
            this.projeto.membros.$remove(index);
        },

        addMembro: function(ev) {
            ev.preventDefault();
            this.projeto.membros.push({
                nome: this.membro.data.nome,
                cpf: this.membro.data.cpf,
                titulacao: this.membro.data.titulacao,
                instituicao: this.membro.data.instituicao,
                categoria: this.membro.data.categoria,
                cargaHoraria: this.membro.data.cargaHoraria
            });
            this.membro.exibir = false;
            this.membro.data.nome = '';
            this.membro.data.cpf = '';
            this.membro.data.titulacao = '';
            this.membro.data.instituicao = '';
            this.membro.data.categoria = '';
            this.membro.data.cargaHoraria = '';
        },

        doNext: function(ev, form) {
            this.$set('form', form);
        }
    },

    ready: function() {
        this.createFormCronograma(null, this.projeto.enquadramento.dataInicio, this.projeto.enquadramento.duracao);
    },

    attached: function() {
        var self = this;
        jQuery("#cep").mask("0000-000");
        jQuery(".telefone").mask("(00) 0000-0000");
        jQuery(".cpf").mask("000.000.000-00");

        jQuery(window).on('hashchange', function(){
            self.$set('form', window.location.hash);
            window.scrollTo(0,0);
        });

        if(window.location.hash === '') {
            self.$set('form', '#div1');
            window.location.hash = '#div1';
        }
        else {
            self.$set('form', window.location.hash);
        }
    }
});