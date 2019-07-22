const db = require('../services/mysql')

const routes = (server) => {

    server.get('/', (req, res, next) => {
        res.send('silencio...')
        next()
    })

    server.get('/anuncios', async (req, res, next) => {
        try {
            res.send(await db.anuncios().all())
        } catch (error) {
            
        }
    })
    
    server.get('/destaques-principais', async (req, res, next) => {
        try {
            res.send(await db.posts().destaquePrincipal())
        } catch (error) {
            res.send(error)
        }
        next()
    })
    
    server.get('/destaques-laterais', async (req, res, next) => {
        try {
            res.send(await db.posts().destaqueLateral())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/posts-populares', async (req, res, next) => {
        try {
            res.send(await db.posts().postsPopulares())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/mais-curtidas', async (req, res, next) => {
        try {
            res.send(await db.posts().maisCurtidas())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/mais-comentadas', async (req, res, next) => {
        try {
            res.send(await db.posts().maisComentadas())
        } catch (error) {
            res.send(error)
        }
        next()
    })
    
    server.get('/posts', async (req, res, next) => {
        try {
            res.send(await db.posts().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/acesso-post/:url', async (req, res, next) => {
        let url = req.params.url
        // console.log('url acessoPost: ', url)
        try {
            res.send(await db.posts().acessoPost(url))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/noticia/:url', async (req, res, next) => {
        // console.log('noticia: ', req.params.url)
        try {
            res.send(await db.posts().byUrl(req.params.url))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/total-curtidas-post/:url', async (req, res, next) => {
        try {
            res.send(await db.posts().totalCurtidasPost(req.params.url))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/total-comentarios-post/:url', async (req, res, next) => {
        try {
            res.send(await db.posts().totalComentariosPost(req.params.url))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/pesquisa/:pesquisa', async (req, res, next) => {
        try {
            res.send(await db.posts().pesquisa(req.params.pesquisa))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/comentarios-post/:id', async (req, res, next) => {
        try {
            res.send(await db.posts().comentariosPost(req.params.id))
        } catch (error) {
            res.send(error)
        }
    })

    server.get('/categoria/:categoria', async (req, res, next) => {
        try {
            res.send(await db.posts().byCategoria(req.params.categoria))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/noticias-para', async (req, res, next) => {
        // console.log('PARAMETROS: ', req.body)
        try {
            res.send(await db.posts().noticiasPara(req.body))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/filtro/:filtro', async (req, res, next) => {
        // console.log('PARAMETROS: ', req.body)
        try {
            res.send(await db.posts().noticiasParaTodas(req.params.filtro))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/noticias-nacionais', async (req, res, next) => {
        // console.log('PARAMETROS NACIONAIS: ', req.body)
        try {
            res.send(await db.posts().noticiasNacionais(req.body))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/por-categoria', async (req, res, next) => {
        // console.log('PARAMETROS: ', req.body)
        let dados = {
            ids: req.body.ids,
            categoria: req.body.categoria,
            limite: req.body.limite
        }
        try {
            res.send(await db.posts().porCategoria(dados))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/relacionados/:url/:categoria', async (req, res, next) => {
        // console.log('PARAMETROS: ', req.params.categoria)
        try {
            res.send(await db.posts().relacionados(req.params.url, req.params.categoria))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/categorias', async (req, res, next) => {
        try {
            res.send(await db.categorias().all())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/usuarios', async (req, res, next) => {
        try {
            res.send(await db.usuarios().all())
        } catch (error) {
            res.send(error)
        }
    })

    server.post('/acesso', async (req, res, next) => {
        const { url_atual, ip } = req.body
        try {
            res.send(await db.posts().acesso(url_atual, ip))
            // console.log('acessando: ', req.body)
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.get('/qtd-acesso', async (req, res, next) => {
        try {
            res.send(await db.posts().qtdAcesso())
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/comentario', async (req, res, next) => {
        const { nome, email, site, idPost, comentario, ip } = req.body
        try {
            res.send(await db.posts().enviarComentario(nome, email, site, idPost, comentario, ip))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/contato', async (req, res, next) => {
        const { nome, email, tel, site, ip, mensagem } = req.body
        try {
            res.send(await db.posts().enviarContato(nome, email, tel, site, ip, mensagem))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/curtir', async (req, res, next) => {
        const { idPost, ip } = req.body
        try {
            res.send(await db.posts().curtir(idPost, ip))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/autenticacao', async (req, res, next) => {
        try {
            const { email, senha } = req.params
            res.send(await db.auth().authenticate(email, senha))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/categoria', async (req, res, next) => {
        const { nome, url } = req.params
        try {
            res.send(await db.categorias().save(nome, url))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.post('/usuario', async (req, res, next) => {
        const { nome, usuario, email, senha, nivel } = req.params
        try {
            res.send(await db.usuarios().save(nome, usuario, senha, email, nivel))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.put('/categoria', async (req, res, next) => {
        const { id, nome, url } = req.params
        try {
            res.send(await db.categorias().update(id, nome, url))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.put('/usuario', async (req, res, next) => {
        const { id, nome, usuario, senha, email, nivel } = req.params
        try {
            res.send(await db.usuarios().update(id, nome, usuario, senha, email, nivel))
        } catch (error) {
            res.send(error)
        }
    })

    server.del('/categoria', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.categorias().del(id))
        } catch (error) {
            res.send(error)
        }
        next()
    })

    server.del('/usuario', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.usuarios().del(id))
        } catch (error) {
            res.send(error)
        }
    })

    server.get('/share-noticia/:url', async(req, res, next) => {
        const { url } = req.params
        try {
            const noticia = await db.posts().byUrl(req.params.url);

            // console.log(noticia[0]);

            //res.send(await db.share().compartilharNoticia(idPost))

            const image     = 'http://www.portalparanews.com.br/imgBlog/' + noticia[0]['img'];
            const linkFront = 'http://portalparanews.com.br/noticia/' + noticia[0]['url'];

            const titulo = noticia[0]['titulo'];
            const descricao = ``;
        
            let htmlTemplate = `
            <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <!-- MS Tile - for Microsoft apps-->
                    <meta name="msapplication-TileImage" content="${image}">
        
                    <!-- fb & Whatsapp -->
        
                    <!-- Site Name, Title, and Description to be displayed -->
                    <meta property="og:site_name" content="Portal Pará News">
                    <meta property="og:title" content="${titulo}">
                    <meta property="og:description" content="${descricao}">
        
                    <!-- Image to display -->
                    <!-- Replace   «example.com/image01.jpg» with your own -->
                    <meta property="og:image" content="${image}">
        
                    <!-- No need to change anything here -->
                    <meta property="og:type" content="website" />
                    <meta property="og:image:type" content="image/jpeg">
        
                    <!-- Size of image. Any size up to 300. Anything above 300px will not work in WhatsApp -->
                    <meta property="og:image:width" content="220">
                    <meta property="og:image:height" content="60">
        
                    <!-- Website to visit when clicked in fb or WhatsApp-->
                    <meta property="og:url" content="${linkFront}">
        
                    <meta property="og:locale" content="pt_BR" />
                </head>
                <body>
                <script>
                    window.location.href = "${linkFront}"; 
                </script>
                </body>
            </html>`; 
        
        
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(htmlTemplate);
                next();

        } catch (error) {
            res.send(error)
        }
    })

    server.get('/news/:url', async(req, res, next) => {
        const { url } = req.params
        try {
            const noticia = await db.posts().byUrl(req.params.url);

            // console.log(noticia[0]);

            //res.send(await db.share().compartilharNoticia(idPost))

            const image     = 'http://www.portalparanews.com.br/imgBlog/' + noticia[0]['thumb'];
            const linkFront = 'http://portalparanews.com.br/noticia/' + noticia[0]['url'];

            const titulo = noticia[0]['titulo'];
            const descricao = ``;
        
            let htmlTemplate = `
            <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <!-- MS Tile - for Microsoft apps-->
                    <meta name="msapplication-TileImage" content="${image}">
        
                    <!-- fb & Whatsapp -->
        
                    <!-- Site Name, Title, and Description to be displayed -->
                    <meta property="og:site_name" content="Portal Pará News">
                    <meta property="og:title" content="${titulo}">
                    <meta property="og:description" content="${descricao}">
        
                    <!-- Image to display -->
                    <!-- Replace   «example.com/image01.jpg» with your own -->
                    <meta property="og:image" content="${image}">
        
                    <!-- No need to change anything here -->
                    <meta property="og:type" content="website" />
                    <meta property="og:image:type" content="image/jpeg">
        
                    <!-- Size of image. Any size up to 300. Anything above 300px will not work in WhatsApp -->
                    <meta property="og:image:width" content="220">
                    <meta property="og:image:height" content="60">
        
                    <!-- Website to visit when clicked in fb or WhatsApp-->
                    <meta property="og:url" content="${linkFront}">
        
                    <meta property="og:locale" content="pt_BR" />
                </head>
                <body>
                <script>
                    window.location.href = "${linkFront}"; 
                </script>
                </body>
            </html>`; 
        
        
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                res.end(htmlTemplate);
                next();

        } catch (error) {
            res.send(error)
        }
    })
}

module.exports = routes