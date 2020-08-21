const posts = (deps) => {
  return {
    destaquePrincipal: () => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    LIMIT 3`
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    destaqueLateral: () => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                        SELECT 
                        b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                        LIMIT 4
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    all: () => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                        SELECT 
                        b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                        LIMIT 20
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    acessoPost: (url) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                        UPDATE blog SET visitas = (visitas+1) WHERE url = "${url}"
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao atualizar.", reject);
          return false;
        }
      });
    },
    byUrl: (url) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                        SELECT 
                        b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                        LIMIT 1
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    totalCurtidasPost: (url) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT  
                    COUNT(cu.curtida) totalCurtida
                    FROM blog b
                    LEFT JOIN curtidas cu 
                    ON cu.post = b.id
                    WHERE b.url = "${url}"
                    GROUP BY cu.post
                    LIMIT 1
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    totalComentariosPost: (url) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT
                    COUNT(co.qtd) AS totalComentario
                    FROM blog b
                    LEFT JOIN comentarios co 
                    ON co.post = b.id
                    WHERE b.url = "${url}"
                    GROUP BY co.post
                    LIMIT 1
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    pesquisa: (pesquisa) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                        SELECT 
                        b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                        ORDER BY b.data DESC, b.hora DESC
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    comentariosPost: (id) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT * FROM comentarios WHERE post = ${id} ORDER BY data DESC, hora DESC
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    byCategoria: (categoria) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    AND (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND NOW())
                    ORDER BY b.data DESC, b.hora DESC
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    noticiasPara: (ids) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    AND b.categoria NOT IN (25, 31, 41)
                    ORDER BY b.data DESC, b.hora DESC
                    LIMIT 12
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    noticiasParaTodas: (filtro) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          let query = `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    WHERE (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND NOW()) 
                    `;
          if (filtro == "para") query += ` AND u.sigla = 'PA'`;
          else query += ` AND u.sigla != 'PA'`;
          query += ` ORDER BY b.data DESC, b.hora DESC`;

          sequelize.query(query).spread(function (results, metadata) {
            resolve(results);
          });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    noticiasNacionais: (ids) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    AND ca.id NOT IN (25, 31, 37, 38, 39, 40)
                    ORDER BY b.data DESC, b.hora DESC
                    LIMIT 6
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    porCategoria: (dados) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    LIMIT ${dados.limite}
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    relacionados: (url, categoria) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    LIMIT 3
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    postsPopulares: () => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    WHERE (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND NOW()) 
                    ORDER BY b.visitas DESC, b.data DESC, b.hora DESC 
                    LIMIT 1
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    maisCurtidas: () => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    WHERE (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND NOW()) 
                    GROUP BY cu.post 
                    ORDER BY SUM(cu.curtida) DESC, b.data DESC, b.hora DESC 
                    LIMIT 1
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    maisComentadas: () => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;
        try {
          sequelize
            .query(
              `
                    SELECT 
                    b.id, b.titulo, b.img, b.tipo, b.thumb, b.descricao, b.conteudo, b.url, b.data, b.hora, b.destaque, b.visitas, b.hr_postagem,
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
                    WHERE (b.data BETWEEN DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND NOW()) 
                    GROUP BY co.post 
                    ORDER BY SUM(co.qtd) DESC, b.data DESC, b.hora DESC 
                    LIMIT 2
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },

    acesso: (url_atual, ip) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        if (
          url_atual !=
            "www.portalparanews.com.br/img/apple-touch-icon-114x114.png" &&
          url_atual !=
            "www.portalparanews.com.br/img/apple-touch-icon-72x72.png" &&
          url_atual != "www.portalparanews.com.br/img/apple-touch-icon.png" &&
          url_atual != "www.portalparanews.com.br/wp-login.php" &&
          url_atual != "www.portalparanews.com.br/robots.txt" &&
          url_atual != "portalparanews.com.br/robots.txt" &&
          url_atual != "www.portalparanews.com.br/img/favicon.ico" &&
          ip != "66.249.73.209" &&
          ip != "66.249.73.211" &&
          ip != "66.249.73.213"
        ) {
          try {
            sequelize
              .query(
                `
                        INSERT INTO acesso (ip, url) VALUES ('${ip}', '${url_atual}')
                        `
              )
              .spread(function (results, metadata) {
                resolve({ url_atual, ip, id: results.insertId });
              });
          } catch (err) {
            errorHandler(error, "Falha ao salvar.", reject);
            return false;
          }
        }
      });
    },
    qtdAcesso: () => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    SELECT id FROM acesso ORDER BY id DESC LIMIT 1
                    `
            )
            .spread(function (results, metadata) {
              resolve(results);
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    enviarComentario: (nome, email, site, idPost, comentario, ip) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    INSERT INTO comentarios (nome, email, site, post, comentario, ip, data, hora) VALUES ('${nome}', '${email}', '${site}', '${idPost}', '${comentario}', '${ip}', NOW(), NOW())
                    `
            )
            .spread(function (results, metadata) {
              resolve({
                nome,
                email,
                site,
                idPost,
                comentario,
                ip,
                id: results.insertId,
              });
            });
        } catch (err) {
          errorHandler(error, "Falha ao salvar.", reject);
          return false;
        }
      });
    },
    enviarContato: (nome, email, tel, site, ip, mensagem) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    INSERT INTO contato (nome, email, tel, site, ip, msg, data) VALUES ('${nome}', '${email}', '${tel}', '${site}', '${ip}', '${mensagem}', NOW())
                    `
            )
            .spread(function (results, metadata) {
              resolve({
                nome,
                email,
                tel,
                site,
                ip,
                mensagem,
                id: results.insertId,
              });
            });
        } catch (err) {
          errorHandler(error, "Falha ao salvar.", reject);
          return false;
        }
      });
    },
    curtir: (idPost, ip) => {
      return new Promise((resolve, reject) => {
        const { sequelize, errorHandler } = deps;

        try {
          sequelize
            .query(
              `
                    INSERT INTO curtidas (post, ip) VALUES (${idPost}, '${ip}')
                    `
            )
            .spread(function (results, metadata) {
              resolve({ ok: true });
            });
        } catch (err) {
          errorHandler(error, "Falha ao listar.", reject);
          return false;
        }
      });
    },
    update: (post) => {},
    del: (id) => {},
  };
};

module.exports = posts;
