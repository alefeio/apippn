const posts = deps => {
    return {
        destaquePrincipal: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                WHERE b.destaque = 1
                ORDER BY b.data DESC, b.hora DESC
                LIMIT 3`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        destaqueLateral: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                WHERE b.destaque = 2
                ORDER BY b.data DESC, b.hora DESC
                LIMIT 4`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                WHERE b.destaque = 0
                ORDER BY b.data DESC, b.hora DESC
                LIMIT 20`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        byUrl: (url) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria,
                COUNT(cu.curtida) totalCurtida,
                COUNT(co.qtd) AS totalComentario
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                LEFT JOIN curtidas cu 
                ON cu.post = b.id
                LEFT JOIN comentarios co 
                ON co.post = b.id
                WHERE b.url = "${url}"
                GROUP BY cu.post
                LIMIT 1`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        totalCurtidasPost: (url) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT  
                COUNT(cu.curtida) totalCurtida
                FROM blog b
                LEFT JOIN curtidas cu 
                ON cu.post = b.id
                WHERE b.url = "${url}"
                GROUP BY cu.post
                LIMIT 1`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        totalComentariosPost: (url) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT
                COUNT(co.qtd) AS totalComentario
                FROM blog b
                LEFT JOIN comentarios co 
                ON co.post = b.id
                WHERE b.url = "${url}"
                GROUP BY co.post
                LIMIT 1`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        pesquisa: (pesquisa) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria,
                SUM(cu.curtida) totalCurtida,
                SUM(co.qtd) AS totalComentario
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                LEFT JOIN curtidas cu 
                ON cu.post = b.id
                LEFT JOIN comentarios co 
                ON co.post = b.id
                WHERE (b.titulo LIKE "%${pesquisa}%"
                OR b.descricao LIKE "%${pesquisa}%"
                OR b.url LIKE "%${pesquisa}%")
                AND (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND NOW())
                GROUP BY b.id
                ORDER BY b.data DESC, b.hora DESC`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        comentariosPost: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`SELECT * FROM comentarios WHERE post = ${id} ORDER BY data DESC, hora DESC`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        byCategoria: (categoria) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                WHERE ca.urlCateg = "${categoria}"
                AND (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 5 DAY) AND NOW())
                ORDER BY b.data DESC, b.hora DESC`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        noticiasPara: (ids) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                WHERE b.id NOT IN (${ids})
                AND u.sigla = 'PA'
                ORDER BY b.data DESC, b.hora DESC
                LIMIT 6`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        noticiasNacionais: (ids) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                WHERE b.id NOT IN (${ids})
                AND u.sigla != 'PA'
                AND ca.id NOT IN (25)
                ORDER BY b.data DESC, b.hora DESC
                LIMIT 6`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        porCategoria: (dados) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                WHERE b.id NOT IN (${dados.ids})
                AND ca.nomeCateg = "${dados.categoria}"
                ORDER BY b.data DESC, b.hora DESC
                LIMIT ${dados.limite}`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        relacionados: (url, categoria) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                WHERE ca.urlCateg = "${categoria}"
                AND b.url != "${url}"
                ORDER BY b.data DESC, b.hora DESC
                LIMIT 3`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        postsPopulares: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                WHERE (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND NOW()) 
                ORDER BY b.visitas DESC, b.data DESC, b.hora DESC 
                LIMIT 2`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        maisCurtidas: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria,
                SUM(cu.curtida) totalCurtida
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                LEFT JOIN curtidas cu 
                ON cu.post = b.id
                WHERE (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND NOW()) 
                GROUP BY cu.post 
                ORDER BY SUM(cu.curtida) DESC, b.data DESC, b.hora DESC 
                LIMIT 2`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        maisComentadas: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query(`
                SELECT 
                b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas,
                p.nome pais,
                u.sigla uf,
                c.nome cidade,
                ca.nomeCateg categoria,
                ca.urlCateg urlCategoria,
                SUM(co.qtd) AS totalComentario
                FROM blog b
                LEFT JOIN pais p
                ON b.pais = p.id
                LEFT JOIN uf u
                ON b.uf = u.id
                LEFT JOIN cidade c
                ON b.cidade = c.id
                LEFT JOIN categorias ca
                ON b.categoria = ca.id
                INNER JOIN comentarios co 
                ON co.post = b.id
                WHERE (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 10 DAY) AND NOW()) 
                GROUP BY co.post 
                ORDER BY SUM(co.qtd) DESC, b.data DESC, b.hora DESC 
                LIMIT 2`,
                    (error, results) => {
                        if (error) {
                            errorHandler(error, 'Falha ao listar.', reject)
                            return false
                        }
                        resolve(results)
                    })
            })
        },
        enviarComentario: (nome, email, site, idPost, comentario, ip) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('INSERT INTO comentarios (nome, email, site, post, comentario, ip, data, hora) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())', [nome, email, site, idPost, comentario, ip], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao salvar.', reject)
                        return false
                    }
                    resolve({ nome, email, site, idPost, comentario, ip, id: results.insertId })
                })
            })
        },
        curtir: (idPost, ip) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                connection.query('INSERT INTO curtidas (post, ip) VALUES (?, ?)', [idPost, ip], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao salvar.', reject)
                        return false
                    }
                    resolve({ idPost, ip, id: results.insertId })
                })
            })
        },
        update: (post) => {

        },
        del: (id) => {

        }
    }
}

module.exports = posts