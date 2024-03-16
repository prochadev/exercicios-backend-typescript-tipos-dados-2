const fs = require('fs')

const lerArquivo = (): unknown => {
    try {
        const data = fs.readFileSync('./bd.json', 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Erro ao ler arquivo:', error);
        return [];
    }
};

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados, null, 2));
    console.log('Arquivo escrito com sucesso.');
};

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[]

    bd.push(dados)
    escreverArquivo(bd)

    return dados
}

const listarUsuarios = (): Usuario[] => {
    return lerArquivo() as Usuario[]
}

const paulo = cadastrarUsuario({
    nome: 'Paulo',
    email: 'paulo@gmail.com',
    cpf: '12345678910',
    endereco: {
        cep: '12345678',
        rua: 'Rua A',
        bairro: 'Centro',
        cidade: 'Salvador'
    }
})

const bd = lerArquivo()
console.log(paulo, bd)