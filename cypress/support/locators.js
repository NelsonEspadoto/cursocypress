const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        EXTRATO: '[data-test=menu-extrato]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]'
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: desc => `//table//td[contains(., '${desc}')]/..//i[@class='far fa-edit']`
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, valor) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${valor}')]`,
        FN_XP_REMOVER_ELEMENTO: (desc, valor) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${valor}')]/../../../div[2]/i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO: (desc, valor) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${valor}')]/../../../div[2]/i[@class='fas fa-edit']`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]`,
        FN_XP_SALDO_CONTA_VALOR: nome => `//td[contains(., '${nome}')]/../td[2]`
    },
    MESSAGE: '.toast-message'
}

export default locators