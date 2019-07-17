
const share = deps => {
    return {
        compartilharNoticia: (idNoticia) => {
            return new Promise((resolve, reject) => {
                const { sequelize, errorHandler } = deps

                resolve(`
                    <!-- MS Tile - for Microsoft apps-->
                    <meta name="msapplication-TileImage" content="http://www.portalparanews.com.br/imgBlog/17072019090841-1.jpg">

                    <!-- fb & Whatsapp -->

                    <!-- Site Name, Title, and Description to be displayed -->
                    <meta property="og:site_name" content="Portal Pará News">
                    <meta property="og:title" content="Detentos são flagrados puxando corda com celulares e outros objetos em presídio :: Fonte: Portal Pará News">
                    <meta property="og:description" content="A Superintendência do Sistema Penitenciário do Pará (Susipe) informou que apreendeu celulares, carregadores, fones de ouvido e pen drive durante monitoramento na madrugada desta terça-feira (16) no Centro de Recuperação Regional de Bragança (CRRB).

                    De acordo com a a Susipe, uma corda estava engatada do lado de fora para dentro da cela três e nela estavam amarrados 12 celulares, quatro carregadores, sete fones de ouvido e um pen drive. Os detentos estavam prestes a puxar para dentro da cela quando foram flagrados por agentes prisionais. A Polícia Militar foi acionada e realizou buscas próximo ao presídio para tentar encontrar algum suspeito.

                    A direção da unidade prisional informou que as medidas cabíveis sobre o evento estão sendo tomadas e que os internos envolvidos responderão do Procedimento Disciplinar Penitenciário (PDP).">

                    <!-- Image to display -->
                    <!-- Replace   «example.com/image01.jpg» with your own -->
                    <meta property="og:image" content="http://www.portalparanews.com.br/imgBlog/17072019090841-1.jpg">

                    <!-- No need to change anything here -->
                    <meta property="og:type" content="website" />
                    <meta property="og:image:type" content="image/jpeg">

                    <!-- Size of image. Any size up to 300. Anything above 300px will not work in WhatsApp -->
                    <meta property="og:image:width" content="220">
                    <meta property="og:image:height" content="60">

                    <!-- Website to visit when clicked in fb or WhatsApp-->
                    <meta property="og:url" content="http://www.portalparanews.com.br">

                    <meta property="og:locale" content="pt_BR" />
                `)               
            })
        }
    }
}

module.exports = share